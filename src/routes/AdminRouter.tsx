// import { Route, Routes} from "react-router-dom";
// import { UsersDel } from "../views/Users/UserDel";

import { Route, Routes } from "react-router-dom"
import { LayoutAdmin } from "../components/layouts/LayoutAdmin"
import { UserView } from "../views/Admin/UsersView"
import { menuOptions } from "../utils"

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
          <Route path='/*' element={ <UserView /> } />
          <Route path='/users' element={ <UserView /> } />
        </Routes>
      </LayoutAdmin>  
    </div>
    </>
  )
}
