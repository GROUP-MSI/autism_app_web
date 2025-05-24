
import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "../components/layouts/LayoutHome";
import { HomeView } from "../views/Home/HomeView";
import { LoginView } from "../views/Home/LoginView";
// import { Login } from '../views/InitSession/Login';
// import { Home } from '../views';
export const HomeRouter = () => {

  return (
    <>
      <HomeLayout>
        <Routes>
          <Route path="/*" element = { <HomeView />}/>  
          <Route path="/login" element = { <LoginView />}/>  
        </Routes>
      </HomeLayout>
    </>
  )
}