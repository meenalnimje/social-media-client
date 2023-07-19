import React from "react";
import "./SearchProfile.scss";
import Avatar from "../avatar/Avatar";
import { useNavigate } from "react-router-dom";
function SearchProfile({ props }) {
  const navigate = useNavigate();
  return (
    <div>
      <Avatar src={props?.avatar?.url} />
      <h4
        className="name"
        onClick={() => {
          navigate(`/profile/${props._id}`);
        }}
      >
        {props.name}
      </h4>
      <h5 className="info">Follow</h5>
    </div>
  );
}

export default SearchProfile;
