import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter, Route, Routes } from "react-router-dom";
// import axios from "axios";

// Mock de react-toastify
// jest.mock("react-toastify", () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// describe("API Test - POST /api/Test/testing", () => {
//   test("should return success with valid bug data", async () => {
//     const bugs = [
//       {
//         title: "Error de manipulacion",
//         description: "Error al crear",
//       },
//     ];

//     const response = await axios.post(
//       "http://https://1ecd-131-0-199-152.ngrok-free.app:5065/api/Test/testing",
//       bugs
//     );

//     expect(response.status).toBe(200);
//     expect(response.data).toBeDefined();
//   });
// });

// describe("Pruebas de LoginView", () => {
//   test("🔸 Smoke Test - Renderiza el formulario correctamente", () => {
//     render(
//       <MemoryRouter>
//         <LoginView />
//       </MemoryRouter>
//     );

//     expect(screen.getByText(/Iniciar Sesión/i)).toBeDefined();
//     expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeDefined();
//     expect(screen.getByPlaceholderText(/••••••••/i)).toBeDefined();
//   });

//   test("🔹 Regression Test - Muestra error con credenciales incorrectas", () => {
//     const { toast } = require("react-toastify");

//     render(
//       <MemoryRouter>
//         <LoginView />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/tu@email.com/i), {
//       target: { value: "otro@email.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
//       target: { value: "mala" },
//     });
//     fireEvent.submit(screen.getByRole("button", { name: /Iniciar Sesión/i }));

//     expect(toast.error).toHaveBeenCalledWith("Credenciales incorrectas!");
//   });

//   test("🟢 Integration Test - Login correcto y redirección a /admin", () => {
//     const { toast } = require("react-toastify");

//     const AdminMock = () => <div>Estás en el admin</div>;

//     render(
//       <MemoryRouter initialEntries={["/"]}>
//         <Routes>
//           <Route path="/" element={<LoginView />} />
//           <Route path="/admin" element={<AdminMock />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText(/tu@email.com/i), {
//       target: { value: "bendy@gmail.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
//       target: { value: "1234567" },
//     });
//     fireEvent.submit(screen.getByRole("button", { name: /Iniciar Sesión/i }));

//     expect(toast.success).toHaveBeenCalledWith("Inicio de session correcta!");
//     expect(screen.getByText("Estás en el admin")).toBeDefined();
//   });
// });


export const LoginView = () => {

  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const navigate = useNavigate();


  function sendLogin()
  {

    if (emailInput === "bendy@gmail.com" && passInput === "1234567") {
      toast.success("Inicio de sesión correcta!");
      
      navigate("/admin/dashboard");

    } 
    else if(emailInput === "doctor.bendy@gmail.com" && passInput === "1234567")
    {
      navigate("/doctor/dashboard");
    }
    else if(emailInput === "patient.bendy@gmail.com" && passInput === "1234567")
    {
      navigate("/patient/dashboard");
    }
    else {
      toast.error("Credenciales incorrectas!");
    }
  }


  return (
    <div className="min-h-screen bg-blue-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">Iniciar Sesión</h2>
            <p className="text-gray-600 mb-8">Ingresa tus credenciales para acceder</p>
          </div>

          <form className="space-y-6"action={sendLogin} >
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                placeholder="tu@email.com"
                onChange={(e) => {setEmailInput(e.target.value)}}
                value={emailInput}
              />

            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                placeholder="••••••••"
                onChange={(e) => {setPassInput(e.target.value)}}
                value={passInput}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-800 focus:ring-blue-700 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 transition duration-200"
              >
                Iniciar Sesión
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="font-medium text-blue-800 hover:text-blue-700">
                  Regístrate aquí
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
