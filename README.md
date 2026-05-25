# Symphony — Commercial Intelligence in Motion

> **Prototipo funcional para demo ejecutivo · Shell Lubricantes Perú / Primax**  
> Powered by NODO

---

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
# → http://localhost:5173
```

---

## Guía del demo

### 1. Login
- Selecciona **Gerente Comercial** para ver la vista completa (Carlos Mendoza)
- Selecciona **Ejecutivo Comercial** para ver la vista restringida (Paola Fernández)
- Los datos se reinician automáticamente al seleccionar un rol

### 2. Dashboard
- KPIs en tiempo real, gráfico de forecast, SPANCOP mini, alertas y próximos compromisos

### 3. Flujo estrella del demo: B2Buddy
1. Click en **"Hablar con B2Buddy"** (sidebar o botón flotante en móvil)
2. Click en **"Iniciar grabación"** → aparecen ondas de voz animadas
3. La transcripción se escribe sola (texto real de la reunión con Minera Andina)
4. Click **"Detener y procesar"** → loader de análisis (~3 segundos)
5. B2Buddy muestra:
   - Oportunidad identificada: Minera Andina del Sur S.A.C.
   - Cambio de etapa: Approach → **Negotiate**
   - Volumen actualizado: 28.000 L → **42.000 L**
   - Probabilidad: 45% → **65%**
   - Compromisos extraídos
   - Evento creado: 23 Jul, 10:00 a.m.
   - Correo generado
6. Click **"Aplicar cambios"** → todo se actualiza en tiempo real
7. Ve a **Calendario** (julio) → ver evento creado por B2Buddy
8. Ve a **Correos** → ver correo generado (badge "NUEVO")
9. Ve a **Oportunidades → Minera Andina** → ver timeline actualizado

### 4. SPANCOP
- Vista kanban con 7 etapas. Haz click en cualquier card para abrir detalle.

### 5. Alertas
- Alertas clasificadas por severidad. La alerta de "Sin contacto" de Minera Andina se resuelve automáticamente al aplicar cambios en B2Buddy.

### 6. Reiniciar el demo
- Ve a **Configuración** → **"Reiniciar datos del demo"** para volver al estado inicial

---

## Stack técnico
- **React 18** + **Vite 5**
- **Tailwind CSS 3** con colores Shell personalizados
- **Zustand 4** + localStorage para persistencia de estado
- **React Router 6** para navegación
- **Recharts** para gráficos (Forecast, Industria, SPANCOP)
- **Lucide React** para íconos

## Estructura del proyecto
```
src/
├── data/mockData.js        # Toda la data simulada (12 empresas, 18 oportunidades...)
├── store/useAppStore.js    # Estado global Zustand con persistencia
├── components/
│   ├── layout/             # Sidebar, TopBar, BottomNav, AppLayout
│   ├── ui/                 # KPICard, Modal, SpancopBadge, EnergyLines
│   ├── charts/             # ForecastChart, IndustryChart, SpancopFunnel
│   └── b2buddy/            # B2BuddyModal, VoiceWave, Avatar, FAB
└── pages/                  # Login, Dashboard, SPANCOP, Opportunities...
```

---

## Datos del demo

| Entidad | Cantidad |
|---------|----------|
| Empresas | 12 |
| Oportunidades | 18 |
| Actividades | 25+ |
| Alertas | 10 |
| Eventos calendario | 8 (+ 1 creado en demo) |
| Correos generados | 6 (+ 1 creado en demo) |
| Archivos | 10 |
| Ejecutivos | 5 |

---

*Prototipo funcional · No productivo · Demo para Shell Lubricantes Perú*  
*© 2025 NODO · Todos los derechos reservados*
