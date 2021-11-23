import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import StateContext from "../StateContext";
import Page from "./Page";
import Axios from "axios";
import { Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";
import ReactMarkdown from "react-markdown";
import ReactTooltip from "react-tooltip";

function ViewSinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token });
        console.log("Success loading single post");
        setPost(response.data);
        setDate(response.data.createdDate);
        console.log(response);
        setIsLoading(false);
        console.log(username, id);
      } catch (error) {
        console.log("Error loading single post");
      }
    };
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  const extractedDate = new Date(date);
  const dateFormatted = `${extractedDate.getDate()}/${extractedDate.getMonth() + 1}/${extractedDate.getFullYear()}`;
  return (
    <Page title="Post">
      {isLoading ? (
        <LoadingDotsIcon />
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h2>{post.title}</h2>
            <span className="pt-2">
              <a href="#" data-tip="Edit" data-for="edit" className="text-primary mr-2">
                <i className="fas fa-edit"></i>
              </a>
              <ReactTooltip id="edit" className="custom-tooltip" />{" "}
              <a data-tip="Delete" data-for="delete" className="delete-post-button text-danger">
                <ReactTooltip id="delete" className="custom-tooltip" />
                <i className="fas fa-trash"></i>
              </a>
            </span>
          </div>

          <p className="text-muted small mb-4">
            <Link to={`/profile/${post.author.username}`}>
              <img className="avatar-tiny" src={post.author.avatar} />
            </Link>
            Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {dateFormatted}
          </p>

          <div className="body-content">
            <ReactMarkdown children={post.body} />
          </div>
        </>
      )}
    </Page>
  );
}

export default ViewSinglePost;
