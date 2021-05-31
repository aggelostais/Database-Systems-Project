import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import './App.css';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
      {/*Sets the default route paths*/}
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
