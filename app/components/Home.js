import React, { useContext } from "react";
import StateContext from "../StateContext";
import Page from "./Page";

function Home() {
  const appState = useContext(StateContext);
  const name = appState.user.username;
  // const userName = appState.user.userName;
  // const name = userName.charAt(0).toUpperCase() + userName.slice(1);
  return (
    <Page title="Home">
      <h2 className="text-center">
        Hello <strong>{name}</strong>, your feed is empty.
      </h2>
      <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
    </Page>
  );
}

export default Home;
