import "./SearchProfile.scss";

import Avatar from "../avatar/Avatar";
import React from "react";
import { useNavigate } from "react-router-dom";

function SearchProfile(props) {
  const navigate = useNavigate();
  return (
    <div
      className="search-profile"
      onClick={() => {
        navigate(`/profile/${props?.info._id}`);
        props?.closeFunction();
      }}
    >
      <div className="profile-icon">
        <Avatar src={props?.info?.avatar?.url} />
      </div>
      <h4 className="name">{props?.info?.name}</h4>
    </div>
  );
}

export default SearchProfile;
