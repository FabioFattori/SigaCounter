import React, { useState,useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LogIn from "./LogIn";
import Reg from "./Reg";
import "./PaginaLogReg.css";
import useWindowDimensions from "../functions/GetScreenSize";
import {GestioneMinoreDi800px,GestioneMaggioreDi800px} from "../functions/gestioneLogReg"

function PaginaRegistrazioneLogin() {
  const [ComponentToShow, setToShow] = useState(<LogIn />);

  var { height, width } = useWindowDimensions();
  const [spacingOfTheStack,setSpacing]=useState(10);
  const [colorLogBTN, setColorLogBTN] = useState("success");
  const [colorRegBTN, setColorRegBTN] = useState("inherit");

  //gestione del contenuto se lo schermo è troppo piccolo
  useEffect(()=>{

    if(width<=365){
      setSpacing(0.5)
    }else if(width<=385){
      setSpacing(1)
    }else if(width<=440){
      setSpacing(2)
    }else{
      setSpacing(10)
    }


    if(width<=840){
      GestioneMinoreDi800px()
    }else{
      GestioneMaggioreDi800px()
    }
  })

  

  function ShowRegistrazione() {
    setColorLogBTN("inherit");
    setColorRegBTN("success");
    setToShow(<Reg />);
  }

  function ShowLogin() {
    setColorLogBTN("success");
    setColorRegBTN("inherit");
    setToShow(<LogIn />);
  }

  return (
    <div>
      <Stack className="DoubleButton" direction="row" spacing={spacingOfTheStack}>
        <Button
          variant="contained"
          color={colorLogBTN}
          onClick={() => ShowLogin()}
        >
          Login
        </Button>
        <Button
        className="RegButton"
          id="RegButton"
          variant="contained"
          color={colorRegBTN}
          onClick={() => ShowRegistrazione()}
        >
          Registrazione
        </Button>
      </Stack>

      <div className="logRegPageContent">{ComponentToShow}</div>
    </div>
  );
}

export default PaginaRegistrazioneLogin;
