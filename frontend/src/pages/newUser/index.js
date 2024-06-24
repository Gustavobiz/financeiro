import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import bannerImage from "../../assets/banner.webp"; // Import the image
import logoClaro from "../../assets/logoClaro.svg"; // Import the image
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const [nome, setNome] = useState(null);
  const [email, setEmail] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [login, setLogin] = useState(null);
  const [senha, setSenha] = useState(null);
  const [senhaConfirm, setSenhaConfirm] = useState(null);
  const [send, setSend] = useState(false);
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState({
    status: false,
    type: "",
    text: "",
  });

  let styles = {
    container: {
      width: "100vw",
      height: "100vh",
      backgroundImage: "url(" + bannerImage + ")",
      backgroundSize: "cover",
      justifyContent: "center",
      alignItems: "center",
        minWidth:"500px"
    },
    formW: {
      borderRadius: "20px",
      width: "300px",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
  };
  function oncloseSnack() {
    setOpenSnack({ status: false, type: "", text: "" });
  }
  function validadeData() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      nome &&
      nome != "" &&
      email &&
      email != "" &&
      cpf &&
      cpf != "" &&
      email &&
      regex.test(email)
    );
  }

  async function handleCadastro() {
    console.log("ss");
    setSend(true);
    if (!validadeData()) return;
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/user/create",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: nome,
            email: email,
            cpf: cpf,
            login: login,
            senha: senha,
          }),
        }
      );
      if (response.status == 200) {
       
        navigate("/login");
      } else {
        setOpenSnack({
          status: true,
          type: "error",
          text: "Ocorreu um erro interno",
        });
      }
    } catch (err) {
      setOpenSnack({
        status: true,
        type: "error",
        text: "Não foi possivel se conectar com o servidor",
      });
    } finally {
      setSend(false);
    }
  }
 


  debugger

  debuggerd
  d

  decodeURI




  d






  d




  d


  d
