import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import NewUser from "./pages/newUser";
import Layout from "./pages/layout";
import Criptos from "./pages/criptos";
import { ThemeProvider, createTheme } from "@mui/material";

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#450388', 
      },
      secondary: {
        main: '#450388',  
      },
     
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route  element={<Layout />}>
          <Route path="/criptos" element={<Criptos />} />
        </Route>

        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}
