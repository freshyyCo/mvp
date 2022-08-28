import React from "react";
import classes from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.textBox}>
        <b>Welcome to Freshyy's Demo!</b>
        <br />
        This is our MVP to show how good WhatsApp can be in leveraging various
        use cases
      </div>

      <div className={classes.buttons}>
        <button className={classes.button} onClick={() => navigate("/sample")}>
          <b>Send me a sample survey &gt;&gt;</b>
        </button>

        <button className={classes.button} onClick={() => navigate("/create")}>
          <b>Create my own survey &gt;&gt;</b>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
