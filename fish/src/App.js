import React from 'react';
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Menu from "./components/Menu";
import './App.scss';
import CatchForm from "./components/CatchForm";
import CatchList from "./components/CatchList";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import MyCatches from "./components/MyCatches";
import NotFound from "./components/NotFound";
function App() {
  return (
    <div className="App">
        <div className={"background"}>
            <BrowserRouter>
              <Menu/>
        ls      <div className={"content-wrapper"}>
                  <Switch>
                      <Route exact={true} component={Welcome} path={"/"}/>
                      <Route exact={true} component={CatchForm} path={"/catch"}/>
                      <Route exact={true} component={CatchList} path={"/catches"}/>
                      <Route exact={true} component={Profile} path={"/profile"}/>
                      <Route exact={true} component={MyCatches} path={"/MyCatches"}/>
                      <Route exact={false} component={NotFound}/>
                  </Switch>
              </div>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
