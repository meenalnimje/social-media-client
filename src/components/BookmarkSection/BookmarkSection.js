import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkPost } from "../../redux/slice/postSlice";
import Post from "../post/Post";
import "./BookmarkSection.scss";
function BookmarkSection() {
  const feedData = useSelector((state) => state.feedDataReducer.feedData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookmarkPost());
  }, []);
  console.log("feed data after modifying bookmarks", feedData);
  return (
    <div className="bookmark">
      {feedData?.bookmarks?.map((item) => (
        <Post post={item} />
      ))}
    </div>
  );
}

export default BookmarkSection;
