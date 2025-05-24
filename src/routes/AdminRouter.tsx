// import { Route, Routes} from "react-router-dom";
// import { UsersDel } from "../views/Users/UserDel";

import { Route, Routes } from "react-router-dom"
import { LayoutAdmin } from "../components/layouts/LayoutAdmin"
import { UserView } from "../views/Admin/UsersView"
import { menuOptions } from "../utils"
import { ClientsView } from "../views/Doctor/ClientView"
import { EvaluationsListView } from "../views/Doctor/EvaluationListView"
import { NewEvaluationView } from "../views/Doctor/NewEvaluationView"
import { ResultsAnalysisView } from "../views/Doctor/ResultsAnalisisView"
import { TemplatesView } from "../views/Doctor/TemplatesView"

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
          <Route path='/*' element={ <h1>PAGINA NO ENCONTRADA</h1> } />
          <Route path='/settings/users' element={ <UserView /> } />
          <Route path='/patients/list' element={ <ClientsView /> } />

          <Route path='/evaluation/list' element={ <EvaluationsListView/> } />
          <Route path='/evaluation/new' element={ <NewEvaluationView /> } />
          <Route path='/evaluation/results' element={ <ResultsAnalysisView /> } />
          <Route path='/evaluation/templates' element={ <TemplatesView /> } />
          
        </Routes>
      </LayoutAdmin>  
    </div>
    </>
  )
}
