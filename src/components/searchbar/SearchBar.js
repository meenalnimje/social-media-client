import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { axiosClient } from "../../utiles/axiosClient";
import "./SearchBar.scss";
import SearchProfile from "../searchProfile/SearchProfile";
function SearchBar() {
  const [inputName, setInputName] = useState("");
  const [userList, setUserList] = useState([]);
  async function allUserList(value) {
    const response = await axiosClient.post("/user/all", {
      username: value,
    });
    if (value) {
      setUserList(response.result);
    } else {
      setUserList([]);
    }
  }
  useEffect(() => {
    allUserList(inputName);
  }, [inputName]);
  // console.log("this is the userList ", userList);
  return (
    <div className="search-container">
      <div className="search-icon">
        <FiSearch className="icon" />
      </div>
      <div className="search-box">
        <div className="search-space">
          <input
            type="text"
            placeholder="Search"
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
          />
        </div>
        <div className="search-result">
          {userList?.users?.map((item) => (
            <SearchProfile props={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
