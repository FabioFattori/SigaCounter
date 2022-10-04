import "./App.css";
import Home from "./Componenti/Home";
import PaginaLogReg from "./Componenti/PaginaRegistrazione&Login"
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/Home">
            <Home />
          </Route>
          <Route path="/">
            <PaginaLogReg />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
