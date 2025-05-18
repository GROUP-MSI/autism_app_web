import type { ReactNode } from "react";

interface HomeLayoutProp
{
  children : ReactNode
}

export const HomeLayout = ({children} : HomeLayoutProp) => 
{

 return (
  // <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_ID}>   
    <div className="">
      <div>
        {children}
      </div>
      {
        
          // <Login/> 
          
          // <Register setIsRegister={setIsRegister}/>
      }
    </div>
  // </GoogleOAuthProvider>
 ); 
}