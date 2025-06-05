"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addPatient } from "../../store/slices/patientSlice"

export default function RegisterPatient() {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "masculino" as const,
    diagnosis: "Trastorno del Espectro Autista",
    severityLevel: 1 as const,
    contactInfo: {
      phone: "",
      email: "",
      address: "",
    },
    familyInfo: {
      primaryCaregiver: "",
      relationship: "",
      phone: "",
      email: "",
      emergencyContact: "",
      emergencyPhone: "",
    },
    medicalHistory: {
      allergies: [] as string[],
      medications: [] as string[],
      previousTherapies: [] as string[],
      notes: "",
    },
    assignedTherapist: "",
  })

  const [allergyInput, setAllergyInput] = useState("")
  const [medicationInput, setMedicationInput] = useState("")
  const [therapyInput, setTherapyInput] = useState("")

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birth = new Date(dateOfBirth)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const addAllergy = () => {
    if (allergyInput.trim() && !patient.medicalHistory.allergies.includes(allergyInput.trim())) {
      setPatient({
        ...patient,
        medicalHistory: {
          ...patient.medicalHistory,
          allergies: [...patient.medicalHistory.allergies, allergyInput.trim()],
        },
      })
      setAllergyInput("")
    }
  }

  const removeAllergy = (allergy: string) => {
    setPatient({
      ...patient,
      medicalHistory: {
        ...patient.medicalHistory,
        allergies: patient.medicalHistory.allergies.filter((a) => a !== allergy),
      },
    })
  }

  const addMedication = () => {
    if (medicationInput.trim() && !patient.medicalHistory.medications.includes(medicationInput.trim())) {
      setPatient({
        ...patient,
        medicalHistory: {
          ...patient.medicalHistory,
          medications: [...patient.medicalHistory.medications, medicationInput.trim()],
        },
      })
      setMedicationInput("")
    }
  }

  const removeMedication = (medication: string) => {
    setPatient({
      ...patient,
      medicalHistory: {
        ...patient.medicalHistory,
        medications: patient.medicalHistory.medications.filter((m) => m !== medication),
      },
    })
  }

  const addTherapy = () => {
    if (therapyInput.trim() && !patient.medicalHistory.previousTherapies.includes(therapyInput.trim())) {
      setPatient({
        ...patient,
        medicalHistory: {
          ...patient.medicalHistory,
          previousTherapies: [...patient.medicalHistory.previousTherapies, therapyInput.trim()],
        },
      })
      setTherapyInput("")
    }
  }

  const removeTherapy = (therapy: string) => {
    setPatient({
      ...patient,
      medicalHistory: {
        ...patient.medicalHistory,
        previousTherapies: patient.medicalHistory.previousTherapies.filter((t) => t !== therapy),
      },
    })
  }

  const handleSubmit = () => {
    const newPatient = {
      id: `patient-${Date.now()}`,
      ...patient,
      age: calculateAge(patient.dateOfBirth),
      currentStatus: "activo" as const,
      enrollmentDate: new Date().toISOString().split("T")[0],
      lastVisit: "",
      nextAppointment: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch(addPatient(newPatient))

    // Guardar en localStorage
    const savedPatients = localStorage.getItem("patients")
    const patients = savedPatients ? JSON.parse(savedPatients) : []
    patients.push(newPatient)
    localStorage.setItem("patients", JSON.stringify(patients))

    alert("Paciente registrado exitosamente")

    // Reset form
    setCurrentStep(1)
    setPatient({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "masculino",
      diagnosis: "Trastorno del Espectro Autista",
      severityLevel: 1,
      contactInfo: { phone: "", email: "", address: "" },
      familyInfo: {
        primaryCaregiver: "",
        relationship: "",
        phone: "",
        email: "",
        emergencyContact: "",
        emergencyPhone: "",
      },
      medicalHistory: { allergies: [], medications: [], previousTherapies: [], notes: "" },
      assignedTherapist: "",
    })
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return patient.firstName && patient.lastName && patient.dateOfBirth
      case 2:
        return patient.contactInfo.phone && patient.contactInfo.address
      case 3:
        return patient.familyInfo.primaryCaregiver && patient.familyInfo.relationship && patient.familyInfo.phone
      case 4:
        return true // Medical history is optional
      default:
        return true
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Registrar Nuevo Paciente</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-blue-600 text-white"
                      : step === currentStep + 1
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-24 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Información Personal</span>
            <span>Contacto</span>
            <span>Información Familiar</span>
            <span>Historial Médico</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Información Personal</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombres *</label>
                  <input
                    type="text"
                    value={patient.firstName}
                    onChange={(e) => setPatient({ ...patient, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos *</label>
                  <input
                    type="text"
                    value={patient.lastName}
                    onChange={(e) => setPatient({ ...patient, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de Nacimiento *</label>
                  <input
                    type="date"
                    value={patient.dateOfBirth}
                    onChange={(e) => setPatient({ ...patient, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {patient.dateOfBirth && (
                    <p className="text-sm text-gray-600 mt-1">Edad: {calculateAge(patient.dateOfBirth)} años</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                  <select
                    value={patient.gender}
                    onChange={(e) => setPatient({ ...patient, gender: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diagnóstico</label>
                  <input
                    type="text"
                    value={patient.diagnosis}
                    onChange={(e) => setPatient({ ...patient, diagnosis: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Severidad</label>
                  <select
                    value={patient.severityLevel}
                    onChange={(e) => setPatient({ ...patient, severityLevel: Number.parseInt(e.target.value) as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>Nivel 1 - Requiere apoyo</option>
                    <option value={2}>Nivel 2 - Requiere apoyo sustancial</option>
                    <option value={3}>Nivel 3 - Requiere apoyo muy sustancial</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Información de Contacto</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                  <input
                    type="tel"
                    value={patient.contactInfo.phone}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        contactInfo: { ...patient.contactInfo, phone: e.target.value },
                      })
                    }
                    placeholder="+591 70123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={patient.contactInfo.email}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        contactInfo: { ...patient.contactInfo, email: e.target.value },
                      })
                    }
                    placeholder="email@ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección *</label>
                  <textarea
                    value={patient.contactInfo.address}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        contactInfo: { ...patient.contactInfo, address: e.target.value },
                      })
                    }
                    rows={3}
                    placeholder="Dirección completa..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Terapeuta Asignado</label>
                  <select
                    value={patient.assignedTherapist}
                    onChange={(e) => setPatient({ ...patient, assignedTherapist: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar terapeuta</option>
                    <option value="Dr. Ana Rodríguez">Dr. Ana Rodríguez</option>
                    <option value="Lic. Carlos Mendoza">Lic. Carlos Mendoza</option>
                    <option value="Dra. María González">Dra. María González</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Family Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Información Familiar</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuidador Principal *</label>
                  <input
                    type="text"
                    value={patient.familyInfo.primaryCaregiver}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        familyInfo: { ...patient.familyInfo, primaryCaregiver: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relación *</label>
                  <select
                    value={patient.familyInfo.relationship}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        familyInfo: { ...patient.familyInfo, relationship: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Seleccionar relación</option>
                    <option value="Madre">Madre</option>
                    <option value="Padre">Padre</option>
                    <option value="Abuelo/a">Abuelo/a</option>
                    <option value="Tío/a">Tío/a</option>
                    <option value="Tutor legal">Tutor legal</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono del Cuidador *</label>
                  <input
                    type="tel"
                    value={patient.familyInfo.phone}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        familyInfo: { ...patient.familyInfo, phone: e.target.value },
                      })
                    }
                    placeholder="+591 70123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email del Cuidador</label>
                  <input
                    type="email"
                    value={patient.familyInfo.email}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        familyInfo: { ...patient.familyInfo, email: e.target.value },
                      })
                    }
                    placeholder="email@ejemplo.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contacto de Emergencia</label>
                  <input
                    type="text"
                    value={patient.familyInfo.emergencyContact}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        familyInfo: { ...patient.familyInfo, emergencyContact: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono de Emergencia</label>
                  <input
                    type="tel"
                    value={patient.familyInfo.emergencyPhone}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        familyInfo: { ...patient.familyInfo, emergencyPhone: e.target.value },
                      })
                    }
                    placeholder="+591 70123456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Medical History */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Historial Médico</h2>

              <div className="space-y-6">
                {/* Allergies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alergias</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={allergyInput}
                      onChange={(e) => setAllergyInput(e.target.value)}
                      placeholder="Agregar alergia..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === "Enter" && addAllergy()}
                    />
                    <button
                      type="button"
                      onClick={addAllergy}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.allergies.map((allergy, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm flex items-center"
                      >
                        {allergy}
                        <button
                          type="button"
                          onClick={() => removeAllergy(allergy)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medicamentos Actuales</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={medicationInput}
                      onChange={(e) => setMedicationInput(e.target.value)}
                      placeholder="Agregar medicamento..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === "Enter" && addMedication()}
                    />
                    <button
                      type="button"
                      onClick={addMedication}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.medications.map((medication, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                      >
                        {medication}
                        <button
                          type="button"
                          onClick={() => removeMedication(medication)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Previous Therapies */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Terapias Previas</label>
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={therapyInput}
                      onChange={(e) => setTherapyInput(e.target.value)}
                      placeholder="Agregar terapia..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === "Enter" && addTherapy()}
                    />
                    <button
                      type="button"
                      onClick={addTherapy}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {patient.medicalHistory.previousTherapies.map((therapy, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center"
                      >
                        {therapy}
                        <button
                          type="button"
                          onClick={() => removeTherapy(therapy)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notas Adicionales</label>
                  <textarea
                    value={patient.medicalHistory.notes}
                    onChange={(e) =>
                      setPatient({
                        ...patient,
                        medicalHistory: { ...patient.medicalHistory, notes: e.target.value },
                      })
                    }
                    rows={4}
                    placeholder="Información adicional relevante..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!isStepValid(currentStep)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Registrar Paciente
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
