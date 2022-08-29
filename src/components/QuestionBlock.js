import React, { useState, useEffect } from "react";
import classes from "./QuestionBlock.module.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  FormHelperText,
} from "@mui/material";
const QuestionBlock = (props) => {
  const [quesType, setQuesType] = useState("single-choice");
  const [ques, setQues] = useState("");
  const [options, setOptions] = useState([
    {
      optionNumber: 1,
      content: "",
    },
    {
      optionNumber: 2,
      content: "",
    },
  ]);

  useEffect(() => {
    async function update() {
      const newState = props.questions.map((obj) => {
        if (obj.number === props.question.number) {
          return { ...obj, options: options, type: quesType };
        }
        return obj;
      });
      await props.setQuestions(newState);
    }
    update();
  }, []);

  const addOption = async () => {
    setOptions((current) => [
      ...current,
      {
        optionNumber: options.length + 1,
        content: "",
      },
    ]);

    const newState = props.questions.map((obj) => {
      if (obj.number === props.question.number) {
        return { ...obj, options: options };
      }
      return obj;
    });
    await props.setQuestions(newState);
  };

  function handleChange(e, number) {
    const newState = options.map((obj) => {
      if (obj.optionNumber === number) {
        return { ...obj, content: e.target.value };
      }
      return obj;
    });
    setOptions(newState);
  }

  //updating question type in parent async
  useEffect(() => {
    async function update() {
      var newState = null;
      newState = props.questions.map((obj) => {
        if (obj.number === props.question.number) {
          return { ...obj, type: quesType };
        }
        return obj;
      });
      await props.setQuestions(newState);
    }
    update();
  }, [quesType]);

  //updating question content in parent async
  useEffect(() => {
    async function update() {
      const newState = props.questions.map((obj) => {
        if (obj.number === props.question.number) {
          return { ...obj, question: ques };
        }
        return obj;
      });
      await props.setQuestions(newState);
    }
    update();
  }, [ques]);

  //updating options in parent async
  useEffect(() => {
    async function update() {
      const newState = props.questions.map((obj) => {
        if (obj.number === props.question.number) {
          return { ...obj, options: options };
        }
        return obj;
      });
      await props.setQuestions(newState);
    }
    update();
  }, [options]);

  return (
    <div className={classes.box}>
      <div className={classes.header}>
        <span>Ques</span>
        <div className={classes.input}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Enter the question here"
            variant="outlined"
            value={ques}
            onChange={(e) => setQues(e.target.value)}
          />
        </div>
        <div className={classes.dropdown}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quesType}
              label="Type"
              onChange={(e) => setQuesType(e.target.value)}
            >
              <MenuItem value="single-choice">Single Choice</MenuItem>
              <MenuItem value="short-answer">Short Answer</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {quesType === "single-choice" ? (
        <>
          <div className={classes.options}>
            {options.map((option) => (
              <div className={classes.option}>
                <div className={classes.number}>
                  {`Press ${option.optionNumber}`}
                </div>
                <div className={classes.input}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Enter option"
                    variant="outlined"
                    value={option.content}
                    onChange={(e) => handleChange(e, option.optionNumber)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className={classes.button} onClick={() => addOption()}>
            + Add Option
          </button>
        </>
      ) : (
        <div style={{ marginTop: "15px", marginLeft: "10px" }}>
          <FormControl disabled variant="standard">
            <InputLabel htmlFor="component-disabled">Answer</InputLabel>
            <Input id="component-disabled" />
            <FormHelperText>
              User Shall Respond to this question with a short answer
            </FormHelperText>
          </FormControl>
        </div>
      )}
    </div>
  );
};

export default QuestionBlock;
