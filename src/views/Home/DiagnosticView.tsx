import { BarChart2, Camera, User } from "lucide-react";
import { useRef, useState } from "react";

export const DiagnosticView = () =>
{
  
  const [showResults, setShowResults] = useState(false)
  const [progress, setProgress] = useState(0)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Simulated exercise results
  const mockResults = {
    atención: 75,
    comunicación: 60,
    interacciónSocial: 82,
    comportamientoRepetitivo: 45,
  }

  // Handle camera activation
  const toggleCamera = async () => {
    if (cameraActive) {
      const stream = videoRef.current?.srcObject as MediaStream
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
      videoRef.current!.srcObject = null
      setCameraActive(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraActive(true)
        }
      } catch (err) {
        console.error("Error accessing camera:", err)
      }
    }
  }

  // Simulate diagnosis process
  const startDiagnosis = () => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowResults(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return(
    <div className="mt-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Diagnóstico Previo</h2>
          <p className="text-gray-700 mb-6">
            Nuestro sistema de IA puede realizar una evaluación preliminar mediante el análisis de patrones
            de comportamiento. Esta herramienta no reemplaza el diagnóstico profesional, pero puede ayudar a
            identificar signos tempranos que merecen atención especializada.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">Instrucciones</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Active su cámara haciendo clic en el botón "Activar cámara"</li>
              <li>Asegúrese de que el niño esté frente a la cámara en un ambiente bien iluminado</li>
              <li>Haga clic en "Iniciar diagnóstico" y siga las instrucciones en pantalla</li>
              <li>Complete los ejercicios solicitados</li>
              <li>Los resultados preliminares aparecerán en el panel derecho</li>
            </ol>
          </div>

          <div className="mb-6">
            <div className="relative bg-black rounded-lg overflow-hidden h-[400px] flex items-center justify-center">
              {cameraActive ? (
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="text-white flex flex-col items-center">
                  <Camera className="h-16 w-16 mb-4" />
                  <p>La cámara está desactivada</p>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={toggleCamera}
                className={`px-4 py-2 rounded-md ${
                  cameraActive
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {cameraActive ? "Desactivar cámara" : "Activar cámara"}
              </button>

              <button
                onClick={startDiagnosis}
                disabled={!cameraActive}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Iniciar diagnóstico
              </button>
            </div>

            {progress > 0 && progress < 100 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Procesando diagnóstico...</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="border rounded-lg overflow-hidden shadow-sm sticky top-4">
            <div className="bg-blue-600 text-white p-4">
              <h3 className="flex items-center text-lg font-semibold">
                <BarChart2 className="mr-2 h-5 w-5" /> Resultados
              </h3>
              <p className="text-blue-100 text-sm">Evaluación preliminar</p>
            </div>
            <div className="p-6">
              {showResults ? (
                <div className="space-y-6">
                  {Object.entries(mockResults).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <span className="text-sm font-medium">{value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${value}%` }}></div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Recomendaciones</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Se recomienda evaluación profesional para confirmar resultados</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Ejercicios de atención focalizada</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Terapia de lenguaje para mejorar comunicación</span>
                      </li>
                    </ul>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Agendar consulta especializada
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Los resultados aparecerán aquí después de completar los ejercicios de diagnóstico
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}