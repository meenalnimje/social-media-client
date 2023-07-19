import React, { useEffect, useState } from "react";
import "./UpadateProfile.scss";
import dummyProfile from "../../assets/dummyProfile.png";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateMyProfile } from "../../redux/slice/appConfigSlice";
import { axiosClient } from "../../utiles/axiosClient";
import { useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utiles/localStorageManager";
function UpdateProfile() {
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url || "");
  }, [myProfile]);
  function handleImageChange(e) {
    // pehle file nikali
    const file = e.target.files[0];
    const fileReader = new FileReader();
    // fir use backend me bheja
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        // console.log("fileReader.result", fileReader.result);
      }
    };
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      })
    );
  }
  async function handleDeleteAccount() {
    try {
      dispatch(setLoading(true));
      await axiosClient.delete("/user/");
      removeItem(KEY_ACCESS_TOKEN);
      navigate("/login");
      dispatch(setLoading(false));
    } catch (e) {
      console.log("this error is from deleteaccount navbar side ", e);
    }
  }
  return (
    <div className="update-profile">
      <div className="container">
        <div className="left">
          <div className="input-user-img center">
            <label htmlFor="inputImg" className="img-label">
              <img src={userImg ? userImg : dummyProfile} alt={name} />
            </label>
            <input
              id="inputImg"
              className="inputImg"
              type="file"
              accept="img/*"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <input
              value={name}
              type="text"
              placeholder="Your Name "
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              value={bio}
              type="text"
              className="bio"
              placeholder="Your Bio "
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <input
              type="submit"
              className="btn-primary"
              onClick={handleSubmit}
            />
          </form>
          <button className="delete btn-primary" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
