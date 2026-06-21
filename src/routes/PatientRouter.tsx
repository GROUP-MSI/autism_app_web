// import { Route, Routes} from "react-router-dom";
// import { UsersDel } from "../views/Users/UserDel";

import { Route, Routes } from "react-router-dom"
import { LayoutAdmin } from "../components/layouts/LayoutAdmin"
import { patientMenuOptions } from "../utils"
// import { PredictionsView } from "../views/Doctors/PredictionsView"
import { NotFound } from "../views/Home/NotFound"
import PatientDashboard from "../views/Patients/PatientDashboard"
import PatientActivities from "../views/Patients/PatientActivities"
import PatientProgress from "../views/Patients/PatientProgress"
import PatientTreatment from "../views/Patients/PatientTreatment"
import PatientResources from "../views/Patients/PatientResources"
import PatientMessages from "../views/Patients/PatientMessages"

// import { Users, Movements, Products, Shelves, StreamArm } from '../views';
// import { Layout } from '../components';

export const PatientRouter = () => {
  
  // useRefreshToken();

  return (
    <>
    <div>
      <LayoutAdmin menuOptions={patientMenuOptions}>
          <Routes>
            {/* <Route path="/*"  element={ <RedirectorAdmin /> } /> */}
            <Route path="/*" element={<NotFound />} />

            <Route path="/dashboard" element={<PatientDashboard />} />

            <Route path="/activities/assigned" element={<PatientActivities />} />

            <Route path="/progress/view" element={<PatientProgress />} />

            <Route path="/treatment/view" element={<PatientTreatment />} />

            <Route path="/resources/library" element={<PatientResources />} />

            <Route path="/communication/messages" element={<PatientMessages />} />
          </Routes>
      </LayoutAdmin>  
    </div>
    </>
  )
}
