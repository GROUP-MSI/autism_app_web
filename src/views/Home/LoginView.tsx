import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Definir tipos para las credenciales
interface Credentials {
  email: string;
  password: string;
  role: "admin" | "doctor" | "patient";
}

// Definir tipo para los errores del formulario
interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Definir tipo para el usuario en sesión
interface UserSession {
  email: string;
  role: "admin" | "doctor" | "patient";
  loginTime: string;
}

export const LoginView: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>("");
  const [passInput, setPassInput] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Credenciales con contraseñas más seguras
  const validCredentials: Record<string, Credentials> = {
    admin: {
      email: "bendy@gmail.com",
      password: "B3ndy@2026#Secure!",
      role: "admin",
    },
    doctor: {
      email: "doctor.bendy@gmail.com",
      password: "Dr.B3ndy#2026$Strong",
      role: "doctor",
    },
    patient: {
      email: "patient.bendy@gmail.com",
      password: "P@tient2026*Secure",
      role: "patient",
    },
  };

  // Función de validación
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!emailRegex.test(emailInput)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    // Validación de contraseña
    if (!passInput) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (passInput.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/[A-Z]/.test(passInput)) {
      newErrors.password = "La contraseña debe tener al menos una mayúscula";
    } else if (!/[a-z]/.test(passInput)) {
      newErrors.password = "La contraseña debe tener al menos una minúscula";
    } else if (!/[0-9]/.test(passInput)) {
      newErrors.password = "La contraseña debe tener al menos un número";
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(passInput)) {
      newErrors.password =
        "La contraseña debe tener al menos un carácter especial";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para limpiar errores en tiempo real
  const handleInputChange = (
    field: "email" | "password",
    value: string,
  ): void => {
    if (field === "email") {
      setEmailInput(value);
      if (errors.email) {
        setErrors((prev: FormErrors) => ({ ...prev, email: undefined }));
      }
    } else if (field === "password") {
      setPassInput(value);
      if (errors.password) {
        setErrors((prev: FormErrors) => ({ ...prev, password: undefined }));
      }
    }
    // Limpiar error general cuando el usuario escribe
    if (errors.general) {
      setErrors((prev: FormErrors) => ({ ...prev, general: undefined }));
    }
  };

  const sendLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Prevenir comportamiento por defecto del form

    // Validar formulario
    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }

    setIsLoading(true);

    // Simular una verificación asíncrona
    setTimeout(() => {
      // Verificar credenciales
      let userFound: Credentials | null = null;

      if (
        emailInput === validCredentials.admin.email &&
        passInput === validCredentials.admin.password
      ) {
        userFound = validCredentials.admin;
      } else if (
        emailInput === validCredentials.doctor.email &&
        passInput === validCredentials.doctor.password
      ) {
        userFound = validCredentials.doctor;
      } else if (
        emailInput === validCredentials.patient.email &&
        passInput === validCredentials.patient.password
      ) {
        userFound = validCredentials.patient;
      }

      if (userFound) {
        const roleNames = {
          admin: "Administrador",
          doctor: "Doctor",
          patient: "Paciente",
        };
        toast.success(`¡Bienvenido ${roleNames[userFound.role]}!`);

        // Simular guardado de sesión
        const userSession: UserSession = {
          email: userFound.email,
          role: userFound.role,
          loginTime: new Date().toISOString(),
        };
        localStorage.setItem("user", JSON.stringify(userSession));

        // Redireccionar según el rol
        switch (userFound.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "doctor":
            navigate("/doctor/dashboard");
            break;
          case "patient":
            navigate("/patient/dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error("Credenciales incorrectas. Verifica tu email y contraseña");
        setErrors({
          general: "Email o contraseña incorrectos",
          email: "Email incorrecto",
          password: "Contraseña incorrecta",
        });
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-800 rounded-full flex items-center justify-center mb-4">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-blue-800 mb-2">
              Iniciar Sesión
            </h2>
            <p className="text-gray-600 mb-8">
              Ingresa tus credenciales para acceder
            </p>
          </div>

          <form className="space-y-6" onSubmit={sendLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition duration-200`}
                placeholder="tu@email.com"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("email", e.target.value)
                }
                value={emailInput}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition duration-200`}
                placeholder="••••••••"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("password", e.target.value)
                }
                value={passInput}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-800 focus:ring-blue-700 border-gray-300 rounded"
                  disabled={isLoading}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-800 hover:text-blue-700"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
                {errors.general}
              </div>
            )}

            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verificando...
                  </div>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                ¿No tienes una cuenta?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-800 hover:text-blue-700"
                >
                  Regístrate aquí
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
