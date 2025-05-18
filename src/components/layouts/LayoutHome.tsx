import { Brain, LogIn } from "lucide-react";
import type { ReactNode } from "react";

interface HomeLayoutProp
{
  children : ReactNode
}

export const HomeLayout = ({children} : HomeLayoutProp) => 
{

 return (
  // <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>   
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      
      {/* Header with login */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8" />
            <h1 className="text-2xl font-bold">AutismoCare Bolivia</h1>
          </div>
          <button className="px-4 py-2 bg-white text-blue-700 rounded-md hover:bg-blue-100 flex items-center">
            <LogIn className="mr-2 h-4 w-4" /> Iniciar Sesión
          </button>
        </div>
      </header>

      {children}

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AutismoCare Bolivia</h3>
              <p className="text-blue-200 text-sm">
                Sistema de tratamiento personalizado basado en inteligencia artificial para niños con TEA.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li>
                  <a href="#" className="hover:text-white">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Quiénes Somos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Diagnóstico
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li>La Paz, Bolivia</li>
                <li>contacto@autismocare.bo</li>
                <li>+591 2 1234567</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suscríbete</h3>
              <p className="text-blue-200 text-sm mb-2">Recibe noticias y actualizaciones</p>
              <div className="flex">
                <input type="email" placeholder="Tu email" className="px-3 py-2 text-gray-700 rounded-l-md w-full" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">Enviar</button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-200 text-sm">
            <p>© {new Date().getFullYear()} AutismoCare Bolivia. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  // </GoogleOAuthProvider>
 ); 
}