#!/bin/bash
# setup-nginx.sh — Configura el bloque nginx para symphony-shell-lubs
# Se ejecuta en el servidor vía SSH desde el workflow de GitHub Actions
set -e

APP="symphony-shell-lubs"
WEBROOT="/var/www/$APP"

echo "=== Configurando nginx para /$APP/ ==="

# ── 1. Encontrar el archivo de config nginx correcto ──────────────────────────
# Usar `nginx -T` para listar todos los archivos incluidos
NGINX_CONFIGS=$(nginx -T 2>/dev/null | grep "^# configuration file" | awk '{print $4}' | tr -d ':' | sort -u)

if [ -z "$NGINX_CONFIGS" ]; then
  # Fallback si nginx -T no está disponible sin sudo
  NGINX_CONFIGS=$(sudo nginx -T 2>/dev/null | grep "^# configuration file" | awk '{print $4}' | tr -d ':' | sort -u)
fi

if [ -z "$NGINX_CONFIGS" ]; then
  # Últimos recursos: rutas comunes
  NGINX_CONFIGS="/etc/nginx/sites-enabled/default /etc/nginx/conf.d/default.conf /etc/nginx/nginx.conf /usr/local/nginx/conf/nginx.conf"
fi

echo "Archivos nginx detectados:"
echo "$NGINX_CONFIGS"

# Encontrar el archivo que tiene otros location blocks de apps
TARGET_CONFIG=""
for cfg in $NGINX_CONFIGS; do
  if [ -f "$cfg" ] && grep -q "once-data-hub\|location\s*=\s*/" "$cfg" 2>/dev/null; then
    TARGET_CONFIG="$cfg"
    echo "Config objetivo encontrado: $TARGET_CONFIG"
    break
  fi
done

# Si no encontramos por once-data-hub, buscar cualquier archivo con location blocks
if [ -z "$TARGET_CONFIG" ]; then
  for cfg in $NGINX_CONFIGS; do
    if [ -f "$cfg" ] && grep -q "location" "$cfg" 2>/dev/null; then
      TARGET_CONFIG="$cfg"
      echo "Config objetivo (fallback): $TARGET_CONFIG"
      break
    fi
  done
fi

if [ -z "$TARGET_CONFIG" ]; then
  echo "ERROR: No se encontró archivo de configuración nginx"
  exit 1
fi

# ── 2. Verificar si ya está configurado ───────────────────────────────────────
if grep -q "$APP" "$TARGET_CONFIG"; then
  echo "✓ location /$APP/ ya existe en nginx — sin cambios necesarios"
  exit 0
fi

echo "Agregando bloque location /$APP/ en $TARGET_CONFIG ..."

# ── 3. Backup del config ──────────────────────────────────────────────────────
BACKUP="${TARGET_CONFIG}.bak.$(date +%s)"
cp "$TARGET_CONFIG" "$BACKUP"
echo "Backup creado: $BACKUP"

# ── 4. Insertar el bloque con Python (más confiable que sed/awk) ──────────────
python3 << PYEOF
import re

config_file = "$TARGET_CONFIG"
app = "$APP"
webroot = "$WEBROOT"

with open(config_file, 'r') as f:
    content = f.read()

# El bloque a insertar
new_block = (
    "    location /" + app + "/ {\n"
    "        alias " + webroot + "/;\n"
    "        try_files \$uri \$uri/ /" + app + "/index.html;\n"
    "    }\n\n"
)

# Intentar insertar antes del catch-all "location = / {" o "location / {"
patterns = [
    r'([ \t]+location\s*=\s*/\s*\{)',
    r'([ \t]+location\s*/\s*\{)',
]

inserted = False
for pattern in patterns:
    if re.search(pattern, content):
        content = re.sub(pattern, new_block + r'\1', content, count=1)
        inserted = True
        print(f"Bloque insertado antes de catch-all '{pattern}'")
        break

if not inserted:
    # Si no hay catch-all, insertar antes de la llave de cierre final
    content = content.rstrip()
    if content.endswith('}'):
        content = content[:-1].rstrip() + '\n\n' + new_block + '}\n'
        inserted = True
        print("Bloque insertado al final del bloque server")

if not inserted:
    print("ERROR: No se pudo determinar dónde insertar el bloque")
    raise SystemExit(1)

with open(config_file, 'w') as f:
    f.write(content)

print("Archivo actualizado correctamente")
PYEOF

# ── 5. Verificar y recargar nginx ─────────────────────────────────────────────
echo "Verificando configuración nginx..."
if nginx -t 2>&1 || sudo nginx -t 2>&1; then
  nginx -s reload 2>/dev/null || sudo nginx -s reload
  echo "✅ Nginx recargado — /$APP/ configurado correctamente"
else
  echo "ERROR: nginx -t falló — revirtiendo backup..."
  cp "$BACKUP" "$TARGET_CONFIG"
  exit 1
fi
