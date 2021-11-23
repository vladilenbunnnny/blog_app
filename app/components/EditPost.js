import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";

import Page from "./Page";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import StateContext from "../StateContext";

import { useImmerReducer } from "use-immer";

const ACTIONS = {
  FETCHCOMPLETE: "fetchComplete",
  TITLECHANGE: "titleChange",
  BODYCHANGE: "bodyChange",
  SUBMITREQUEST: "submitRequest",
  SAVEREQUESTSTARTED: "saveRequestStarted",
  SAVEREQUESTFINISHED: "saveRequestFinished",
};

function EditPost() {
  const appState = useContext(StateContext);
  const initialState = {
    title: {
      value: "",
      isEmpty: false,
      errMsg: "",
    },
    body: {
      value: "",
      isEmpty: false,
      errMsg: "",
    },
    isFetching: true,
    saveIsLoading: false,
    id: useParams().id,
    sendCount: 0,
  };
  const ourReducer = (draft, action) => {
    switch (action.type) {
      case ACTIONS.FETCHCOMPLETE:
        draft.title.value = action.value.title;
        draft.body.value = action.value.body;
        draft.isFetching = false;
        return;
      case ACTIONS.TITLECHANGE:
        draft.title.value = action.value;
        return;
      case ACTIONS.BODYCHANGE:
        draft.body.value = action.value;
        return;
      case ACTIONS.SUBMITREQUEST:
        draft.sendCount++;
        return;
      case ACTIONS.SAVEREQUESTSTARTED:
        draft.saveIsLoading = true;
        return;
      case ACTIONS.SAVEREQUESTFINISHED:
        draft.saveIsLoading = false;
        return;
    }
  };
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  const submitHandler = e => {
    e.preventDefault();
    dispatch({ type: ACTIONS.SUBMITREQUEST });
  };

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await Axios.get(`/post/${state.id}`, { CancelToken: ourRequest.token });
        console.log("Success loading post for editing");
        dispatch({ type: ACTIONS.FETCHCOMPLETE, value: response.data });
      } catch (error) {
        console.log("Error loading single post for editing");
      }
    };
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  useEffect(() => {
    if (state.sendCount) {
      dispatch({ type: ACTIONS.SAVEREQUESTSTARTED });
      const ourRequest = Axios.CancelToken.source();
      const updatePost = async () => {
        try {
          const response = await Axios.post(`/post/${state.id}/edit`, { title: state.title.value, body: state.body.value, token: appState.user.token }, { CancelToken: ourRequest.token });

          dispatch({ type: ACTIONS.SAVEREQUESTFINISHED });
        } catch (error) {
          console.log("Error sending update for the post");
        }
      };
      updatePost();
      return () => {
        ourRequest.cancel();
      };
    }
  }, [state.sendCount]);

  // const extractedDate = new Date(date);
  // const dateFormatted = `${extractedDate.getDate()}/${extractedDate.getMonth() + 1}/${extractedDate.getFullYear()}`;
  return (
    <Page title="Post">
      {state.isFetching ? (
        <LoadingDotsIcon />
      ) : (
        <>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="post-title" className="text-muted mb-1">
                <small>Title</small>
              </label>
              <input onChange={e => dispatch({ type: ACTIONS.TITLECHANGE, value: e.target.value })} value={state.title.value} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
            </div>

            <div className="form-group">
              <label htmlFor="post-body" className="text-muted mb-1 d-block">
                <small>Body Content</small>
              </label>
              <textarea onChange={e => dispatch({ type: ACTIONS.BODYCHANGE, value: e.target.value })} value={state.body.value} name="body" id="post-body" className="body-content tall-textarea form-control" type="text" />
            </div>

            <button className="btn btn-primary" disabled={state.saveIsLoading}>
              Save Updates
            </button>
          </form>
        </>
      )}
    </Page>
  );
}

export default EditPost;
