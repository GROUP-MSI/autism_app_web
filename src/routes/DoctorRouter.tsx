// import { Route, Routes} from "react-router-dom";
// import { UsersDel } from "../views/Users/UserDel";

import { Route, Routes } from "react-router-dom"
import { LayoutAdmin } from "../components/layouts/LayoutAdmin"
import { doctorMenuOptions } from "../utils"
// import { PredictionsView } from "../views/Doctors/PredictionsView"
import { NotFound } from "../views/Home/NotFound"
import RegisterPatient from "../views/Patients/RegisterPatient"
import { EvaluationsListView } from "../views/Evaluations/EvaluationListView"
import { NewEvaluationView } from "../views/Evaluations/NewEvaluationView"
import { TreatmentPlansView } from "../views/TraetmentPlanning/TraetmentPlansView"
import DoctorDashboard from "../views/Doctors/DoctorDashboard"
import DoctorPatientsList from "../views/Doctors/DoctorPatientList"
import DoctorProgressTracking from "../views/Doctors/DoctorProgressTracking"
import DoctorActivitiesAssign from "../views/Doctors/DoctorActivitiesAssign"
import DoctorMessages from "../views/Doctors/DoctorMessages"

// import { Users, Movements, Products, Shelves, StreamArm } from '../views';
// import { Layout } from '../components';

export const DoctorRouter = () => {
  
  // useRefreshToken();

  return (
    <>
    <div>
      <LayoutAdmin menuOptions={doctorMenuOptions}>
          <Routes>
            {/* <Route path="/*"  element={ <RedirectorAdmin /> } /> */}
            <Route path="/*" element={<NotFound />} />

            <Route path="/dashboard" element={<DoctorDashboard />} />

            <Route path="/patients/list" element={<DoctorPatientsList />} />
            <Route path="/patients/register" element={<RegisterPatient />} />

            <Route path="/evaluations/list" element={<EvaluationsListView />} />
            <Route path="/evaluations/new" element={<NewEvaluationView />} />

            <Route path="/treatment/plans" element={<TreatmentPlansView />} />

            <Route path="/progress/tracking" element={<DoctorProgressTracking />} />

            <Route path="/activities/assign" element={<DoctorActivitiesAssign />} />

            <Route path="/communication/messages" element={<DoctorMessages />} />
          </Routes>
      </LayoutAdmin>  
    </div>
    </>
  )
}
