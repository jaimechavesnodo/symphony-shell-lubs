// Course content: lessons and evaluations for each Powering U module

export const courseContent = {
  'pu-01': {
    title: 'Portafolio Shell Lubricantes',
    lessons: [
      {
        id: 1, title: 'Introducción al portafolio Shell',
        duration: '18 min',
        videoThumb: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
        videoId: 'shell-portfolio-intro',
        content: `Shell Lubricantes ofrece una de las líneas de productos más completas del mercado de lubricantes industriales y automotrices. Nuestro portafolio está diseñado para maximizar la eficiencia operativa y reducir el costo total de operación de cada cliente.

**Líneas principales:**
- **Shell Rimula**: Especializado en motores diesel de alto rendimiento. Protege en condiciones extremas de temperatura y carga.
- **Shell Tellus**: Fluidos hidráulicos premium para sistemas de alta presión. Extiende la vida útil de componentes.
- **Shell Omala**: Aceites para engranajes industriales. Diseñado para reducir la fricción en reductores y cajas de velocidad.
- **Shell Corena**: Para compresores de aire. Previene la formación de depósitos y extiende los intervalos de mantenimiento.
- **Shell Gadus**: Grasas industriales y automotrices para aplicaciones de alta carga y temperatura.

**Ventaja competitiva:** La tecnología Shell PurePlus convierte gas natural en aceites base de alta pureza, resultando en productos con mayor estabilidad y protección.`
      },
      {
        id: 2, title: 'Shell Rimula para motores diesel',
        duration: '22 min',
        videoId: 'rimula-diesel',
        content: `Shell Rimula R6 M es nuestro lubricante para motor diesel de mayor tecnología. Utiliza la tecnología Dynamic Protection Plus que adapta su protección según las condiciones de operación.

**Especificaciones técnicas:**
- Viscosidad: 10W-40 (multigrado)
- Estándares: API CJ-4, ACEA E9, MB 228.51
- Intervalo de cambio extendido: hasta 100.000 km
- Compatible con sistemas de postratamiento (DPF, SCR)

**Beneficios clave para el cliente:**
1. **Reducción de paradas no programadas** en un 40% vs lubricantes convencionales
2. **Extensión de vida útil del motor** hasta 30% adicional
3. **Ahorro en combustible** de hasta 1.5% gracias a menor fricción interna
4. **Compatibilidad total** con flotas mixtas (motores Euro II a Euro VI)

**Sectores objetivo:** Minería, transporte pesado, construcción, generación eléctrica.`
      },
      {
        id: 3, title: 'Shell Tellus para sistemas hidráulicos',
        duration: '20 min',
        videoId: 'tellus-hydraulic',
        content: `Shell Tellus S4 VX es un fluido hidráulico de muy alto rendimiento basado en tecnología de aceites base completamente sintéticos.

**¿Cuándo recomendar Shell Tellus?**
- Sistemas hidráulicos que operan en rangos amplios de temperatura (-40°C a +90°C)
- Equipos críticos donde el tiempo de inactividad tiene alto costo
- Terminales portuarios, plantas industriales, equipos de construcción

**Comparativa vs competencia:**
| Característica | Shell Tellus S4 VX | Competidor A |
|---|---|---|
| Índice de viscosidad | 350+ | 180 |
| Intervalo de cambio | 8.000 h | 4.000 h |
| Certificaciones | 12 | 6 |

**Argumento de venta:** El costo del lubricante representa <2% del costo total de mantenimiento, pero la calidad del aceite impacta >40% de los fallos de componentes hidráulicos.`
      },
      {
        id: 4, title: 'Argumentación técnico-comercial',
        duration: '25 min',
        videoId: 'technical-sales',
        content: `La venta técnica de lubricantes requiere combinar conocimiento del producto con entendimiento del negocio del cliente.

**Metodología de argumentación Shell (T.E.C.):**

**T - Técnico**: Presenta la especificación relevante para el equipo del cliente
*Ejemplo: "Su flota de cargadores Komatsu 785 requiere aceite API CJ-4, que es exactamente lo que ofrece Shell Rimula R6 M."*

**E - Económico**: Cuantifica el impacto financiero
*Ejemplo: "Con el intervalo de cambio extendido, su costo anual de lubricante baja de $45.000 a $29.000, un ahorro de $16.000 anuales."*

**C - Confianza**: Respaldo con casos de éxito similares
*Ejemplo: "Minera Los Andes, con flota similar a la suya, redujo sus paradas no programadas en 38% en el primer año con Shell Rimula."*

**Manejo de la objeción de precio:** Siempre calcular el TCO (Total Cost of Ownership) antes de la reunión. El costo del lubricante por sí solo es engañoso.`
      },
    ],
    questions: [
      {
        id: 1,
        question: '¿Cuál es la principal ventaja de la tecnología Shell PurePlus?',
        type: 'single',
        options: [
          'Permite mezclar lubricantes de diferentes marcas',
          'Convierte gas natural en aceites base de alta pureza',
          'Reduce el precio final del producto en un 20%',
          'Aumenta la viscosidad del lubricante en climas fríos',
        ],
        correct: [1],
      },
      {
        id: 2,
        question: '¿Qué porcentaje aproximado de fallos de componentes hidráulicos está relacionado con la calidad del aceite?',
        type: 'single',
        options: ['10%', '25%', '40%', '60%'],
        correct: [2],
      },
      {
        id: 3,
        question: '¿Cuáles de los siguientes productos Shell están recomendados para motores diesel? (selecciona todos los correctos)',
        type: 'multiple',
        options: [
          'Shell Rimula R6 M',
          'Shell Tellus S4 VX',
          'Shell Rimula R4 X',
          'Shell Omala S4 GX',
        ],
        correct: [0, 2],
      },
      {
        id: 4,
        question: '¿Qué significa la metodología T.E.C. de argumentación Shell?',
        type: 'single',
        options: [
          'Técnico, Económico, Confianza',
          'Temperatura, Especificación, Certificación',
          'Tiempo, Eficiencia, Costo',
          'Técnico, Experiencia, Cierre',
        ],
        correct: [0],
      },
      {
        id: 5,
        question: '¿Cuál es el beneficio de reducción de paradas no programadas que ofrece Shell Rimula R6 M vs lubricantes convencionales?',
        type: 'single',
        options: ['10%', '25%', '40%', '55%'],
        correct: [2],
      },
    ],
  },

  'pu-02': {
    title: 'Metodología SPANCOP',
    lessons: [
      {
        id: 1, title: '¿Qué es SPANCOP y por qué existe?',
        duration: '15 min',
        videoId: 'spancop-intro',
        content: `SPANCOP es la metodología de gestión del embudo comercial de Shell Lubricantes. Su nombre es el acrónimo de las 7 etapas del ciclo de venta:

**S** - Suspect: Identificar empresas con potencial
**P** - Prospect: Calificar el potencial real
**A** - Approach: Desarrollar la oportunidad
**N** - Negotiate: Negociar condiciones
**C** - Close: Cerrar el acuerdo
**O** - Order: Gestionar el pedido
**P** - Payment: Confirmar el cobro

**¿Por qué SPANCOP?** Estandariza el proceso comercial, permite predecir el forecast con mayor precisión y facilita la gestión del equipo. Sin SPANCOP, cada vendedor tiene su propio proceso, haciendo imposible la visibilidad gerencial.`
      },
      {
        id: 2, title: 'Etapas Suspect y Prospect',
        duration: '20 min',
        videoId: 'spancop-sp',
        content: `**SUSPECT**: La oportunidad existe solo en nuestra mente. Hemos identificado una empresa que *podría* ser cliente, pero no hemos hecho contacto o validado el potencial.

Criterios para avanzar a Prospect:
- Contacto inicial realizado
- Confirmación de que usan lubricantes en sus operaciones
- Identificación del tomador de decisión

**PROSPECT**: Hemos validado que hay una oportunidad real. Sabemos quién decide, cuánto consumen aproximadamente y cuándo podría haber una compra.

Criterios para avanzar a Approach:
- Reunión de descubrimiento realizada
- Necesidad confirmada
- Hoja de descubrimiento completada
- Presupuesto o volumen estimado definido

**KPI clave - Hit Rate**: Debe ser >20%. Si tienes 10 prospects, mínimo 2 deben convertirse en clientes.`
      },
      {
        id: 3, title: 'Etapas Approach y Negotiate',
        duration: '25 min',
        videoId: 'spancop-an',
        content: `**APPROACH**: Esta es la etapa más importante y larga del ciclo. Aquí desarrollamos la solución técnica y construimos la relación.

Actividades clave en Approach:
- Análisis técnico de los equipos del cliente (POPSA)
- Presentación de propuesta técnica
- Visita técnica con ingenieros de Shell
- Demostración de producto
- Creación del caso de negocio (TCO)

**NEGOTIATE**: El cliente ha aceptado técnicamente nuestra propuesta y estamos definiendo las condiciones comerciales.

Lo que se negocia en esta etapa:
- Precio por litro y condiciones de volumen
- Plazos de entrega y stock mínimo
- Condiciones de pago (crédito, plazos)
- Soporte técnico incluido
- Garantías y compromisos de servicio

**Regla de oro**: No des descuento antes de haber demostrado el valor. El precio es una conversación fácil cuando el ROI está claro.`
      },
      {
        id: 4, title: 'KPIs: Pipeline Strength y Cycle Time',
        duration: '18 min',
        videoId: 'spancop-kpis',
        content: `**Pipeline Strength (PS)**
Fórmula: Volumen total en etapas PANC / Objetivo de volumen incremental
Objetivo: >5.0

*Ejemplo: Si tienes 1.200.000 litros en etapas P+A+N+C y tu objetivo incremental es 200.000 L → PS = 6.0 ✓*

¿Por qué >5? Porque históricamente solo el 20% del pipeline se convierte en venta. Necesitas 5 veces tu objetivo para asegurar el cumplimiento.

**Hit Rate (HR)**
Fórmula: Oportunidades cerradas / Prospectos calificados
Objetivo: >20%

**Cycle Time (CT)**
Tiempo promedio desde Approach hasta Close.
Un CT muy largo indica oportunidades estancadas.
Estrategia: Revisar mensualmente las oportunidades en Approach con >60 días sin movimiento.

**Regla práctica**: Si tu PS es bajo, genera más actividad en Suspect/Prospect. Si tu HR es bajo, mejora la calificación en Prospect.`
      },
    ],
    questions: [
      {
        id: 1,
        question: '¿Qué significa la "A" en SPANCOP?',
        type: 'single',
        options: ['Analysis', 'Approach', 'Agreement', 'Action'],
        correct: [1],
      },
      {
        id: 2,
        question: '¿Cuál es el valor mínimo aceptable de Pipeline Strength?',
        type: 'single',
        options: ['2.0', '3.5', '5.0', '7.0'],
        correct: [2],
      },
      {
        id: 3,
        question: '¿En qué etapa SPANCOP se realiza el análisis técnico POPSA?',
        type: 'single',
        options: ['Suspect', 'Prospect', 'Approach', 'Negotiate'],
        correct: [2],
      },
      {
        id: 4,
        question: 'Un Hit Rate del 18% significa que:',
        type: 'single',
        options: [
          'Estás por encima del objetivo mínimo',
          'Por cada 100 prospectos, 18 se convierten en clientes — por debajo del mínimo',
          'Tu pipeline es suficientemente grande',
          'Debes reducir el número de prospectos',
        ],
        correct: [1],
      },
      {
        id: 5,
        question: '¿Cuáles son criterios para avanzar de Suspect a Prospect? (selecciona todos los correctos)',
        type: 'multiple',
        options: [
          'Contacto inicial realizado',
          'Contrato firmado',
          'Identificación del tomador de decisión',
          'Confirmación de que usan lubricantes',
        ],
        correct: [0, 2, 3],
      },
    ],
  },

  'pu-03': {
    title: 'Venta Consultiva B2B',
    lessons: [
      {
        id: 1, title: '¿Qué es la venta consultiva?',
        duration: '20 min',
        videoId: 'consultive-intro',
        content: `La venta consultiva es un enfoque de ventas donde el vendedor actúa como un consultor de negocio para el cliente, en lugar de simplemente presentar un producto.

**Diferencia clave:**

| Venta Transaccional | Venta Consultiva |
|---|---|
| "¿Cuántos litros necesita?" | "¿Qué problemas tienen con su lubricación actual?" |
| Foco en precio | Foco en valor y ROI |
| Relación corta | Relación a largo plazo |
| El cliente toma la iniciativa | El vendedor guía el proceso |

**En lubricantes industriales**, la venta consultiva es la única estrategia que funciona porque:
1. El cliente no sabe todo lo que necesita saber sobre lubricación
2. La decisión afecta la continuidad operativa de la empresa
3. El switching cost es alto — si construyes valor, la lealtad es alta`
      },
      {
        id: 2, title: 'Descubrimiento: las preguntas correctas',
        duration: '28 min',
        videoId: 'discovery-questions',
        content: `El 70% del éxito en la venta consultiva está en el descubrimiento. Un buen descubrimiento hace que la propuesta se "venda sola".

**Modelo SPIN para lubricantes:**

**S - Situación**: Entender el contexto actual
- "¿Qué equipos tienen en operación y cuántos son?"
- "¿Qué lubricante están usando actualmente?"
- "¿Cuál es su intervalo de cambio actual?"

**P - Problema**: Identificar puntos de dolor
- "¿Han tenido paradas no programadas por fallas de equipo?"
- "¿Están satisfechos con los intervalos de mantenimiento actuales?"
- "¿Han tenido problemas con el lubricante en condiciones extremas?"

**I - Implicación**: Ampliar el impacto del problema
- "¿Cuánto les cuesta en producción perdida una parada de 4 horas?"
- "¿Con qué frecuencia ocurren estas fallas?"

**N - Necesidad de solución**: Crear urgencia
- "Si pudieran extender sus intervalos de cambio un 30%, ¿cuánto ahorrarían anualmente?"
- "¿Qué valor tendría para ustedes eliminar el 40% de esas paradas?"`,
      },
      {
        id: 3, title: 'Construcción del caso de valor (TCO)',
        duration: '30 min',
        videoId: 'tco-building',
        content: `El TCO (Total Cost of Ownership) es la herramienta más poderosa en la venta consultiva de lubricantes.

**Componentes del TCO:**

1. **Costo del lubricante**: Precio/litro × litros consumidos/año
2. **Mano de obra de mantenimiento**: Horas técnico × tarifa/hora × número de cambios/año
3. **Paro de producción**: Horas paradas × producción/hora × margen
4. **Desgaste de componentes**: Costo de repuestos por desgaste prematuro
5. **Gestión de residuos**: Disposición de aceite usado

**Ejemplo práctico — Minera Andina del Sur:**
- Costo actual con lubricante básico: $95.000/año
- Costo propuesto con Shell Rimula R6 M: $62.000/año
- Ahorro anual: **$33.000** (35%)
- El "mayor precio" de Shell se paga con el 30% menos de consumo y la eliminación de 4 paradas no programadas

**Mensaje clave**: "No estamos vendiéndoles un aceite más caro. Estamos vendiéndoles un sistema que reduce su costo total en $33.000 anuales."`,
      },
    ],
    questions: [
      {
        id: 1,
        question: '¿Qué significa SPIN en el contexto de ventas consultivas?',
        type: 'single',
        options: [
          'Sistema, Producto, Implementación, Negociación',
          'Situación, Problema, Implicación, Necesidad de solución',
          'Servicio, Precio, Instalación, Negocio',
          'Suspect, Prospect, Interés, Necesidad',
        ],
        correct: [1],
      },
      {
        id: 2,
        question: '¿Cuáles son componentes del TCO de lubricantes? (selecciona todos los correctos)',
        type: 'multiple',
        options: [
          'Costo del lubricante',
          'Marca del proveedor',
          'Mano de obra de mantenimiento',
          'Paro de producción',
          'Gestión de residuos',
        ],
        correct: [0, 2, 3, 4],
      },
      {
        id: 3,
        question: 'En el ejemplo de Minera Andina del Sur, ¿cuál fue el ahorro anual proyectado con Shell Rimula?',
        type: 'single',
        options: ['$15.000', '$33.000', '$50.000', '$95.000'],
        correct: [1],
      },
      {
        id: 4,
        question: '¿Por qué el 70% del éxito en venta consultiva depende del descubrimiento?',
        type: 'single',
        options: [
          'Porque permite conocer el precio que el cliente está dispuesto a pagar',
          'Porque un buen descubrimiento hace que la propuesta se venda sola al evidenciar el valor',
          'Porque sin descubrimiento no se puede acceder al tomador de decisión',
          'Porque el cliente siempre sabe lo que necesita antes de la reunión',
        ],
        correct: [1],
      },
    ],
  },

  'pu-04': {
    title: 'Manejo de Objeciones',
    lessons: [
      {
        id: 1, title: 'Las 5 objeciones más comunes en lubricantes',
        duration: '22 min',
        videoId: 'objections-top5',
        content: `Las objeciones son oportunidades disfrazadas. Cuando un cliente objeta, está comprometido con la conversación — el peligro real es la indiferencia.

**Objeción 1: "Es muy caro"**
No es una objeción de precio, es una objeción de valor. Respuesta: Construir el TCO y mostrar que el costo total es menor.

**Objeción 2: "Ya tenemos un proveedor con el que estamos contentos"**
Respuesta: "Qué bueno que tengan un proveedor de confianza. ¿Les han realizado algún análisis de aceite usado o auditoría técnica? Nosotros hacemos eso sin costo. ¿Cuándo podríamos programarlo?"

**Objeción 3: "No es el momento para cambiar"**
Respuesta: Identificar cuándo SÍ sería el momento (próximo mantenimiento, fin de contrato) y planificar para ese hito.

**Objeción 4: "Necesito consultarlo con otras personas"**
Respuesta: Identificar a todos los involucrados y agendar una reunión conjunta con el cliente.

**Objeción 5: "Ya hemos probado Shell antes y no vimos diferencia"**
Respuesta: Investigar qué producto usaron, si fue aplicado correctamente. Ofrecer una prueba técnica con medición de resultados.`,
      },
      {
        id: 2, title: 'Técnica Feel-Felt-Found',
        duration: '18 min',
        videoId: 'feel-felt-found',
        content: `La técnica Feel-Felt-Found (Siento-Sentí-Encontré) es una de las más efectivas para manejar objeciones emocionales.

**Estructura:**
1. **FEEL** (Siento): Valida la emoción del cliente
2. **FELT** (Sentí): Muestra empatía con un caso similar
3. **FOUND** (Encontré): Comparte el resultado positivo

**Ejemplo práctico:**

Cliente: "No creo que valga la pena el cambio. Mi proveedor actual me da buen servicio."

Respuesta: "Entiendo perfectamente cómo se siente *(Feel)*. Cuando hablé con el Gerente de Mantenimiento de Minera Los Andes, él sentía lo mismo sobre su proveedor anterior *(Felt)*. Lo que encontró después de 6 meses con Shell Rimula fue una reducción del 38% en paradas no programadas y un ahorro de $28.000 anuales *(Found)*. ¿Le gustaría conversar con él directamente?"

**La clave**: Siempre tener casos de éxito reales y específicos del mismo sector del cliente.`,
      },
    ],
    questions: [
      {
        id: 1,
        question: 'Una objeción de "Es muy caro" es fundamentalmente una objeción de:',
        type: 'single',
        options: ['Precio', 'Valor', 'Timing', 'Confianza'],
        correct: [1],
      },
      {
        id: 2,
        question: '¿Cuál es el orden correcto de la técnica Feel-Felt-Found?',
        type: 'single',
        options: [
          'Caso de éxito → Empatía → Validación emocional',
          'Validación emocional → Empatía con caso similar → Resultado positivo',
          'Precio → Beneficio → Cierre',
          'Pregunta → Respuesta → Acuerdo',
        ],
        correct: [1],
      },
      {
        id: 3,
        question: '¿Cuál es la mejor respuesta ante "Ya tenemos un proveedor con el que estamos contentos"?',
        type: 'single',
        options: [
          'Atacar directamente al competidor con comparativas de precio',
          'Retirarse y esperar a que el contrato venza',
          'Ofrecer un análisis técnico o auditoría gratuita para mostrar valor sin presión',
          'Insistir en una reunión inmediata con el gerente general',
        ],
        correct: [2],
      },
      {
        id: 4,
        question: '¿Qué representa realmente una objeción del cliente?',
        type: 'single',
        options: [
          'Un rechazo definitivo a la propuesta',
          'Una señal de que el cliente está comprometido con la conversación',
          'Que el precio es demasiado alto',
          'Que debemos cambiar de producto',
        ],
        correct: [1],
      },
    ],
  },

  'pu-05': {
    title: 'Marca Personal del Vendedor',
    lessons: [
      {
        id: 1, title: '¿Por qué importa tu marca personal?',
        duration: '20 min',
        videoId: 'personal-brand',
        content: `En B2B, la gente compra a personas antes que a empresas. Tu reputación profesional es tan importante como el producto que representas.

**Los clientes B2B buscan en su proveedor:**
1. Conocimiento técnico genuino
2. Confiabilidad y cumplimiento de compromisos
3. Acceso rápido y respuesta oportuna
4. Proactividad (que llegue antes del problema)

**Elementos de tu marca personal como ejecutivo Shell:**
- **LinkedIn activo**: Mínimo 2 publicaciones semanales sobre lubricación industrial
- **Expertise visible**: Comparte casos de éxito (sin datos confidenciales), tips técnicos, noticias del sector
- **Puntualidad y preparación**: Llegar 5 minutos antes, con la información del cliente revisada
- **Seguimiento sin presión**: Un mensaje de valor cada 2 semanas a clientes prospects`,
      },
      {
        id: 2, title: 'Networking y presencia en el sector',
        duration: '25 min',
        videoId: 'networking-sector',
        content: `El networking efectivo no es repartir tarjetas — es crear relaciones que generan confianza mutua.

**Estrategia de networking para ejecutivos Shell:**

**Online:**
- LinkedIn: Conectar con todos los contactos post-reunión, el mismo día
- Comentar publicaciones de clientes y prospectos
- Participar en grupos de minería, transporte e industria

**Offline:**
- Asistir a ferias y congresos del sector (Perumin, ExpoTransporte)
- Invitar clientes a eventos Shell (lanzamientos, charlas técnicas)
- Generar referencias cruzadas entre clientes no competidores

**Regla del 80/20 en contenido:**
- 80% contenido de valor (técnico, educativo, tendencias)
- 20% contenido comercial (productos, ofertas, logros)

**Métrica de éxito**: ¿Cuántos clientes potenciales te contactan a ti primero cuando necesitan lubricantes? Ese es el indicador de una marca personal sólida.`,
      },
    ],
    questions: [
      {
        id: 1,
        question: '¿Cuál es la regla del 80/20 aplicada al contenido en redes sociales de un ejecutivo comercial?',
        type: 'single',
        options: [
          '80% comercial, 20% técnico',
          '80% de valor (técnico/educativo), 20% comercial',
          '80% sobre la empresa, 20% personal',
          '80% LinkedIn, 20% otras redes',
        ],
        correct: [1],
      },
      {
        id: 2,
        question: '¿Cuáles son elementos de una marca personal sólida para ejecutivos Shell? (selecciona todos)',
        type: 'multiple',
        options: [
          'LinkedIn activo con contenido de valor',
          'Puntualidad y preparación en reuniones',
          'Seguimiento sin presión con mensajes de valor',
          'Publicar solo contenido comercial de Shell',
          'Expertise técnico visible',
        ],
        correct: [0, 1, 2, 4],
      },
      {
        id: 3,
        question: '¿Cuál es el indicador más claro de que un ejecutivo tiene una marca personal sólida?',
        type: 'single',
        options: [
          'Tener más de 1.000 conexiones en LinkedIn',
          'Que los clientes potenciales lo contacten a él primero cuando necesitan lubricantes',
          'Haber cerrado más de 10 deals en el año',
          'Publicar todos los días en redes sociales',
        ],
        correct: [1],
      },
    ],
  },

  'pu-06': {
    title: 'Shell Rimula – Diesel Engines',
    lessons: [
      {
        id: 1, title: 'Tecnología detrás de Shell Rimula',
        duration: '18 min',
        videoId: 'rimula-technology',
        content: `Shell Rimula es la línea de aceites para motor diesel más vendida del mundo, presente en más de 130 países.

**Línea completa Shell Rimula:**
- **R2 Extra**: Mineral, para flotas con presupuesto limitado y motores convencionales
- **R3**: Mineral de alta calidad, protección robusta para condiciones difíciles
- **R4 X**: Semisintético, para flotas mixtas con requerimientos API CI-4 Plus
- **R5 E**: Sintético parcial, ACEA E7, alto desempeño para flotas modernas
- **R6 M**: Full sintético, para motores Euro IV-VI con sistemas de postratamiento

**Tecnología Dynamic Protection Plus (R6 M):**
El aceite "sensa" las condiciones de operación y ajusta dinámicamente su protección. En condiciones de alta carga, aumenta la película protectora. En ralentí, reduce la resistencia para mejorar la eficiencia de combustible.`,
      },
      {
        id: 2, title: 'Aplicaciones y sectores clave',
        duration: '20 min',
        videoId: 'rimula-applications',
        content: `**Minería**: Camiones de acarreo (CAT 793, Komatsu 785), cargadores, perforadoras. Condiciones extremas de carga y temperatura. Recomendado: Rimula R6 M o R5 E.

**Transporte**: Tractos Euro V-VI (Volvo, Scania, Mercedes). Largos intervalos entre cambios, eficiencia de combustible crítica. Recomendado: Rimula R6 M.

**Generación eléctrica**: Grupos electrógenos Caterpillar, Cummins, Perkins. Operación continua 24/7. Recomendado: Rimula R4 X o R5 E según potencia.

**Agricultura**: Tractores, cosechadoras. Motores diesel de media potencia. Recomendado: Rimula R4 X.

**Argumento por sector:**
- Minería: Reducción de paradas no programadas
- Transporte: Ahorro en combustible y extensión de intervalos
- Generación: Protección 24/7 sin fallas`,
      },
    ],
    questions: [
      {
        id: 1,
        question: '¿Cuál es la versión de Shell Rimula recomendada para motores Euro VI con sistemas de postratamiento (DPF/SCR)?',
        type: 'single',
        options: ['Rimula R2 Extra', 'Rimula R4 X', 'Rimula R5 E', 'Rimula R6 M'],
        correct: [3],
      },
      {
        id: 2,
        question: '¿Qué hace la tecnología Dynamic Protection Plus del Rimula R6 M?',
        type: 'single',
        options: [
          'Cambia de viscosidad según la temperatura exterior',
          'Adapta dinámicamente la protección según las condiciones de operación del motor',
          'Mezcla automáticamente diferentes aceites base',
          'Elimina la necesidad de filtros de aceite',
        ],
        correct: [1],
      },
      {
        id: 3,
        question: '¿Cuáles son sectores clave de aplicación para Shell Rimula? (selecciona todos)',
        type: 'multiple',
        options: ['Minería', 'Lubricación de engranajes industriales', 'Transporte', 'Generación eléctrica', 'Sistemas hidráulicos'],
        correct: [0, 2, 3],
      },
    ],
  },

  'pu-07': {
    title: 'Shell Tellus – Hydraulic Systems',
    lessons: [
      {
        id: 1, title: 'Fundamentos de sistemas hidráulicos',
        duration: '25 min',
        videoId: 'hydraulic-basics',
        content: `Los sistemas hidráulicos transmiten fuerza a través de un fluido incompresible. Son fundamentales en:
- Equipos de construcción (excavadoras, cargadores)
- Sistemas de dirección y frenos de camiones pesados
- Maquinaria industrial (prensas, tornos CNC)
- Equipos portuarios y de manejo de carga

**El fluido hidráulico cumple 5 funciones:**
1. **Transmisión de potencia** (función principal)
2. **Lubricación** de bombas, válvulas y cilindros
3. **Sellado** de tolerancias internas
4. **Refrigeración** del sistema
5. **Anticorrosión** de componentes metálicos

**Causas más comunes de fallos hidráulicos:**
- 70% relacionados con la contaminación del fluido
- 20% por selección incorrecta del fluido
- 10% por fallos de componentes`,
      },
      {
        id: 2, title: 'Línea Shell Tellus y aplicaciones',
        duration: '22 min',
        videoId: 'tellus-line',
        content: `**Shell Tellus S2 M**: Mineral de alta calidad. Para sistemas hidráulicos industriales estándar, temperaturas moderadas (-10°C a +70°C). Precio accesible, excelente relación costo-beneficio.

**Shell Tellus S3 M**: Semisintético. Mejor respuesta en temperaturas bajas, mayor estabilidad térmica. Para equipos con operación en ambientes variables.

**Shell Tellus S4 VX**: Completamente sintético (PAO). Rango de temperatura extremo (-40°C a +90°C). Para equipos críticos donde el downtime es muy costoso. ISO VG 15-100.

**Shell Tellus S4 ME**: Optimizado para eficiencia energética. Puede reducir el consumo energético del sistema hidráulico hasta 6% vs aceites minerales.

**Cuándo recomendar S4 VX:**
- Terminales portuarios (operación 24/7, temperatura variable)
- Minería (condiciones extremas de polvo y temperatura)
- Cualquier sistema donde una parada cuesta >$5.000/hora`,
      },
    ],
    questions: [
      {
        id: 1,
        question: '¿Qué porcentaje de fallos hidráulicos está relacionado con contaminación del fluido?',
        type: 'single',
        options: ['20%', '40%', '70%', '90%'],
        correct: [2],
      },
      {
        id: 2,
        question: '¿Cuál es el rango de temperatura de operación del Shell Tellus S4 VX?',
        type: 'single',
        options: ['-10°C a +70°C', '-20°C a +80°C', '-40°C a +90°C', '0°C a +100°C'],
        correct: [2],
      },
      {
        id: 3,
        question: '¿Cuáles son las 5 funciones del fluido hidráulico? (selecciona todos)',
        type: 'multiple',
        options: [
          'Transmisión de potencia',
          'Lubricación',
          'Sellado',
          'Combustión',
          'Refrigeración',
          'Anticorrosión',
        ],
        correct: [0, 1, 2, 4, 5],
      },
    ],
  },

  'pu-08': {
    title: 'Negociación con Clientes Pareto',
    lessons: [
      {
        id: 1, title: '¿Quiénes son tus clientes Pareto?',
        duration: '20 min',
        videoId: 'pareto-clients',
        content: `La regla de Pareto en ventas: el 20% de tus clientes genera el 80% de tus ingresos. Estos son tus clientes Pareto — requieren una estrategia diferente.

**Características de un cliente Pareto en lubricantes industriales:**
- Volumen anual >50.000 litros
- Múltiples puntos de consumo (varias plantas o flotas)
- Decisión de compra descentralizada (varios tomadores de decisión)
- Poder de negociación alto
- Relación de largo plazo establecida o potencial

**Estrategia de cuenta Pareto:**
1. **Mapeo de stakeholders**: Identificar TODOS los involucrados en la decisión (compras, mantenimiento, finanzas, gerencia)
2. **Cuenta dentro de la cuenta**: Cada planta o flota es una mini-cuenta independiente
3. **Revisiones QBR**: Reunión trimestral de negocio con indicadores de valor entregado
4. **Plan de cuenta anual**: Documentar oportunidades, riesgos y estrategia para los próximos 12 meses`,
      },
      {
        id: 2, title: 'Negociación de contratos de largo plazo',
        duration: '30 min',
        videoId: 'long-term-contracts',
        content: `Los contratos de largo plazo (12-36 meses) son la herramienta más poderosa para asegurar ingresos recurrentes con clientes Pareto.

**Estructura de un contrato marco Shell:**
- Volumen mínimo garantizado mensual
- Precio fijo por 12 meses (protege al cliente de variaciones de mercado)
- Niveles de servicio (SLA) con penalidades
- Soporte técnico dedicado incluido
- Revisiones de precio anuales ligadas a índices de inflación

**Tácticas de negociación con compradores profesionales:**

**Anclaje**: Siempre presenta primero. El primer número en la mesa crea el punto de referencia.

**Silencio estratégico**: Después de presentar tu propuesta, espera. El primero que habla, pierde terreno.

**Concesiones condicionales**: Nunca des sin recibir. "Puedo revisar el precio si ustedes confirman el volumen mínimo de 60.000 litros anuales."

**BATNA (Best Alternative to Negotiated Agreement)**: Conoce tu punto de quiebre antes de entrar a negociar. No cedas por debajo de tu margen mínimo aceptable.`,
      },
    ],
    questions: [
      {
        id: 1,
        question: 'Según la regla de Pareto en ventas, ¿qué porcentaje de tus clientes genera el 80% de ingresos?',
        type: 'single',
        options: ['5%', '10%', '20%', '50%'],
        correct: [2],
      },
      {
        id: 2,
        question: '¿Qué significa BATNA en negociación?',
        type: 'single',
        options: [
          'Best Annual Trade Negotiation Agreement',
          'Best Alternative to Negotiated Agreement',
          'Business Account Total Negotiation Analysis',
          'Buyer Account Terms and Negotiation Agreement',
        ],
        correct: [1],
      },
      {
        id: 3,
        question: '¿Qué elementos incluye un contrato marco Shell con cliente Pareto? (selecciona todos)',
        type: 'multiple',
        options: [
          'Volumen mínimo garantizado',
          'Precio fijo por 12 meses',
          'Soporte técnico dedicado',
          'Garantía de precio por 5 años fijo',
          'Revisiones QBR trimestrales',
        ],
        correct: [0, 1, 2],
      },
      {
        id: 4,
        question: 'En negociación, ¿qué táctica implica "nunca dar sin recibir"?',
        type: 'single',
        options: ['Anclaje', 'Silencio estratégico', 'Concesiones condicionales', 'BATNA'],
        correct: [2],
      },
    ],
  },
};
