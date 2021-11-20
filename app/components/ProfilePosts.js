import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import { Link } from "react-router-dom";

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
        console.log(response);
      } catch (error) {
        console.log("There was a problem to load all posts for this user");
      }
    };
    fetchPosts();
  }, []);

  return isLoading ? (
    <h4>Loading...</h4>
  ) : (
    <div className="list-group">
      {posts.map(post => {
        const date = new Date(post.createdDate);
        const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

        return (
          <Link key={post._id} to={`/post/${post._id}`} className="list-group-item list-group-item-action">
            <img className="avatar-tiny" src={post.author.avatar} /> <strong> {post.title}</strong> <span className="text-muted small">{dateFormatted} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
