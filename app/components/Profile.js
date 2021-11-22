import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StateContext from "../StateContext";
import Page from "./Page";
import { useParams } from "react-router";
import Axios from "axios";
import ProfilePosts from "./ProfilePosts";

function Profile() {
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    isFollowing: false,
    counts: {
      postCount: "",
      followerCount: "",
      followingCount: "",
    },
  });
  const { username } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token }, { cancelToken: ourRequest.token });

        setProfileData(response.data);
      } catch (error) {
        console.log("There was an error loading Profile");
      }
    };
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  // useEffect(() => {
  //   console.log("haha");
  // }, []);

  const appState = useContext(StateContext);
  return (
    <Page title="Profile">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Posts: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Followers: {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Following: {profileData.counts.followingCount}
        </a>
      </div>
      <ProfilePosts />
    </Page>
  );
}

export default Profile;
