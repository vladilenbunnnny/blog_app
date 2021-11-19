import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "axios";

function ProfilePosts() {
  const [posts, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { username } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);

        setIsLoading(false);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("There was a problem");
      }
    };
    fetchPosts();
  }, []);

  return isLoading ? (
    <h4>Loading...</h4>
  ) : (
    <div className="list-group">
      {posts.map(post => {
        return (
          <a href="#" className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>{post.title}</strong>
            <span className="text-muted small">on 2/10/2020 </span>
          </a>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
