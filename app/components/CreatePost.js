import React, { useEffect, useState, useContext } from "react";
import Page from "./Page";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  let history = useHistory();

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  //const addFlash = useContext(ExampleContext);

  const handleSubmit = async e => {
    e.preventDefault();
    let token = appState.user.token;
    try {
      const response = await Axios.post("/create-post", { title, body, token });
      //Redirect to new post URL
      history.push(`/post/${response.data}`);

      console.log("New Post success");
      console.log(response);
      appDispatch({ type: "flash", value: `Congrats, you successfuly created a post about ${title}` });
    } catch (e) {
      console.log("There was a problem");
    }
  };

  return (
    <Page title="Create Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default CreatePost;
