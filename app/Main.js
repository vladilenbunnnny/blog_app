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

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")));
  return (
    <BrowserRouter>
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
      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

ReactDOM.render(<Main />, document.querySelector("#app"));

if (module.hot) {
  module.hot.accept();
}
