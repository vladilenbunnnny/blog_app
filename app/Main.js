import React, { useState } from "react";
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
import ExampleContext from "./ExampleContext";

Axios.defaults.baseURL = "http://localhost:8080";

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  const [flash, setFlash] = useState([]);

  const addFlash = msg => {
    setFlash(prev => prev.concat(msg));
  };
  return (
    <ExampleContext.Provider value={addFlash}>
      <BrowserRouter>
        <FlashMessages messages={flash} />
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        <Switch>
          <Route path="/" exact>
            {loggedIn ? <Home /> : <HomeGuest />}
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
    </ExampleContext.Provider>
  );
}

ReactDOM.render(<Main />, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept();
}
