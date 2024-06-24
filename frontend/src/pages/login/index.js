import {
  Alert,
  Box,
  Button,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import bannerImage from "../../assets/banner.webp"; // Import the image
import { useNavigate } from "react-router-dom";
import logoClaro from "../../assets/logoClaro.svg"; // Import the image

export default function Login() {
  const [login, setLogin] = useState(null);
  const [senha, setSenha] = useState(null);
  const [send, setSend] = useState(false);
  const navigate = useNavigate();
  const [openSnack, setOpenSnack] = useState({
    status: false,
    type: "",
    text: "",
  });

  function validadeData() {
    if (!login || login == "" || !senha || senha == "") return false;
    return true;
  }
  function oncloseSnack() {
    setOpenSnack({ status: false, type: "", text: "" });
  }
  async function handleAuth() {
    setSend(true);
    if (!validadeData()) return;
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          senha: senha,
        }),
      });
      if (response.status == 200) {
        let data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/criptos");
      } else if (response.status == 401) {
        setOpenSnack({
          status: true,
          type: "warning",
          text: "Dados inválido!",
        });
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

  let styles = {
    container: {
      width: "100vw",
      height: "100vh",
      minWidth: "350px",
    },
    formW: {
      borderRadius: "20px",
      width: "300px",
    },
    banner: {
      display: { xs: "none", md: "flex" },
      backgroundImage: "url(" + bannerImage + ")",
      backgroundSize: "cover",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    },
  };
  return (
    <>
      <Stack direction="row" sx={styles.container}>
        <Stack width="60%" sx={styles.banner}>
          <Typography sx={{ fontSize: "2.3rem" }}>
            Transforme, Invista, Cresça!
          </Typography>
          <Typography sx={{ fontSize: "1.1rem" }}>
            Explore o Futuro das Finanças com Criptomoedas
          </Typography>
        </Stack>
        <Stack
          width={{ xs: "100%", md: "40%" }}
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          <img
            style={{ width: "80px", height: "auto", mb: "20px" }}
            src={logoClaro}
          />
          <TextField
            error={send && (!login || login == "")}
            helperText={
              send && (!login || login == "") && "O login ão poder nulo"
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
            type="password"
            label="Senha"
            variant="outlined"
            sx={styles.formW}
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
          <Button
            variant="contained"
            sx={styles.formW}
            onClick={() => handleAuth()}
          >
            Login
          </Button>
        
          <Button onClick={()=>navigate("/newUser")} sx={{fontSize:"0.8rem", textTransform:"none", color:"#564f5f"}}>Criar Nova Conta</Button>
        </Stack>
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
