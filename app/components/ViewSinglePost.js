import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import StateContext from "../StateContext";
import Page from "./Page";
import Axios from "axios";

function ViewSinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/post/${id}`);
        console.log("Success loading single post");
        setPost(response.data);
        setDate(response.data.createdDate);
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        console.log("Error loading single post");
      }
    };
    fetchData();
  }, []);

  const extractedDate = new Date(date);
  const dateFormatted = `${extractedDate.getDate()}/${extractedDate.getMonth() + 1}/${extractedDate.getFullYear()}`;
  return (
    <Page title="Post">
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <>
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
            Posted by <a href="#">{post.author.username}</a> on {dateFormatted}
          </p>

          <div className="body-content">
            <p>{post.body}</p>
          </div>
        </>
      )}
    </Page>
  );
}

export default ViewSinglePost;
