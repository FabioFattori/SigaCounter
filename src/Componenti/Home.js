import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { collection, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { DB } from "../Utils/firebase";
import Button from "@mui/material/Button";
import "./Home.css";

function Home() {
  var [idOfDB,setId]= useState(null);
  const [sigaretteInDB, setSigaDB] = useState(0);
  const [NSigaretteFumate, setN] = useState(0);

  useEffect(() => {
    //correzzione formattazione della data per il DB
    var data = getCurrentDate().split(" ");

    data = data[2]

    const collectionRows = collection(DB, "Siga");


    getDocs(collectionRows).then((response) => {
      const RowsSiga = response.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
      }));


      var controllo;


      RowsSiga.forEach((SingleRow) => {
        if (SingleRow.data.Data === data) {
          if (SingleRow.data.ID_Utente.id === localStorage.getItem("UserID")) {
            setSigaDB(SingleRow.data.NFumate)
            setN(SingleRow.data.NFumate)
            controllo = SingleRow.id;
            setId(controllo)
          } else {
            controllo = "errore";
          }
        }
      });

      if (controllo === undefined) {
        console.log("need new row detected");
        const docRef = doc(
          DB,
          "Utenti",
          localStorage.getItem("UserID")
        );
        addDoc(collectionRows, {
          Data: data,
          ID_Utente: docRef,
          NFumate: 0,
        })
      }
    });



  }, []);

  function RemoveSiga() {
    if (NSigaretteFumate <= 0) {
      //does nothing
    } else {
      setN(NSigaretteFumate - 1);
    }
  }

  function getCurrentDate() {
    var currentdate = new Date();
    var datetime =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds() +
      " Del " +
      currentdate.getDate() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getFullYear();

    return datetime;
  }

  function SaveChanges() {
    if (NSigaretteFumate !== sigaretteInDB) {
      
      const docRef = doc(
        DB,
        "Siga",
        idOfDB
      );


      updateDoc(docRef, { NFumate: NSigaretteFumate });

    }
  }

  return (
    <div className="HomeContent">
      <h1>{getCurrentDate()}</h1>
      <h2>Sigarette Fumate oggi:</h2>

      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip title="rimuovi" placement="top-start">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => RemoveSiga()}
            >
              <RemoveIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top">
            <p className="NSigarette">{NSigaretteFumate}</p>
          </Tooltip>
          <Tooltip title="Aggiungi" placement="top-end">
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => setN(NSigaretteFumate + 1)}
            >
              <AddIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      <Button variant="contained" color="success" onClick={() => SaveChanges()}>
        Salva
      </Button>
    </div>
  );
}

export default Home;
