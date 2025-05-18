
import { Route, Routes } from "react-router-dom";
import { HomeLayout } from "../components/layouts/LayoutHome";
import { HomeView } from "../views/Home/HomeView";
// import { Login } from '../views/InitSession/Login';
// import { Home } from '../views';
export const HomeRouter = () => {

  return (
    <>
      <HomeLayout>
        <Routes>
          <Route path="/*" element = { <HomeView />}/>  
        </Routes>
      </HomeLayout>
    </>
  )
}