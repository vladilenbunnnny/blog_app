import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function HeaderLoggedIn() {
  //const { addFlash, setLoggedIn } = useContext(ExampleContext);
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleSubmit(e) {
    e.preventDefault();
    appDispatch({ type: "logout" });
    appDispatch({ type: "flash", value: `User ${appState.user.username} successfully logged out` });

    //addFlash(`User ${userName} successfully logged out`);
    // localStorage.removeItem("token");
    // localStorage.removeItem("userName");
    // localStorage.removeItem("avatar");
  }
  return (
    <div className="flex-row my-3 my-md-0">
      <a href="#" className="text-white mr-2 header-search-icon">
        <i className="fas fa-search"></i>
      </a>
      <span className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Link to={`/profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>
      <button onClick={handleSubmit} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
