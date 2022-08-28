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
  const [ques, setQues] = useState("");

  useEffect(() => {
    const newState = props.questions.map((obj) => {
      if (obj.number === props.question.number) {
        return { ...obj, options: options, type: quesType };
      }
      return obj;
    });
    props.setQuestions(newState);
  }, []);

  const addOption = () => {
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
    props.setQuestions(newState);
  };

  const handleChange = (e, number) => {
    const newState = options.map((obj) => {
      if (obj.optionNumber === number) {
        return { ...obj, content: e.target.value };
      }
      return obj;
    });
    setOptions(newState);

    const newState2 = props.questions.map((obj) => {
      if (obj.number === props.question.number) {
        return { ...obj, options: options };
      }
      return obj;
    });
    props.setQuestions(newState2);
  };

  const handleTypeChange = (e) => {
    setQuesType(e.target.value);
    const newState = props.questions.map((obj) => {
      if (obj.number === props.question.number) {
        return { ...obj, type: quesType };
      }
      return obj;
    });
    props.setQuestions(newState);
  };

  const handleQuesChange = (e) => {
    setQues(e.target.value);
    const newState = props.questions.map((obj) => {
      if (obj.number === props.question.number) {
        return { ...obj, question: ques };
      }
      return obj;
    });
    props.setQuestions(newState);
  };

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
            onChange={(e) => handleQuesChange(e)}
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
              onChange={(e) => handleTypeChange(e)}
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
