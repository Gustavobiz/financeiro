import {
  Stack,
  Paper,
  TextField,
  Box,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useYScale, useDrawingArea } from "@mui/x-charts/hooks";
import { areaElementClasses } from "@mui/x-charts/LineChart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

export default function Criptos() {
  const [openSnack, setOpenSnack] = useState({
    status: false,
    type: "",
    text: "",
  });
  const [criptos, setCriptos] = useState([]);
  const [criptoSelected, setCriptoSelected] = useState(null);
  const [criptoData, setCriptoData] = useState(null);
  const [loadingCriptoData, setLoadingCriptoData] = useState(false);
  const [criptoHistory, setcriptoHistory] = useState([]);
  const [criptoHistoryLabel, setCriptoHistoryLabel] = useState([]);


  useEffect(() => {
    handleGetCoins();
  }, []);
  useEffect(() => {
    if(criptos.length==0)return
    setCriptoSelected(criptos[0]?.id);
  }, [criptos]);

  useEffect(() => {
    if(!criptoSelected)return
    handleGetCoin()
  }, [criptoSelected]);


  const handleChange = (event) => {
    setCriptoSelected(event.target.value);
  };

  let styles = {
    container: {
      backgroundColor: "#eeeff6",

      height: "calc(100vh - 90px)",
      padding: "10px",
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      display: "flex",
      height: "80px",
      alignItems: "center",
      paddingX: "20px",
      justifyContent: "space-between",
    },
    cardCoins: {
      width: "170px",
      height: "50px",

      mt: 1,
      padding: "10px",
    },
  };
  async function handleGetCoins() {
    
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/cripto/findMany",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`, 
          },
        }
      );
      if (response.status == 200) {
        let data = await response.json();
        setCriptos(data);
      }
    } catch (err) {
      setOpenSnack({
        status: true,
        type: "error",
        text: "Não foi possivel se conectar com o servidor",
      });
    } finally {
    }
  }
  async function handleGetCoin() {
    setLoadingCriptoData(true)
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/cripto/find",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`, 
          },
          
          body: JSON.stringify({
            "cripto":criptoSelected,
	          "usuarioId":JSON.parse(localStorage.getItem("user"))?.id
          }),
        }
      );
      if (response.status == 200) {
        let data = await response.json();
        setCriptoData(data)
        console.log(data)
        setcriptoHistory(data.historico.map(a=>a.priceUsd))
        setCriptoHistoryLabel(data.historico.map(a=>a.date.split("T")[0]))
      }
    } catch (err) {
      setOpenSnack({
        status: true,
        type: "error",
        text: "Não foi possivel se conectar com o servidor",
      });
    } finally {
      setLoadingCriptoData(false)
    }
  }
  function ColorSwich({ threshold, color1, color2, id }) {
    const { top, height, bottom } = useDrawingArea();
    const svgHeight = top + bottom + height;

    const scale = useYScale(); // You can provide the axis Id if you have multiple ones
    const y0 = scale(threshold); // The coordinate of of the origine
    const off = y0 !== undefined ? y0 / svgHeight : 0;

    return (
      <defs>
        <linearGradient
          id={id}
          x1="0"
          x2="0"
          y1="0"
          y2={`${svgHeight}px`}
          gradientUnits="userSpaceOnUse" // Use the SVG coordinate instead of the component ones.
        >
          <stop offset={"0%"} stopColor={color1} stopOpacity={1} />
          <stop offset={"90%"} stopColor={color2} stopOpacity={1} />
        </linearGradient>
      </defs>
    );
  }


  return (
    <Box sx={styles.container}>
      <Paper elevation={1} sx={styles.header}>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">
            Selecione a Moeda
          </InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={criptoSelected || ""}
            label="Selecione a Moeda"
            onChange={handleChange}
          >
            {criptos.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
      {loadingCriptoData &&  <Skeleton variant="rectangular" width="100%" height={200} sx={{mt:1}} /> }
      {!loadingCriptoData && 
      <>
      <Stack direction="row" sx={{ mt: 1 }}>
        <Paper elevation={1} sx={{ height: "300px", width: "90%" }}>
          <Typography sx={{ fontSize: "1.2rem", mt: 1, ml: 2, mb: -2 }}>
            Histórico da moeda
          </Typography>
          <LineChart
            leftAxis={null}
            rightAxis={{}}
            series={[{ data: criptoHistory, area: true, color: "#450388",  showMark: false }]}
            xAxis={[{ scaleType: "point", data: criptoHistoryLabel }]}
            sx={{
              [`& .${areaElementClasses.root}`]: {
                fill: "url(#swich-color-id-1)",
              },
              [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
                strokeWidth: 1,
              },

              ".MuiLineElement-series-uvId": {
                strokeDasharray: "3 4 5 2",
              },
              [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
                {
                  fill: "#fff",
                },
              [`& .${markElementClasses.highlighted}`]: {
                stroke: "none",
              },
            }}
          >
            <ColorSwich
              color1="#450388"
              color2="#ffffff"
              threshold={0}
              id="swich-color-id-1"
            />
          </LineChart>
        </Paper>
        <Stack sx={{ paddingX: "10px", width: "10%" }} gap={1}>
          <Button sx={{ height: "80px", width: "100%" }} variant="contained">
            <Stack justifyContent="center" alignItems="center" gap={0.5}>
              <AddShoppingCartIcon sx={{ fontSize: "23px" }} />
              Comprar
            </Stack>
          </Button>
          <Button sx={{ height: "80px", width: "100%" }} variant="contained">
            <Stack justifyContent="center" alignItems="center" gap={0.5}>
              <AttachMoneyIcon sx={{ fontSize: "23px" }} />
              Vender
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap={1}
        justifyContent="space-between"
        sx={{ width: "99%", flexWrap: "wrap" }}
      >
        <Paper elevation={1} sx={styles.cardCoins}>
          <Stack>
            <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
              Oferta atua
            </Typography>
            <Typography>{(parseFloat(criptoData?.supply)||0)?.toFixed(2)} {criptoSelected}s</Typography>
          </Stack>
        </Paper>
        <Paper elevation={1} sx={styles.cardCoins}>
          <Stack>
            <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
              Oferta máxima
            </Typography>
            <Typography>{(parseFloat(criptoData?.maxSupply)||0)?.toFixed(2)} {criptoSelected}s</Typography>
          </Stack>
        </Paper>
        <Paper elevation={1} sx={styles.cardCoins}>
          <Stack>
            <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
              Capitalização{" "}
            </Typography>
            <Typography>$ {(parseFloat(criptoData?.marketCapUsd)||0)?.toFixed(2)} </Typography>
          </Stack>
        </Paper>
        <Paper elevation={1} sx={styles.cardCoins}>
          <Stack>
            <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
              Preço atual
            </Typography>
            <Typography>$ {(parseFloat(criptoData?.priceUsd)||0)?.toFixed(2)} </Typography>
          </Stack>
        </Paper>
        <Paper elevation={1} sx={styles.cardCoins}>
          <Stack>
            <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
              Variação no preço
            </Typography>
            <Typography>{(parseFloat(criptoData?.changePercent24Hr)||0)?.toFixed(2)}% </Typography>
          </Stack>
        </Paper>
        <Paper elevation={1} sx={styles.cardCoins}>
          <Stack>
            <Typography sx={{ fontSize: "13px", fontWeight: 700 }}>
              VWAP
            </Typography>
            <Typography>$ {(parseFloat(criptoData?.vwap24Hr)||0)?.toFixed(2)} </Typography>
          </Stack>
        </Paper>
      </Stack>
      </>}
    </Box>
  );
}
