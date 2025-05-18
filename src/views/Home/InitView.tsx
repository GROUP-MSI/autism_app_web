import { Activity, BarChart2, Brain } from "lucide-react";


export const InitView = () =>
{
  return (
    <div className="mt-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Tratamiento Personalizado para TEA</h2>
          <p className="text-gray-700 mb-4">
            Bienvenido a nuestro sistema de tratamiento personalizado basado en inteligencia artificial para
            niños con Trastorno del Espectro Autista (TEA) en Bolivia.
          </p>
          <p className="text-gray-700 mb-6">
            Nuestro objetivo es garantizar un acceso equitativo y efectivo a terapias adaptadas a las
            necesidades individuales de cada niño, superando las barreras de acceso a especialistas y
            recursos terapéuticos.
          </p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Conocer más
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
              Contactar especialista
            </button>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Niños en terapia"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-semibold text-blue-800 mb-6 text-center">Nuestros Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Diagnóstico Inteligente",
              icon: <Brain className="mr-2 h-5 w-5" />,
              description:
                "Evaluación inicial mediante IA para identificar patrones y necesidades específicas de cada niño.",
            },
            {
              title: "Terapias Personalizadas",
              icon: <Activity className="mr-2 h-5 w-5" />,
              description:
                "Programas terapéuticos adaptados a las necesidades individuales con seguimiento continuo.",
            },
            {
              title: "Seguimiento Remoto",
              icon: <BarChart2 className="mr-2 h-5 w-5" />,
              description:
                "Monitoreo a distancia y ajustes de tratamiento en tiempo real, incluso durante situaciones de crisis.",
            },
          ].map((service, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-blue-50 p-4">
                <h4 className="flex items-center text-blue-700 font-medium">
                  {service.icon} {service.title}
                </h4>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}