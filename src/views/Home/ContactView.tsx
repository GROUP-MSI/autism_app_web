import { Phone } from "lucide-react";

export const ContactView = () =>
{
  return (
    <div className="mt-0">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Contáctanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <div className="p-4 border-b">
            <h3 className="text-xl font-semibold">Envíanos un mensaje</h3>
            <p className="text-gray-500 text-sm">Completa el formulario y te responderemos a la brevedad</p>
          </div>
          <div className="p-4">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-sm font-medium">
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="asunto" className="text-sm font-medium">
                  Asunto
                </label>
                <input
                  id="asunto"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Asunto del mensaje"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mensaje" className="text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Escribe tu mensaje aquí..."
                />
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
        <div>
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-xl font-semibold">Información de contacto</h3>
              <p className="text-gray-500 text-sm">Otras formas de comunicarte con nosotros</p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium">Teléfono</h4>
                    <p className="text-gray-600">+591 2 1234567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">contacto@autismocare.bo</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                  <div>
                    <h4 className="font-medium">Sitio web</h4>
                    <p className="text-gray-600">www.autismocare.bo</p>
                  </div>
                </div>
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Síguenos en redes sociales</h4>
                  <div className="flex space-x-4">
                    {["facebook", "twitter", "instagram", "youtube"].map((social) => (
                      <a key={social} href="#" className="text-blue-600 hover:text-blue-800">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}