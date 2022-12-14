import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import classes from "./CreateSurvey.module.css";
import QuestionBlock from "../components/QuestionBlock";
import axios from "axios";
import { toast } from "react-toastify";
import Papa from "papaparse";
import exportFromJSON from "export-from-json";

const CreateSurvey = () => {
  const [questions, setQuestions] = useState([
    {
      number: 1,
      question: "",
      type: "single-choice",
      options: [],
    },
  ]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [startingMessage, setStartingMessage] = useState("");
  const [data, setData] = useState([]);
  const [string, setString] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [surveyId, setSurveyId] = useState("");

  const addQuestion = () => {
    setQuestions((current) => [
      ...current,
      {
        number: questions.length + 1,
        question: "",
        type: "single-choice",
        options: [],
      },
    ]);
    console.log(questions);
  };

  useEffect(() => {
    if (number.length === 12) {
      let arr = [];
      arr.push(number);
      setData((current) => [...current, arr]);
      // console.log("Data", data);
    }
    if (number.length !== 12) {
      setData([]);
      console.log("Data", data);
    }
  }, [number]);

  const sendSurvey = () => {
    console.log("QUESTIONS", questions);
    var quesData = questions.map((element) => {
      if (element.type === "single-choice") {
        var finalOptions = [];
        element.options.forEach((ele) => {
          finalOptions.push(ele.content);
        });
        element.options = finalOptions;
      } else {
        element.options = null;
      }
      return element;
    });

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}app/v1/survey/create`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        surveyName: name,
        startingMessageText: startingMessage,
        questions: quesData,
      },
    }).then((resp) => {
      //   console.log("Created Survey", resp);
      setSurveyId(resp.data._id);
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}app/v1/survey/start-bulk`,
        data: {
          data: data,
          surveyId: resp.data._id,
        },
      }).then((res) => {
        console.log("Sent", res);
        setIsVisible(true);
        toast.success("Survey Sent");
      });
    });
  };

  const fileUploadHandler = async (rawFile) => {
    const parseFile = (rawFile) => {
      return new Promise((resolve) => {
        Papa.parse(rawFile, {
          complete: (results) => {
            resolve(results.data);
          },
        });
      });
    };
    let parsedData = await parseFile(rawFile);
    setData(parsedData);
  };

  useEffect(() => {
    // console.log("Data", data);
    setString("[ Added ]");
  }, [data]);

  function downloadAnalytics() {
    axios
      .get(`${process.env.REACT_APP_API_URL}app/v1/survey/analytics`, {
        params: {
          surveyId: surveyId,
        },
      })
      .then((res) => {
        console.log("Analytics Res", res);
        const data = res.data;
        const fileName = "data";
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({ data, fileName, exportType });
      });
  }

  return (
    <div>
      <div className={classes.heading}>
        <b>Create New Survey</b>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "40px",
        }}
      >
        {/* Add basic details */}
        <div>
          <div className={classes.subHeading}>Enter Basic Details</div>
          <div className={classes.detail}>
            <div className={classes.left}>Survey Name</div>
            <div className={classes.right}>
              <TextField
                id="outlined-basic"
                label="Enter Survey Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>{" "}
          <br />
          <div className={classes.detail}>
            <div className={classes.left}>Phone Number</div>
            <div className={classes.right}>
              <TextField
                id="outlined-basic"
                label="Eg: 916350xx505"
                variant="outlined"
                value={number}
                disabled={data.length === 0 ? false : true}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>

            {data.length === 0 ? (
              <>
                &nbsp; &nbsp; &nbsp;{"OR"}
                <input
                  type="file"
                  id="actual-btn"
                  accept=".csv"
                  onChange={(e) => fileUploadHandler(e.target.files[0])}
                  hidden
                  // disabled={data.length === 0 ? false : true}
                />
                <label className={classes.upload} for="actual-btn">
                  Upload CSV
                </label>
              </>
            ) : null}
            <span style={{ marginLeft: "20px" }}>
              {data.length === 0
                ? "(Please add country code without '+' sign)"
                : string}
            </span>
          </div>{" "}
          <br />
          <div className={classes.detail}>
            <div className={classes.left}>What is the survey for?</div>
            <div className={classes.right}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Objective"
                variant="outlined"
                value={startingMessage}
                onChange={(e) => setStartingMessage(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Add Questions details */}

        <div>
          <div className={classes.subHeading}>Enter Questions</div>
        </div>
        {questions.map((ques) => (
          <div className={classes.questionBlock}>
            <QuestionBlock
              questions={questions}
              question={ques}
              setQuestions={setQuestions}
            />
          </div>
        ))}

        <button className={classes.button} onClick={() => addQuestion()}>
          + Add New Question
        </button>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className={classes.button2} onClick={() => sendSurvey()}>
            Send Survey
          </div>

          <div
            className={classes.button2}
            onClick={() => downloadAnalytics()}
            style={{ visibility: isVisible ? "visible" : "hidden" }}
          >
            Download Analytics
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;
