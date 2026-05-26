// Rich detail data for each alert — used in AlertDetailModal

const months = ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May'];

export const alertDetails = {

  'alert-01': {
    title: 'Sin contacto hace 7 días',
    severity: 'Alta',
    type: 'sin_contacto',
    summary: 'La oportunidad con Minera Andina del Sur lleva 7 días sin actividad registrada. El cliente confirmó interés en Shell Rimula pero está esperando propuesta actualizada.',
    clients: [
      {
        company: 'Minera Andina del Sur S.A.C.',
        contact: 'Carlos Benavides',
        role: 'Gerente de Mantenimiento',
        phone: '+51 984 231 456',
        executive: 'Paola Fernández',
        lastContact: '19 May 2026',
        daysSince: 7,
        stage: 'Approach',
        opportunityId: 'OPP-001',
        product: 'Shell Rimula R6 M',
        volumeL: 28000,
        valueUSD: 58400,
      }
    ],
    recommendation: 'Contactar a Carlos Benavides hoy. Recordarle el compromiso de propuesta actualizada para esta semana. Confirmar fecha de visita técnica del 4 de junio.',
    volumeHistory: null,
  },

  'alert-02': {
    title: 'Compromiso técnico próximo a vencer',
    severity: 'Alta',
    type: 'compromiso',
    summary: 'Se venció el plazo para entregar referencia de cliente minero similar solicitada por Operaciones Mineras Chavín. Este compromiso fue clave para avanzar la negociación.',
    clients: [
      {
        company: 'Operaciones Mineras Chavín',
        contact: 'Ernesto Mamani',
        role: 'Jefe de Compras',
        phone: '+51 914 098 234',
        executive: 'Paola Fernández',
        lastContact: '23 May 2026',
        daysSince: 2,
        stage: 'Negotiate',
        opportunityId: 'OPP-009',
        product: 'Shell Diala S4 ZX',
        volumeL: 14000,
        valueUSD: 39200,
      }
    ],
    commitments: [
      { text: 'Entregar referencia de cliente minero con Shell Diala', dueDate: '30 May 2026', status: 'vencido' },
      { text: 'Confirmar plazo de entrega en 72 hrs', dueDate: '2 Jun 2026', status: 'pendiente' },
    ],
    recommendation: 'Preparar y enviar hoy el caso de éxito de Cajamarca (Shell Diala, reducción 40% fallas). Contactar a Ernesto Mamani para confirmar recepción y fecha de cierre.',
    volumeHistory: null,
  },

  'alert-03': {
    title: 'Caída de volumen detectada –18%',
    severity: 'Media',
    type: 'caida_volumen',
    summary: 'Se detectó una caída de –18% en el volumen estimado de Transportes Pacífico Norte respecto al último forecast. La caída pasó de 51.000 L estimados a 42.000 L actuales en los últimos 30 días.',
    clients: [
      {
        company: 'Transportes Pacífico Norte',
        contact: 'Mariana Quiroz',
        role: 'Jefe de Compras',
        phone: '+51 944 321 567',
        executive: 'Diego Herrera',
        lastContact: '20 May 2026',
        daysSince: 5,
        stage: 'Approach',
        opportunityId: 'OPP-002',
        product: 'Shell Rimula R5 E',
        volumeAnteriorL: 51000,
        volumeActualL: 42000,
        caida: -18,
        periodo: 'Abr 2026 → May 2026',
        valueUSD: 75600,
      },
      {
        company: 'Flota Nacional ETESAL',
        contact: 'Carmen Ávila',
        role: 'Jefe de Flota',
        phone: '+51 944 321 567',
        executive: 'Diego Herrera',
        lastContact: '5 May 2026',
        daysSince: 20,
        stage: 'Suspect',
        opportunityId: 'OPP-012',
        product: 'Shell Rimula R5 E',
        volumeAnteriorL: 38000,
        volumeActualL: 35000,
        caida: -8,
        periodo: 'Mar 2026 → May 2026',
        valueUSD: 63000,
      }
    ],
    volumeHistory: {
      'Transportes Pacífico Norte': [
        { mes: 'Jun', vol: 46000 }, { mes: 'Jul', vol: 48000 }, { mes: 'Ago', vol: 47500 },
        { mes: 'Sep', vol: 50000 }, { mes: 'Oct', vol: 51000 }, { mes: 'Nov', vol: 49500 },
        { mes: 'Dic', vol: 52000 }, { mes: 'Ene', vol: 50500 }, { mes: 'Feb', vol: 51000 },
        { mes: 'Mar', vol: 51000 }, { mes: 'Abr', vol: 51000 }, { mes: 'May', vol: 42000 },
      ],
      'Flota Nacional ETESAL': [
        { mes: 'Jun', vol: 32000 }, { mes: 'Jul', vol: 33500 }, { mes: 'Ago', vol: 34000 },
        { mes: 'Sep', vol: 35000 }, { mes: 'Oct', vol: 36000 }, { mes: 'Nov', vol: 37000 },
        { mes: 'Dic', vol: 37500 }, { mes: 'Ene', vol: 38000 }, { mes: 'Feb', vol: 38000 },
        { mes: 'Mar', vol: 38000 }, { mes: 'Abr', vol: 36000 }, { mes: 'May', vol: 35000 },
      ],
    },
    recommendation: 'Reunirse urgente con Mariana Quiroz (Transportes) para entender causa de la reducción. Verificar si hay un competidor activo o si el cliente redujo flota. Para ETESAL, confirmar si se canceló algún contrato de servicio.',
  },

  'alert-04': {
    title: 'Oportunidad estancada hace 21 días',
    severity: 'Media',
    type: 'estancada',
    summary: 'Pesquera Horizonte Azul lleva 21 días sin avance en la etapa Suspect. No se ha calificado el potencial real ni identificado formalmente al tomador de decisión.',
    clients: [
      {
        company: 'Pesquera Horizonte Azul',
        contact: 'Valeria Rojas',
        role: 'Coordinadora de Flota',
        phone: '+51 964 543 789',
        executive: 'Martín Salazar',
        lastContact: '28 Abr 2026',
        daysSince: 27,
        stage: 'Suspect',
        opportunityId: 'OPP-003',
        product: 'Shell Morlina S4 R',
        volumeL: 18000,
        valueUSD: 32400,
        diasEnEtapa: 30,
      }
    ],
    timeline: [
      { fecha: '28 Abr', evento: 'Primer contacto telefónico. Interés preliminar.', tipo: 'llamada' },
      { fecha: '—', evento: 'Sin actividad registrada por 21 días', tipo: 'warning' },
    ],
    recommendation: 'Agendar reunión de descubrimiento con Valeria Rojas esta semana. Objetivo: calificar volumen real, identificar decisor final y completar hoja de descubrimiento para avanzar a Prospect.',
    volumeHistory: null,
  },

  'alert-05': {
    title: 'Contrato próximo a vencer – 15 días',
    severity: 'Alta',
    type: 'contrato',
    summary: 'El contrato marco vigente con AeroServicios Lima Cargo vence el 10 de junio de 2026. Debe iniciarse la renovación de inmediato para evitar una interrupción en el suministro.',
    clients: [
      {
        company: 'AeroServicios Lima Cargo',
        contact: 'Andrea Espinoza',
        role: 'Gerente Comercial',
        phone: '+51 984 765 901',
        executive: 'Carlos Mendoza',
        lastContact: '22 May 2026',
        daysSince: 3,
        stage: 'Negotiate',
        opportunityId: 'OPP-006b',
        product: 'Shell Aeroshell Fluid 41',
        volumeL: 8000,
        valueUSD: 44000,
        contratoVigente: { inicio: '10 Jun 2025', vencimiento: '10 Jun 2026', diasRestantes: 15 },
        contratoNuevo: { duracion: '12 meses', valorAnual: '$44.000', condicion: 'Precio fijo' },
      }
    ],
    recommendation: 'Enviar propuesta de renovación esta semana con mejora en condiciones (certificaciones DGAC actualizadas, soporte técnico en sitio). Reunión de cierre antes del 5 de junio.',
    volumeHistory: {
      'AeroServicios Lima Cargo': [
        { mes: 'Jun', vol: 6500 }, { mes: 'Jul', vol: 6800 }, { mes: 'Ago', vol: 7000 },
        { mes: 'Sep', vol: 7200 }, { mes: 'Oct', vol: 7500 }, { mes: 'Nov', vol: 7800 },
        { mes: 'Dic', vol: 8000 }, { mes: 'Ene', vol: 8000 }, { mes: 'Feb', vol: 8000 },
        { mes: 'Mar', vol: 8000 }, { mes: 'Abr', vol: 8000 }, { mes: 'May', vol: 8000 },
      ],
    },
  },

  'alert-06': {
    title: 'Forecast bajo frente a meta (68%)',
    severity: 'Media',
    type: 'forecast',
    summary: 'El forecast consolidado de Martín Salazar está al 68% del objetivo mensual, por debajo del mínimo esperado del 80%. La principal causa es el retraso en el cierre de Cementos del Valle.',
    clients: [
      {
        company: 'Cementos del Valle Perú',
        contact: 'Rosa Quispe',
        role: 'Gerente de Mantenimiento',
        phone: '+51 904 987 123',
        executive: 'Martín Salazar',
        lastContact: '24 May 2026',
        daysSince: 1,
        stage: 'Negotiate',
        opportunityId: 'OPP-008',
        product: 'Shell Omala S4 WE',
        volumeL: 31000,
        valueUSD: 93000,
        forecastActual: 68,
        forecastMeta: 80,
        gap: 12,
      }
    ],
    volumeHistory: {
      'Forecast vs Meta': [
        { mes: 'Jun', forecast: 82, meta: 80 }, { mes: 'Jul', forecast: 88, meta: 80 },
        { mes: 'Ago', forecast: 79, meta: 80 }, { mes: 'Sep', forecast: 85, meta: 80 },
        { mes: 'Oct', forecast: 91, meta: 80 }, { mes: 'Nov', forecast: 87, meta: 80 },
        { mes: 'Dic', forecast: 76, meta: 80 }, { mes: 'Ene', forecast: 83, meta: 80 },
        { mes: 'Feb', forecast: 90, meta: 80 }, { mes: 'Mar', forecast: 85, meta: 80 },
        { mes: 'Abr', forecast: 78, meta: 80 }, { mes: 'May', forecast: 68, meta: 80 },
      ],
    },
    recommendation: 'Priorizar el cierre de Cementos del Valle esta semana. Revisar con Martín Salazar si Constructora Cordillera puede acelerarse. El gap de 12 pts representa ~37.200 L adicionales que deben asegurarse antes del 30 de mayo.',
  },

  'alert-07': {
    title: 'Cliente Pareto sin visita hace 30 días',
    severity: 'Baja',
    type: 'pareto',
    summary: 'Distribuidora LubriSur Perú es un cliente Pareto que no ha recibido visita presencial en 30 días. El programa de distribuidores requiere visita mínima mensual.',
    clients: [
      {
        company: 'Distribuidora LubriSur Perú',
        contact: 'Patricia Llanos',
        role: 'Gerente General',
        phone: '+51 924 109 345',
        executive: 'Ana Lucía Torres',
        lastContact: '25 Abr 2026',
        daysSince: 30,
        stage: 'Prospect',
        opportunityId: 'OPP-010',
        product: 'Shell Helix Ultra + Shell Rimula',
        volumeL: 12000,
        valueUSD: 21600,
        categoria: 'Pareto A — Distribuidor potencial',
      }
    ],
    recommendation: 'Agendar visita presencial con Patricia Llanos esta semana. Llevar propuesta actualizada del programa de distribuidores autorizados Shell con margen preferencial y material POP.',
    volumeHistory: null,
  },

  'alert-08': {
    title: '3 compromisos técnicos sin resolución',
    severity: 'Media',
    type: 'compromiso',
    summary: 'Constructora Cordillera S.A. tiene 3 compromisos técnicos pendientes que llevan más de 2 semanas sin resolución. Esto puede afectar el avance hacia el cierre.',
    clients: [
      {
        company: 'Constructora Cordillera S.A.',
        contact: 'Renato Salazar',
        role: 'Supervisor Técnico',
        phone: '+51 974 654 890',
        executive: 'Martín Salazar',
        lastContact: '16 May 2026',
        daysSince: 9,
        stage: 'Close',
        opportunityId: 'OPP-005',
        product: 'Shell Gadus S5 T',
        volumeL: 8500,
        valueUSD: 25500,
      }
    ],
    commitments: [
      { text: 'Cotización formal con descuento por volumen', dueDate: '16 May 2026', status: 'vencido' },
      { text: 'Visita técnica a obra en Ate', dueDate: '20 May 2026', status: 'vencido' },
      { text: 'Revisión de contratos actuales con proveedor actual', dueDate: '23 May 2026', status: 'vencido' },
    ],
    recommendation: 'Prioridad inmediata. Enviar cotización formal hoy mismo. Agendar visita técnica a la obra para esta semana. El cliente ya está en Close — no perder el momentum.',
    volumeHistory: null,
  },

  'alert-09': {
    title: 'Oportunidad en riesgo – competidor activo',
    severity: 'Alta',
    type: 'riesgo',
    summary: 'Se detectó actividad de Mobil Lubricants en la cuenta de Flota Nacional ETESAL. El competidor está ofreciendo un precio 12% menor con condiciones de crédito a 60 días.',
    clients: [
      {
        company: 'Flota Nacional ETESAL',
        contact: 'Carmen Ávila',
        role: 'Jefe de Flota',
        phone: '+51 944 321 567',
        executive: 'Diego Herrera',
        lastContact: '5 May 2026',
        daysSince: 20,
        stage: 'Suspect',
        opportunityId: 'OPP-012',
        product: 'Shell Rimula R5 E',
        volumeL: 35000,
        valueUSD: 63000,
        competidor: 'Mobil Lubricants',
        amenaza: 'Precio 12% menor + crédito 60 días',
      }
    ],
    recommendation: 'Contactar urgente a Carmen Ávila. Diferenciarse con análisis de TCO completo que demuestre el menor costo total con Shell Rimula. Ofrecer prueba técnica gratuita de 3 meses con medición de resultados. Solicitar reunión técnica con el equipo de mantenimiento.',
    volumeHistory: null,
  },

  'alert-10': {
    title: 'Renovación de contrato – Junio 2026',
    severity: 'Baja',
    type: 'renovacion',
    summary: 'El contrato anual con Agroindustrial Santa Lucía vence en junio 2026. Es una oportunidad para ampliar el portafolio e incluir Shell Omala S4 GX para sus reductores de velocidad.',
    clients: [
      {
        company: 'Agroindustrial Santa Lucía',
        contact: 'Luis Paredes',
        role: 'Director de Operaciones',
        phone: '+51 954 432 678',
        executive: 'Ana Lucía Torres',
        lastContact: '12 May 2026',
        daysSince: 13,
        stage: 'Prospect',
        opportunityId: 'OPP-003b',
        product: 'Shell Omala S4 GX',
        volumeL: 9500,
        valueUSD: 28500,
        contratoVigente: { inicio: 'Jun 2025', vencimiento: 'Jun 2026', valorAnual: '$28.500' },
        ampliacion: { producto: 'Shell Omala S4 GX', volumenAdicional: '6.000 L', valorAdicional: '$18.000' },
      }
    ],
    volumeHistory: {
      'Agroindustrial Santa Lucía': [
        { mes: 'Jun', vol: 7500 }, { mes: 'Jul', vol: 7800 }, { mes: 'Ago', vol: 8000 },
        { mes: 'Sep', vol: 8200 }, { mes: 'Oct', vol: 8500 }, { mes: 'Nov', vol: 8800 },
        { mes: 'Dic', vol: 9000 }, { mes: 'Ene', vol: 9200 }, { mes: 'Feb', vol: 9500 },
        { mes: 'Mar', vol: 9500 }, { mes: 'Abr', vol: 9500 }, { mes: 'May', vol: 9500 },
      ],
    },
    recommendation: 'Preparar propuesta de renovación ampliada incluyendo Shell Omala para reductores. Presentar antes del 15 de junio. Aprovechar la relación positiva existente con Luis Paredes.',
  },
};
