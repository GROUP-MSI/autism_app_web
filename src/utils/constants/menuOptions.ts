export const menuOptions = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "bi-house",
    href: "/dashboard",
  },
  {
    id: "evaluation",
    label: "Evaluación Inicial",
    icon: "bi-clipboard-check",
    subOptions: [
      {
        id: "evaluation-new",
        label: "Nueva Evaluación",
        icon: "bi-plus-circle",
        href: "/evaluation/new",
      },
      {
        id: "evaluation-list",
        label: "Evaluaciones Realizadas",
        icon: "bi-list-ul",
        href: "/evaluation/list",
      },
      {
        id: "evaluation-templates",
        label: "Plantillas de Evaluación",
        icon: "bi-file-earmark-text",
        href: "/evaluation/templates",
      },
      {
        id: "evaluation-results",
        label: "Resultados y Análisis",
        icon: "bi-graph-up-arrow",
        href: "/evaluation/results",
      },
    ],
  },
  {
    id: "treatment-planning",
    label: "Planificación de Tratamiento",
    icon: "bi-calendar-check",
    subOptions: [
      {
        id: "treatment-create",
        label: "Crear Plan de Tratamiento",
        icon: "bi-plus-square",
        href: "/treatment/create",
      },
      {
        id: "treatment-plans",
        label: "Planes Activos",
        icon: "bi-calendar3",
        href: "/treatment/plans",
      },
      {
        id: "treatment-templates",
        label: "Plantillas de Tratamiento",
        icon: "bi-file-medical",
        href: "/treatment/templates",
      },
      {
        id: "treatment-goals",
        label: "Objetivos Terapéuticos",
        icon: "bi-bullseye",
        href: "/treatment/goals",
      },
    ],
  },
  {
    id: "activities",
    label: "Ejecución de Actividades",
    icon: "bi-controller",
    subOptions: [
      {
        id: "activities-interactive",
        label: "Actividades Interactivas",
        icon: "bi-joystick",
        href: "/activities/interactive",
      },
      {
        id: "activities-library",
        label: "Biblioteca de Actividades",
        icon: "bi-collection",
        href: "/activities/library",
      },
      {
        id: "activities-progress",
        label: "Progreso en Actividades",
        icon: "bi-bar-chart",
        href: "/activities/progress",
      },
      {
        id: "activities-custom",
        label: "Actividades Personalizadas",
        icon: "bi-gear",
        href: "/activities/custom",
      },
    ],
  },
  {
    id: "monitoring",
    label: "Seguimiento y Reportes",
    icon: "bi-graph-up",
    subOptions: [
      {
        id: "monitoring-realtime",
        label: "Monitoreo en Tiempo Real",
        icon: "bi-activity",
        href: "/monitoring/realtime",
      },
      {
        id: "monitoring-reports",
        label: "Reportes de Progreso",
        icon: "bi-file-earmark-bar-graph",
        href: "/monitoring/reports",
      },
      {
        id: "monitoring-analytics",
        label: "Análisis de Datos",
        icon: "bi-pie-chart",
        href: "/monitoring/analytics",
      },
      {
        id: "monitoring-alerts",
        label: "Alertas y Notificaciones",
        icon: "bi-bell",
        href: "/monitoring/alerts",
      },
    ],
  },
  {
    id: "communication",
    label: "Comunicación y Recomendaciones",
    icon: "bi-chat-dots",
    subOptions: [
      {
        id: "communication-messages",
        label: "Mensajes con Familias",
        icon: "bi-envelope",
        href: "/communication/messages",
      },
      {
        id: "communication-recommendations",
        label: "Recomendaciones IA",
        icon: "bi-lightbulb",
        href: "/communication/recommendations",
      },
      {
        id: "communication-feedback",
        label: "Retroalimentación",
        icon: "bi-chat-square-text",
        href: "/communication/feedback",
      },
      {
        id: "communication-resources",
        label: "Recursos para Familias",
        icon: "bi-book",
        href: "/communication/resources",
      },
    ],
  },
  {
    id: "reevaluation",
    label: "Reevaluación y Ajustes",
    icon: "bi-arrow-repeat",
    subOptions: [
      {
        id: "reevaluation-schedule",
        label: "Programar Reevaluación",
        icon: "bi-calendar-plus",
        href: "/reevaluation/schedule",
      },
      {
        id: "reevaluation-compare",
        label: "Comparar Evaluaciones",
        icon: "bi-bar-chart-steps",
        href: "/reevaluation/compare",
      },
      {
        id: "reevaluation-adjust",
        label: "Ajustar Plan de Tratamiento",
        icon: "bi-sliders",
        href: "/reevaluation/adjust",
      },
      {
        id: "reevaluation-history",
        label: "Historial de Cambios",
        icon: "bi-clock-history",
        href: "/reevaluation/history",
      },
    ],
  },
  {
    id: "closure",
    label: "Cierre de Ciclo Terapéutico",
    icon: "bi-check-circle",
    subOptions: [
      {
        id: "closure-final-report",
        label: "Reporte Final",
        icon: "bi-file-earmark-check",
        href: "/closure/final-report",
      },
      {
        id: "closure-outcomes",
        label: "Resultados Alcanzados",
        icon: "bi-trophy",
        href: "/closure/outcomes",
      },
      {
        id: "closure-recommendations",
        label: "Recomendaciones Futuras",
        icon: "bi-arrow-right-circle",
        href: "/closure/recommendations",
      },
      {
        id: "closure-archive",
        label: "Archivar Caso",
        icon: "bi-archive",
        href: "/closure/archive",
      },
    ],
  },
  {
    id: "patients",
    label: "Gestión de Pacientes",
    icon: "bi-people",
    subOptions: [
      {
        id: "patients-list",
        label: "Lista de Pacientes",
        icon: "bi-list-ul",
        href: "/patients/list",
      },
      {
        id: "patients-register",
        label: "Registrar Paciente",
        icon: "bi-person-plus",
        href: "/patients/register",
      },
      {
        id: "patients-profiles",
        label: "Perfiles Detallados",
        icon: "bi-person-badge",
        href: "/patients/profiles",
      },
      {
        id: "patients-families",
        label: "Información Familiar",
        icon: "bi-house-heart",
        href: "/patients/families",
      },
    ],
  },
  {
    id: "ai-system",
    label: "Sistema de IA",
    icon: "bi-cpu",
    subOptions: [
      {
        id: "ai-models",
        label: "Modelos de IA",
        icon: "bi-diagram-3",
        href: "/ai/models",
      },
      {
        id: "ai-training",
        label: "Entrenamiento",
        icon: "bi-arrow-clockwise",
        href: "/ai/training",
      },
      {
        id: "ai-predictions",
        label: "Predicciones",
        icon: "bi-crystal-ball",
        href: "/ai/predictions",
      },
      {
        id: "ai-performance",
        label: "Rendimiento del Sistema",
        icon: "bi-speedometer",
        href: "/ai/performance",
      },
    ],
  },
  {
    id: "settings",
    label: "Configuración",
    icon: "bi-gear",
    subOptions: [
      {
        id: "settings-general",
        label: "Configuración General",
        icon: "bi-sliders",
        href: "/settings/general",
      },
      {
        id: "settings-users",
        label: "Gestión de Usuarios",
        icon: "bi-person-gear",
        href: "/settings/users",
      },
      {
        id: "settings-security",
        label: "Seguridad",
        icon: "bi-shield-lock",
        href: "/settings/security",
      },
      {
        id: "settings-backup",
        label: "Respaldos",
        icon: "bi-cloud-upload",
        href: "/settings/backup",
      },
    ],
  },
]
