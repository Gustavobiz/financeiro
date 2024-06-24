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
  return (
    <>
      <Stack sx={styles.container}>
        <Paper sx={styles.paper}>
          <img style={{ width: "80px", height: "auto" }} src={logoClaro} />

          <TextField
            error={send && (!nome || nome == "")}
            helperText={
              send && (!nome || nome == "") && "A senha não poder nula"
            }
            label="Nome"
            variant="outlined"
            sx={styles.formW}
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <TextField
            error={send && (!email || email == "")}
            helperText={
              send && (!email || email == "") && "A senha não poder nula"
            }
            label="Email"
            variant="outlined"
            sx={styles.formW}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            error={send && (!cpf || cpf == "")}
            helperText={send && (!cpf || cpf == "") && "A senha não poder nula"}
            label="CPF"
            variant="outlined"
            sx={styles.formW}
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />


          <TextField
            error={send && (!login || login == "")}
            helperText={
              send && (!login || login == "") && "A senha não poder nula"
            }
            label="Login"
            variant="outlined"
            sx={styles.formW}
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
          <TextField
            error={send && (!senha || senha == "")}
            helperText={
              send && (!senha || senha == "") && "A senha não poder nula"
            }
            label="Senha"
            variant="outlined"
            sx={styles.formW}
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <TextField
            error={send && (!senhaConfirm || senhaConfirm == "")}
            helperText={
              send &&
              (!senhaConfirm || senhaConfirm == "") &&
              "A senha não poder nula"
            }
            label="Comfirmação de Senha"
            variant="outlined"
            sx={styles.formW}
            value={senhaConfirm}
            onChange={(event) => setSenhaConfirm(event.target.value)}
          />
          <Button
            variant="contained"
            sx={styles.formW}
            color="secondary"
            onClick={() => handleCadastro()}
          >
            
            Cadastrar
          </Button>
        </Paper>
      </Stack>
      <Snackbar
        open={openSnack.status}
        autoHideDuration={2000}
        onClose={oncloseSnack}
      >
        <Alert
          severity={openSnack.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {openSnack.text}
        </Alert>
      </Snackbar>
    </>
  );
}
