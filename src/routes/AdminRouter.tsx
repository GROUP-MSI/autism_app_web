// import { Route, Routes} from "react-router-dom";
// import { UsersDel } from "../views/Users/UserDel";

import { Route, Routes } from "react-router-dom"
import { LayoutAdmin } from "../components/layouts/LayoutAdmin"
import { UserView } from "../views/Users/UsersView"
import { menuOptions } from "../utils"
import { CustomerView } from "../views/Patients/CustomerView"
import { EvaluationsListView } from "../views/Evaluations/EvaluationListView"
import { NewEvaluationView } from "../views/Evaluations/NewEvaluationView"
import { ResultsAnalysisView } from "../views/Evaluations/ResultsAnalisisView"
import { TemplatesView } from "../views/Evaluations/TemplatesView"
import { PredictionsView } from "../views/Doctors/PredictionsView"
import { TreatmentPlansView } from "../views/TraetmentPlanning/TraetmentPlansView"
import { NotFound } from "../views/Home/NotFound"

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

          <Route path='/settings/users' element={ <UserView /> } />
          <Route path='/patients/list' element={ <CustomerView /> } />

          <Route path='/evaluation/list' element={ <EvaluationsListView/> } />
          <Route path='/evaluation/new' element={ <NewEvaluationView /> } />
          <Route path='/evaluation/results' element={ <ResultsAnalysisView /> } />
          <Route path='/evaluation/templates' element={ <TemplatesView /> } />

          <Route path="/treatment/plans" element={ <TreatmentPlansView /> }/>
          <Route path="/treatment/create" element={ <TreatmentPlansView /> }/>
          <Route path="/treatment/templates" element={ <TreatmentPlansView /> }/>
          <Route path="/treatment/goals" element={ <TreatmentPlansView /> }/>

          <Route path="/ai/predictions" element={ <PredictionsView /> }/>
          
        </Routes>
      </LayoutAdmin>  
    </div>
    </>
  )
}
