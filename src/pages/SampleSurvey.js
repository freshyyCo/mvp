import axios from "axios";
import React, { useState } from "react";
import classes from "./CreateSurvey.module.css";
import { TextField } from "@mui/material";

const SampleSurvey = () => {
  const [number, setNumber] = useState("");

  const sendSurvey = () => {
    axios({
      method: "post",
      url: "https://webhook.freshyy.co/app/v1/survey/start",
      data: {
        destination: number,
        surveyId: "62ff72e3c590b260dc9a2d40",
      },
    }).then((res) => {
      console.log("Sent", res);
    });
  };
  return (
    <div>
      <div className={classes.heading}>
        <b>Send Sample Survey to your own number</b>
      </div>
      {/* Add basic details */}
      <div>
        <div className={classes.subHeading}>Enter Basic Details</div>
        <br />
        <div className={classes.detail}>
          <div className={classes.left}>Phone Number</div>
          <div className={classes.right}>
            <TextField
              id="outlined-basic"
              label="Eg: 916350xx505"
              variant="outlined"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>{" "}
          <span style={{ marginLeft: "20px" }}>(Add in bulk coming soon!)</span>
        </div>{" "}
        <br />
      </div>

      <div className={classes.button3} onClick={() => sendSurvey()}>
        Send Survey
      </div>
    </div>
  );
};

export default SampleSurvey;
