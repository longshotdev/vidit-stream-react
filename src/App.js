import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
function App() {
  let [userData, changeUserData] = useState({});
  let [isLoggedIn, changeLogin] = useState(true);
  let [aURL, setAURL] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("jwt"));
    // Try to login and get the shit
    axios({
      method: "GET",
      url: `/api/users/info/${localStorage.getItem("username")}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
      .then(res => {
        console.log(res.data.data);
        if (res.status === 200) {
          if (res.data) {
            changeLogin(true);
            changeUserData(res.data.data);
          }
        }
      })
      .catch(e => {
        console.error("couldnt login");
        changeLogin(false);
        changeUserData(false);
      });
  }, []);
  let lg = () => {
    localStorage.clear();
    window.location.reload();
  };
  let setAvatar = () => {
    console.log("setting av");
    axios({
      method: "POST",
      url: `/api/users/changeAvatar/${localStorage.getItem("username")}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      data: {
        url: aURL
      }
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          if (res.data) {
            window.location.reload();
          }
        }
      })
      .catch(e => {
        console.error("couldnt login");
        changeUserData({});
      });
  };
  if (isLoggedIn === true) {
    return (
      <div>
        <h1>Welcome {userData.username}</h1>
        <h6>ID: {userData.id}</h6>
        <img alt="pp" height="64" width="64" src={userData.avatar} />
        <input
          type="text"
          value={aURL}
          onChange={e => setAURL(e.target.value)}
        />
        <button value="setAvatar" onClick={() => setAvatar()}>
          Set Avatar
        </button>
        <button value="Logout" onClick={() => lg()}>
          Logout
        </button>
      </div>
    );
  } else if (isLoggedIn === false) {
    return <Redirect to="/login" />;
  }
}

export default App;
