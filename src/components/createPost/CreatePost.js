import React, { useState } from "react";
import Avatar from ".././avatar/Avatar";
import { BsCardImage } from "react-icons/bs";
import bgImg from "../../assets/postImg.jpg";
import { axiosClient } from "../../utiles/axiosClient";
import "./CreatePost.scss";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slice/appConfigSlice";
import { getUserInfo } from "../../redux/slice/postSlice";
import { useParams } from "react-router-dom";
function CreatePost() {
  const [caption, setCaption] = useState("");
  const [postImg, setPostImg] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  function handleImgChange(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  }
  async function handlePostSubmit() {
    // no extra reducer as we just have to post the image.
    try {
      dispatch(setLoading(true));
      const response = await axiosClient.post("/post/", {
        caption,
        postImg,
      });
      // response.result will give post
      // this action is for showing the post just after creating.
      dispatch(
        getUserInfo({
          userId: myProfile?._id,
        })
      );
    } catch (e) {
      console.log("this error is from createPost handlePostSubmit ()", e);
    } finally {
      dispatch(setLoading(false));
      setCaption("");
      setPostImg("");
    }
  }
  return (
    <div className="create-post">
      <div className="left-part">
        <Avatar src={myProfile?.avatar?.url} />
      </div>
      <div className="right-part">
        <input
          type="text"
          placeholder="What is in your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        {postImg && (
          <div className="img-container">
            <img src={postImg} className="post-img" alt="post-img" />
          </div>
        )}
        <div className="bottom-part">
          <div className="input-post-img">
            <label htmlFor="postImg" className="labelImg">
              <BsCardImage />
            </label>
            <input
              type="file"
              className="postImg"
              id="postImg"
              accept="image/*"
              onChange={handleImgChange}
            />
          </div>
          <button className="post-btn btn-primary" onClick={handlePostSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
