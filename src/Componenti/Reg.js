import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { collection, addDoc,doc, getDocs } from "firebase/firestore";
import { DB } from "../Utils/firebase";
import "./Reg.css";

function Reg() {

  const History = useHistory();
  const [Email, setEmail] = useState("");

  const [values, setValues] = React.useState({
    confPass: "",
    password: "",
    showPassword: false,
    showConfPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfPassword = () => {
    setValues({
      ...values,

      showConfPassword: !values.showConfPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function CheckInput() {
    if (Email === "" || values.password === "" || values.confPass === "") {
      return false;
    } else {
      if (values.confPass === values.password) {
        return true;
      } else {
        return false;
      }
    }
  }

  //metodo che si interfaccia con le API
  function Registrazione() {
    if (CheckInput() === true) {
      const collectionUtente = collection(DB, "Utenti");


      getDocs(collectionUtente).then((response) => {
        const Users = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));



        var controllo;
        Users.forEach((User) => {
          if (User.data.Email === Email) {
            controllo = "l'account esiste già"
          }
        });


        if (controllo !== undefined) {
          alert(controllo)
          //mostrare all'utente un alert che segnala che l'email è gia associata ad un account
        } else {
          console.log("new User detected");

          //codice che pusha i dati nel DB
          addDoc(collectionUtente, {
            Email: Email,
            Password: values.password,
          }).then((response) => {
            setTimeout(() => {
              localStorage.setItem("UserID", response.id);


              const collectionSiga = collection(DB, "Siga");
              //creazione data
              var currentdate = new Date();
              var datetime =
                currentdate.getDate() +
                "-" +
                (currentdate.getMonth() + 1) +
                "-" +
                currentdate.getFullYear();

                const docRef = doc(
                  DB,
                  "Utenti",
                  response.id
                );
                addDoc(collectionSiga, {
                  Data: datetime,
                  ID_Utente: docRef,
                  NFumate: 0,
                }).then(()=>{
                  History.push("/Home");})

            }, 700);
          });
        }
      });

    }

  }

  return (
    <div className="RegContent" >
      <Stack
        component="form"
        // sx={{
        //   width: "30ch",
        // }}
        spacing={2}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={Email}
        />
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{ m: 1 }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Conferma
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showConfPassword ? "text" : "password"}
            value={values.confPass}
            onChange={handleChange("confPass")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showConfPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          variant="contained"
          color="success"
          onClick={() => Registrazione()}
        >
          Invio
        </Button>
      </Stack>

    </div>
  );
}

export default Reg;
