import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import StateContext from "../StateContext";
import Page from "./Page";
import Axios from "axios";

function ViewSinglePost() {
  const appState = useContext(StateContext);
  const name = appState.user.username;
  const { id } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/post/${id}`);
        console.log("Success loading single post");
        setPost(response.data);
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        console.log("Error loading single post");
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <h4>Loading...</h4>
  ) : (
    <Page title="Post">
      <div className="d-flex justify-content-between">
        <h2>{post.title}</h2>
        <span className="pt-2">
          <a href="#" className="text-primary mr-2" title="Edit">
            <i className="fas fa-edit"></i>
          </a>
          <a className="delete-post-button text-danger" title="Delete">
            <i className="fas fa-trash"></i>
          </a>
        </span>
      </div>

      <p className="text-muted small mb-4">
        <a href="#">
          <img className="avatar-tiny" src={post.author.avatar} />
        </a>
        Posted by <a href="#">{post.author.username}</a> on 2/10/2020
      </p>

      <div className="body-content">
        <p>{post.body}</p>
      </div>
    </Page>
  );
}

export default ViewSinglePost;
