// import { Route, Routes} from "react-router-dom";
// import { UsersDel } from "../views/Users/UserDel";

import { Route, Routes } from "react-router-dom"
import { LayoutAdmin } from "../components/layouts/LayoutAdmin"
import { UserView } from "../views/Users/UsersView"
import { menuOptions } from "../utils"
import { PatientsList} from "../views/Patients/PatientLIst"
import { EvaluationsListView } from "../views/Evaluations/EvaluationListView"
import { NewEvaluationView } from "../views/Evaluations/NewEvaluationView"
import { ResultsAnalysisView } from "../views/Evaluations/ResultsAnalisisView"
import { TemplatesView } from "../views/Evaluations/TemplatesView"
// import { PredictionsView } from "../views/Doctors/PredictionsView"
import { TreatmentPlansView } from "../views/TraetmentPlanning/TraetmentPlansView"
import { NotFound } from "../views/Home/NotFound"
import Dashboard from "../views/Admin/Dashboard"
import AIAnalytics from "../views/IA/AIAnalytics"
import CommunicationCenter from "../views/ComunicationRecommend/CommunicationCenter"
import RegisterPatient from "../views/Patients/RegisterPatient"
import ActivitiesLibrary from "../views/ExecActivities/ActivitiesLibrary"

// import { Users, Movements, Products, Shelves, StreamArm } from '../views';
// import { Layout } from '../components';

export const AdminRouter = () => {
  
  // useRefreshToken();


  return (
    <>
    <div>
      <LayoutAdmin menuOptions={menuOptions}>
        <Routes>
          {/* <Route path="/*"  element={ <RedirectorAdmin /> } /> */}
          <Route path='/*' element={ <NotFound/> } />

          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/settings/users' element={ <UserView /> } />
          
          <Route path='/patients/list' element={ <PatientsList /> } />
          <Route path='/patients/register' element={ <RegisterPatient /> } />

          <Route path='/evaluation/list' element={ <EvaluationsListView/> } />
          <Route path='/evaluation/new' element={ <NewEvaluationView /> } />
          <Route path='/evaluation/results' element={ <ResultsAnalysisView /> } />
          <Route path='/evaluation/templates' element={ <TemplatesView /> } />

          <Route path="/treatment/plans" element={ <TreatmentPlansView /> }/>

          <Route path="/activities/library" element={ <ActivitiesLibrary /> }/>

          {/* <Route path="/ai/predictions" element={ <PredictionsView /> }/> activities/library*/}
          <Route path="/ai/predictions" element={ <AIAnalytics /> }/>

          <Route path="/communication/resources" element={ <CommunicationCenter /> }/>
          
        </Routes>
      </LayoutAdmin>  
    </div>
    </>
  )
}
