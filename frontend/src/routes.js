import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/login";
//import Criptos from "./pages/criptos";
//import Admin from "./pages/admin";
//import newUser from "./pages/newUser";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route element = { <Login/> }  path="/"  />
         
       </BrowserRouter>
   )
}

export default Routes;