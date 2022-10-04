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
import { collection, getDocs } from "firebase/firestore";
import { DB } from "../Utils/firebase";
import "./Login.css";

function LogIn() {





  const History = useHistory();
  const [Email, setEmail] = useState("");

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function CheckInput() {
    if (Email === "" || values.password === "") {
      return false;
    } else {
      return true;
    }
  }

  //metodo che si interfaccia con le API
  function Login() {
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
            if (User.data.Password === values.password) {
              controllo = User.id;
            } else {
              controllo = "errore";
            }
          }
        });

        if (controllo !== undefined) {
          if (controllo !== "errore") {
            setTimeout(() => {
              localStorage.setItem("UserID", controllo);
              History.push("/Home");
            }, 700);
          }
        } else {
          console.log("new User detected");
          //da aggiungere un alert che fa vedere all'utente che i dati inseriti sono sbagliati/non corrispondono ad un account
        }
      });

    }
  }

  return (
    <div className="LogInContent"
    >
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
        <Button
          variant="contained"
          color="success"
          onClick={() => Login()}
        >
          Invio
        </Button>
      </Stack>
    </div>
  );
}

export default LogIn;
