import React, { useState } from "react";
import { TextField } from "@mui/material";
import classes from "./CreateSurvey.module.css";
import QuestionBlock from "../components/QuestionBlock";
import axios from "axios";

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

  const addQuestion = () => {
    setQuestions((current) => [
      ...current,
      {
        number: questions.length + 1,
        question: "",
        type: "",
        options: [],
      },
    ]);
    console.log(questions);
  };

  const sendSurvey = () => {
    axios({
      method: "post",
      url: "https://webhook.freshyy.co/app/v1/survey/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        surveyName: name,
        startingMessageText: startingMessage,
        questions: questions,
      },
    }).then((resp) => {
      //   console.log("Created Survey", resp);
      axios({
        method: "post",
        url: "https://webhook.freshyy.co/app/v1/survey/start",
        data: {
          destination: number,
          surveyId: resp.data._id,
        },
      }).then((res) => {
        console.log("Sent", res);
      });
    });
  };

  return (
    <div>
      <div className={classes.heading}>
        <b>Create New Survey</b>
      </div>
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
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>{" "}
          <span style={{ marginLeft: "20px" }}>(Add in bulk coming soon!)</span>
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
        + Add Question
      </button>

      <div className={classes.button2} onClick={() => sendSurvey()}>
        Send Survey
      </div>
    </div>
  );
};

export default CreateSurvey;
