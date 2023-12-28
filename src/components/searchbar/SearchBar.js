import "./SearchBar.scss";

import React, { useEffect, useState } from "react";

import { FiSearch } from "react-icons/fi";
import SearchProfile from "../searchProfile/SearchProfile";
import { axiosClient } from "../../utiles/axiosClient";

function SearchBar() {
  const [open, setOpen] = useState(false);
  const [inputName, setInputName] = useState("");
  const [userList, setUserList] = useState([]);
  async function allUserList(value) {
    const response = await axiosClient.post("/user/all", {
      username: value,
    });
    if (value) {
      setUserList(response.result);
      setOpen(true);
    } else {
      setUserList([]);
      setOpen(false);
    }
  }
  useEffect(() => {
    allUserList(inputName);
  }, [inputName]);
  return (
    <div className="search-box">
      <div className="search-icon">
        <FiSearch className="icon" />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={inputName}
        onChange={(e) => {
          setInputName(e.target.value);
        }}
      />
      {open && (
        <div className="search-result">
          {userList?.users?.map((item) => (
            <SearchProfile
              info={item}
              closeFunction={() => {
                setOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
