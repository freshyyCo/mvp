import axios from "axios";
import React, { useState, useEffect } from "react";
import classes from "./CreateSurvey.module.css";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

const SampleSurvey = () => {
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (number.length === 12) {
      let arr = [];
      arr.push(number);
      setData((current) => [...current, arr]);
      console.log("Data", data);
    }
    if (number.length !== 12) {
      setData([]);
      console.log("Data", data);
    }
  }, [number]);

  const sendSurvey = () => {
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}app/v1/survey/start-bulk`,
      data: {
        data: data,
        surveyId: "62ff72e3c590b260dc9a2d40",
      },
    }).then((res) => {
      console.log("Sent", res);
      toast.success("Survey sent to your number!");
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
          <span style={{ marginLeft: "20px" }}>
            (Please add country code without '+' sign)
          </span>
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
