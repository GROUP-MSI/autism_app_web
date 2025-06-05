
// import type { Evaluation, EvaluationTemplate } from "../store/slices/evaluationSlice"
// import type { TreatmentPlan, TreatmentTemplate } from "../store/slices/treatmentPlanSlice"
// import type { Patient } from "../store/slices/clientsSlice"
// import type { User } from "../store/slices/usersSlice"
import type { Activity } from "../../store/slices/activitiessSlice"
import type { Message, Recommendation } from "../../store/slices/communicationSlice"
import type { AIModel, ClusterAnalysis } from "../../store/slices/iaSystemSlice"
import type { Patient } from "../../store/slices/patientSlice"

export const initialActivitiesData: Activity[] = [
  {
    id: "act-1",
    title: "Juego de Imitación Vocal",
    description: "Actividad interactiva para desarrollar habilidades de imitación y comunicación vocal",
    type: "interactiva",
    category: "comunicacion",
    difficulty: "basico",
    ageRange: { min: 3, max: 6 },
    duration: 15,
    materials: ["Espejo", "Instrumentos musicales simples", "Tarjetas con sonidos"],
    instructions: [
      "Sentarse frente al niño con un espejo",
      "Producir sonidos simples y esperar imitación",
      "Reforzar positivamente cada intento",
      "Gradualmente introducir sonidos más complejos",
    ],
    objectives: ["Mejorar imitación vocal", "Desarrollar atención conjunta", "Fortalecer comunicación"],
    progress: {
      completed: true,
      score: 85,
      notes: "Excelente progreso en imitación de vocales",
      completedAt: "2024-01-20T10:30:00Z",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    isActive: true,
  },
  {
    id: "act-2",
    title: "Circuito Sensorial Básico",
    description: "Actividad de biblioteca para estimulación sensorial controlada",
    type: "biblioteca",
    category: "sensorial",
    difficulty: "intermedio",
    ageRange: { min: 4, max: 8 },
    duration: 25,
    materials: ["Colchonetas", "Pelotas texturizadas", "Túnel de tela", "Música suave"],
    instructions: [
      "Preparar estaciones sensoriales",
      "Guiar al niño por cada estación",
      "Permitir exploración libre pero supervisada",
      "Observar y registrar respuestas",
    ],
    objectives: ["Mejorar procesamiento sensorial", "Desarrollar tolerancia", "Aumentar autorregulación"],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    isActive: true,
  },
  {
    id: "act-3",
    title: "Historia Social Personalizada",
    description: "Actividad personalizada para enseñar habilidades sociales específicas",
    type: "personalizada",
    category: "social",
    difficulty: "intermedio",
    ageRange: { min: 5, max: 10 },
    duration: 20,
    materials: ["Libro personalizado", "Imágenes del niño", "Pictogramas"],
    instructions: [
      "Leer la historia social con el niño",
      "Discutir cada situación presentada",
      "Practicar las habilidades mostradas",
      "Reforzar conceptos clave",
    ],
    objectives: ["Enseñar normas sociales", "Mejorar comprensión social", "Desarrollar habilidades de interacción"],
    progress: {
      completed: false,
      score: 60,
      notes: "Necesita más práctica en situaciones grupales",
    },
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-25T16:45:00Z",
    isActive: true,
  },
]

export const initialPatientsData: Patient[] = [
  {
    id: "patient-1",
    firstName: "Juan Carlos",
    lastName: "Pérez García",
    dateOfBirth: "2018-03-15",
    age: 6,
    gender: "masculino",
    diagnosis: "Trastorno del Espectro Autista",
    severityLevel: 1,
    contactInfo: {
      phone: "+591 70123456",
      email: "familia.perez@email.com",
      address: "Av. América #123, La Paz, Bolivia",
    },
    familyInfo: {
      primaryCaregiver: "María García",
      relationship: "Madre",
      phone: "+591 70123456",
      email: "maria.garcia@email.com",
      emergencyContact: "Carlos Pérez",
      emergencyPhone: "+591 70654321",
    },
    medicalHistory: {
      allergies: ["Polen", "Frutos secos"],
      medications: [],
      previousTherapies: ["Terapia de lenguaje"],
      notes: "Responde bien a rutinas estructuradas",
    },
    currentStatus: "activo",
    enrollmentDate: "2024-01-01",
    lastVisit: "2024-01-20",
    nextAppointment: "2024-01-27",
    assignedTherapist: "Dr. Ana Rodríguez",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
  },
  {
    id: "patient-2",
    firstName: "Ana Sofía",
    lastName: "Mamani Quispe",
    dateOfBirth: "2019-07-22",
    age: 5,
    gender: "femenino",
    diagnosis: "Trastorno del Espectro Autista",
    severityLevel: 1,
    contactInfo: {
      phone: "+591 71234567",
      email: "familia.mamani@email.com",
      address: "Calle Murillo #456, El Alto, Bolivia",
    },
    familyInfo: {
      primaryCaregiver: "Rosa Quispe",
      relationship: "Madre",
      phone: "+591 71234567",
      email: "rosa.quispe@email.com",
      emergencyContact: "Pedro Mamani",
      emergencyPhone: "+591 71765432",
    },
    medicalHistory: {
      allergies: [],
      medications: [],
      previousTherapies: ["Terapia ocupacional"],
      notes: "Sensibilidad a sonidos fuertes",
    },
    currentStatus: "activo",
    enrollmentDate: "2024-01-05",
    lastVisit: "2024-01-18",
    nextAppointment: "2024-01-25",
    assignedTherapist: "Lic. Carlos Mendoza",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-18T14:20:00Z",
  },
]

// export const initialUsersData: User[] = [
//   {
//     id: "user-1",
//     firstName: "Ana",
//     lastName: "Rodríguez",
//     email: "ana.rodriguez@teatech.bo",
//     role: "therapist",
//     specialization: "Terapia de Comunicación",
//     licenseNumber: "TC-2024-001",
//     phone: "+591 70111222",
//     status: "activo",
//     permissions: ["view_patients", "edit_patients", "create_activities", "view_reports"],
//     lastLogin: "2024-01-20T08:30:00Z",
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-20T08:30:00Z",
//   },
//   {
//     id: "user-2",
//     firstName: "Carlos",
//     lastName: "Mendoza",
//     email: "carlos.mendoza@teatech.bo",
//     role: "therapist",
//     specialization: "Terapia Ocupacional",
//     licenseNumber: "TO-2024-002",
//     phone: "+591 70333444",
//     status: "activo",
//     permissions: ["view_patients", "edit_patients", "create_activities", "view_reports"],
//     lastLogin: "2024-01-19T14:15:00Z",
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-19T14:15:00Z",
//   },
//   {
//     id: "user-3",
//     firstName: "María",
//     lastName: "Gonzales",
//     email: "maria.gonzales@teatech.bo",
//     role: "admin",
//     phone: "+591 70555666",
//     status: "activo",
//     permissions: ["all"],
//     lastLogin: "2024-01-20T09:00:00Z",
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-20T09:00:00Z",
//   },
// ]

// export const initialEvaluationsData: Evaluation[] = [
//   {
//     id: "eval-1",
//     patientId: "patient-1",
//     evaluatorId: "user-1",
//     type: "inicial",
//     date: "2024-01-01",
//     areas: {
//       comunicacion: {
//         score: 75,
//         observations: "Buena comprensión verbal, dificultades en expresión espontánea",
//         recommendations: ["Incrementar actividades de imitación vocal", "Usar apoyos visuales"],
//       },
//       social: {
//         score: 60,
//         observations: "Interacción limitada con pares, prefiere actividades solitarias",
//         recommendations: ["Actividades de juego estructurado", "Historias sociales"],
//       },
//       sensorial: {
//         score: 55,
//         observations: "Hipersensibilidad auditiva, busca estimulación propioceptiva",
//         recommendations: ["Terapia de integración sensorial", "Ambiente controlado"],
//       },
//       cognitiva: {
//         score: 80,
//         observations: "Excelente memoria visual, dificultades en flexibilidad cognitiva",
//         recommendations: ["Actividades de categorización", "Juegos de transición"],
//       },
//       motora: {
//         score: 70,
//         observations: "Motricidad gruesa adecuada, dificultades en motricidad fina",
//         recommendations: ["Ejercicios de pinza", "Actividades de coordinación"],
//       },
//     },
//     overallScore: 68,
//     status: "completada",
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-01T16:00:00Z",
//   },
// ]

// export const initialEvaluationTemplatesData: EvaluationTemplate[] = [
//   {
//     id: "template-1",
//     name: "Evaluación Inicial TEA Nivel 1",
//     description: "Plantilla estándar para evaluación inicial de niños con TEA nivel 1",
//     ageRange: { min: 3, max: 8 },
//     questions: [
//       {
//         id: "q1",
//         area: "comunicacion",
//         question: "¿El niño responde a su nombre cuando se le llama?",
//         type: "scale",
//         weight: 0.8,
//       },
//       {
//         id: "q2",
//         area: "comunicacion",
//         question: "¿Utiliza gestos para comunicarse?",
//         type: "scale",
//         weight: 0.7,
//       },
//       {
//         id: "q3",
//         area: "social",
//         question: "¿Muestra interés en otros niños?",
//         type: "scale",
//         weight: 0.9,
//       },
//     ],
//     createdAt: "2024-01-01T00:00:00Z",
//   },
// ]

// export const initialTreatmentPlansData: TreatmentPlan[] = [
//   {
//     id: "plan-1",
//     patientId: "patient-1",
//     therapistId: "user-1",
//     name: "Plan de Comunicación Intensiva",
//     description: "Plan enfocado en mejorar habilidades de comunicación verbal y no verbal",
//     startDate: "2024-01-01",
//     endDate: "2024-06-01",
//     status: "activo",
//     goals: [
//       {
//         id: "goal-1",
//         title: "Mejorar comunicación verbal",
//         description: "Incrementar vocabulario expresivo en 50 palabras",
//         area: "comunicacion",
//         priority: "alta",
//         targetDate: "2024-03-01",
//         status: "en_progreso",
//         progress: 65,
//         activities: ["act-1"],
//         createdAt: "2024-01-01T00:00:00Z",
//       },
//     ],
//     sessions: [
//       {
//         id: "session-1",
//         date: "2024-01-15",
//         duration: 45,
//         activities: ["act-1"],
//         notes: "Excelente participación, logró imitar 5 sonidos nuevos",
//         progress: 85,
//       },
//     ],
//     overallProgress: 65,
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-20T10:30:00Z",
//   },
// ]

// export const initialTreatmentTemplatesData: TreatmentTemplate[] = [
//   {
//     id: "template-1",
//     name: "Plan Estándar Comunicación",
//     description: "Plantilla para planes de tratamiento enfocados en comunicación",
//     ageRange: { min: 3, max: 8 },
//     duration: 6,
//     goals: [
//       {
//         title: "Mejorar comunicación verbal",
//         description: "Incrementar vocabulario expresivo",
//         area: "comunicacion",
//         priority: "alta",
//         targetDate: "",
//         status: "pendiente",
//         progress: 0,
//         activities: [],
//       },
//     ],
//     recommendedActivities: ["act-1", "act-3"],
//     createdAt: "2024-01-01T00:00:00Z",
//   },
// ]

export const initialAIModelsData: AIModel[] = [
  {
    id: "model-1",
    name: "Clasificador de Progreso TEA",
    type: "classification",
    status: "ready",
    accuracy: 87.5,
    lastTrained: "2024-01-15T10:00:00Z",
    description: "Modelo para clasificar el nivel de progreso de pacientes con TEA",
  },
  {
    id: "model-2",
    name: "Recomendador de Actividades",
    type: "recommendation",
    status: "ready",
    accuracy: 92.3,
    lastTrained: "2024-01-18T14:30:00Z",
    description: "Sistema de recomendación personalizada de actividades terapéuticas",
  },
  {
    id: "model-3",
    name: "Análisis de Clusters de Pacientes",
    type: "clustering",
    status: "training",
    accuracy: 0,
    lastTrained: "2024-01-20T09:00:00Z",
    description: "Agrupación de pacientes según características y respuesta al tratamiento",
  },
]

export const initialClusterAnalysisData: ClusterAnalysis[] = [
  {
    id: "cluster-1",
    name: "Análisis de Respuesta a Terapia Comunicacional",
    clusters: [
      {
        id: "c1",
        name: "Respuesta Alta",
        characteristics: ["Edad 3-5 años", "Comunicación verbal limitada", "Alta motivación social"],
        patientCount: 12,
        avgProgress: 85,
      },
      {
        id: "c2",
        name: "Respuesta Moderada",
        characteristics: ["Edad 6-8 años", "Comunicación no verbal", "Intereses restringidos"],
        patientCount: 8,
        avgProgress: 65,
      },
      {
        id: "c3",
        name: "Respuesta Baja",
        characteristics: ["Edad 4-7 años", "Sensibilidades sensoriales altas", "Resistencia al cambio"],
        patientCount: 5,
        avgProgress: 45,
      },
    ],
    createdAt: "2024-01-20T10:00:00Z",
  },
]

export const initialMessagesData: Message[] = [
  {
    id: "msg-1",
    patientId: "patient-1",
    from: "Dr. María González",
    to: "Familia Pérez",
    subject: "Progreso semanal de Juan",
    content:
      "Juan ha mostrado excelente progreso en las actividades de comunicación esta semana. Recomendamos continuar con las sesiones de imitación vocal.",
    type: "info",
    read: false,
    createdAt: "2024-01-20T15:30:00Z",
  },
  {
    id: "msg-2",
    patientId: "patient-2",
    from: "Sistema IA",
    to: "Dr. María González",
    subject: "Alerta: Cambio en patrón de comportamiento",
    content:
      "Se ha detectado un cambio significativo en los patrones de respuesta de Ana. Se recomienda evaluación adicional.",
    type: "alert",
    read: true,
    createdAt: "2024-01-19T11:15:00Z",
  },
]

export const initialRecommendationsData: Recommendation[] = [
  {
    id: "rec-1",
    patientId: "patient-1",
    type: "activity",
    title: "Incrementar sesiones de juego simbólico",
    description:
      "Basado en el progreso actual, se recomienda aumentar las sesiones de juego simbólico a 3 veces por semana",
    priority: "medium",
    aiGenerated: true,
    implemented: false,
    createdAt: "2024-01-20T09:00:00Z",
  },
  {
    id: "rec-2",
    patientId: "patient-2",
    type: "therapy",
    title: "Terapia sensorial adicional",
    description: "Los datos sugieren que Ana se beneficiaría de terapia sensorial adicional enfocada en texturas",
    priority: "high",
    aiGenerated: true,
    implemented: false,
    createdAt: "2024-01-19T16:45:00Z",
  },
]
