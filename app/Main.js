import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//My Components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Axios from "axios";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

Axios.defaults.baseURL = "http://localhost:8080";

function Main() {
  //////Reducer/////
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    flash: [],
  };
  function ourReducer(state, action) {
    switch (action.type) {
      case "login":
        return { loggedIn: true, flash: state.flash };
      case "logout":
        return { loggedIn: false, flash: state.flash };
      case "flash":
        return { loggedIn: state.loggedIn, flash: state.flash.concat(action.value) };
    }
  }
  const [state, dispatch] = useReducer(ourReducer, initialState);
  //////Reducer/////

  // const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  // const [flash, setFlash] = useState([]);

  // const addFlash = msg => {
  //   setFlash(prev => prev.concat(msg));
  // };

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flash} />
          <Header />

          <Switch>
            <Route path="/" exact>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/post/:id">
              <ViewSinglePost />
            </Route>
          </Switch>

          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept();
}
