export const AboutView = () =>
{
  return (
    <div className="mt-0">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Quiénes Somos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-gray-700 mb-4">
            Somos un equipo multidisciplinario de profesionales dedicados a mejorar la calidad de vida de
            niños con TEA en Bolivia.
          </p>
          <p className="text-gray-700 mb-4">
            Nuestra misión es democratizar el acceso a tratamientos de calidad, combinando la experiencia
            clínica con tecnología de vanguardia.
          </p>
          <p className="text-gray-700 mb-4">
            Trabajamos con psicólogos, terapeutas ocupacionales, logopedas y especialistas en desarrollo
            infantil para ofrecer un enfoque integral.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-24 w-24 mb-2 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={`/placeholder.svg?height=96&width=96`}
                  alt="Especialista"
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="font-medium">Dr. Nombre Apellido</h4>
              <p className="text-sm text-gray-500">Especialista en TEA</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}