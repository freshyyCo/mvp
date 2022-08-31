import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../images/logo512.png";
import classes from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={classes.header}>
        <div
          style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} style={{ width: "42px" }} />
          <div>Freshyy</div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
