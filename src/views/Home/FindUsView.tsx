import { MapPin } from "lucide-react";

export const FindUsView = () =>
{
  return (
    <div className="mt-0">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Encuéntranos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
            <p className="text-gray-500">Mapa de ubicación</p>
          </div>
        </div>
        <div>
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 border-b">
              <h3 className="text-xl font-semibold">Nuestras Sedes</h3>
              <p className="text-gray-500 text-sm">
                Estamos presentes en las principales ciudades de Bolivia
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">La Paz</h4>
                    <p className="text-sm text-gray-600">Av. 6 de Agosto #123, Zona Sopocachi</p>
                    <p className="text-sm text-gray-600">Tel: +591 2 1234567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Santa Cruz</h4>
                    <p className="text-sm text-gray-600">Calle Beni #456, 2do Anillo</p>
                    <p className="text-sm text-gray-600">Tel: +591 3 7654321</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Cochabamba</h4>
                    <p className="text-sm text-gray-600">Av. América #789, Zona Norte</p>
                    <p className="text-sm text-gray-600">Tel: +591 4 9876543</p>
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