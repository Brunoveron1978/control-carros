export const vehiculosData = [
  {
    id: 1,
    nombre: "UTIQ",
    ultimaRevision: "2023-05-15",
    verificaciones: []
  },
  {
    id: 2,
    nombre: "UTI1",
    ultimaRevision: "2023-06-20",
    verificaciones: []
  },
  {
    id: 3,
    nombre: "UTI2",
    ultimaRevision: "2023-07-10",
    verificaciones: []
  },
  {
    id: 4,
    nombre: "Guardia",
    ultimaRevision: "2023-08-05",
    verificaciones: []
  },
  {
    id: 5,
    nombre: "5to Piso",
    ultimaRevision: "",
    verificaciones: []
  },
  {
    id: 6,
    nombre: "4to Piso",
    ultimaRevision: "",
    verificaciones: []
  },
  {
    id: 7,
    nombre: "3er Piso",
    ultimaRevision: "",
    verificaciones: []
  },
  {
    id: 8,
    nombre: "UTH",
    ultimaRevision: "",
    verificaciones: []
  }
];

// Checklist completo para UTIQ, UTI1, UTI2, Guardia
export const checklistItemsCompleto = [
  "Carro de paro con precinto numerado",
  "Laringoscopio probado, 3 ramas",
  "Bolsa de reanimación",
  "Frova",
  "Cardiodesfibrilador probado",
  "Parches desfibrilador Pads",
  "Tubo de oxígeno cargado",
  "Carro de paro limpio, libre de elementos innecesarios"
];

// Checklist simplificado para 3er, 4to, 5to Piso, UTH
export const checklistItemsSimplificado = [
  "Carro de paro cerrado con precinto numerado",
  "3 últimos N° precinto", // Este es un campo de texto, no Sí/No
  "Bolsa de reanimación",
  "Cardiodesfibrilador probado",
  "Tubo de oxígeno de traslado cargado",
  "Carro de paro limpio, libre de elementos innecesarios"
];


export const turnos = ["TM", "TT", "TN", "SADOFE"];