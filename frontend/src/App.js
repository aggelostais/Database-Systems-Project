import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import MenuAppBar from './components/MenuAppBar';
import VisitEvents from "./pages/VisitEvents";
import CostumerTrace from "./pages/CostumerTrace";
import CovidMatches from "./pages/CovidMatches";
import VisitsPerArea from "./pages/VisitsPerArea";
import VisitsPerService from "./pages/VisitsPerService";
import CostumersPerService from "./pages/CostumersPerService";
import SalesPerService from "./pages/SalesPerService";
import CostumerRecord from "./pages/CostumerRecord";
import "./App.css";

function App() {
    return (
      <div className="wrapper">
        <BrowserRouter>
        <MenuAppBar/>

        {/*Sets the default route paths*/}
          <Switch>
            <Route path="/VisitEvents">
              <VisitEvents/>
            </Route>
            <Route path="/CostumerTrace">
              <CostumerTrace />
            </Route>
            <Route path="/CovidMatches">
              <CovidMatches/>
            </Route>
            <Route path="/VisitsPerArea">
              <VisitsPerArea/>
            </Route>
            <Route path="/VisitsPerService">
              <VisitsPerService/>
            </Route>
            <Route path="/CostumersPerService">
              <CostumersPerService/>
            </Route>
            <Route path="/SalesPerService">
              <SalesPerService/>
            </Route>
            <Route path="/CostumerRecord">
              <CostumerRecord/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
