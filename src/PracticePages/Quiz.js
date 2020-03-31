import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import _ from "lodash";
import Flashcard from "../components/Flashcard";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Switch from "@material-ui/core/Switch";
import CheckIcon from "@material-ui/icons/Check";
import Button from "@material-ui/core/Button";

function Quiz({ cardSets, userInfo }) {
  const [set, changeSet] = useState([]);
  const [setName, changeSetName] = useState("");

  const [answer, setAnswer] = useState("");
  const [report, setReport] = useState([]);

  const [isShuffled, setShuffle] = useState(true);
  const [shufSet, changeShufSet] = useState([]);

  const location = useLocation();
  useEffect(() => {
    if(location.state) {
      const set = location.state.set.set;
      changeSet(set);
      changeShufSet(_.shuffle(set));
      changeSetName(location.state.set.name);
    }
  }, [location.state])

  const saveAnswer = () => {
    if (setName !== "" && answer !== "") {
      //get data
      const front = document.querySelector(".front").textContent;
      const back = document.querySelector(".back").textContent;
      const rightAnswer = back.replace(/\s+/g, "").toLowerCase();
      const userAnswer = answer.replace(/\s+/g, "").toLowerCase();

      //make object for report
      const qna = {
        front,
        back,
        userAnswer,
        correct: rightAnswer === userAnswer ? true : false
      };

      const newReport = [...report, qna];

      setReport(newReport);
      setAnswer("");

      document.querySelector(".go-right").click();
    }
  };

  const handleSetSelect = e => {
    const setName = e.target.value;
    if (setName !== "") {
      const newSet = cardSets.filter(set => set.name === setName)[0].set;

      changeSet(newSet);
      changeShufSet(_.shuffle(newSet));
      changeSetName(setName);
      setReport([]);
    } else {
      reset();
    }
  };

  //helper
  const reset = () => {
    changeSet([]);
    changeShufSet([]);
    changeSetName("");
    setReport([]);
  };

  const renderCardSets = () => {
    if (cardSets.length > 0) {
      return (
        <FormControl>
          <InputLabel>Sets</InputLabel>
          <Select native value={setName} onChange={e => handleSetSelect(e)}>
            <option value=""></option>
            {cardSets.map(set => (
              <option value={set.name} key={set.name}>
                {set.name}
              </option>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  const renderReport = () => {
    const score = Math.round(
      (report.filter(qna => qna.correct).length / report.length) * 100
    );
    return (
      <div>
        <div>Score: {score}%</div>
        {report.map((qna, i) => (
          <Card variant="outlined" key={i}>
            <CardContent>
              <Typography variant="h5">Question: {qna.front}</Typography>
              <Typography variant="body2">Answer: {qna.back}</Typography>
              <Typography variant="body2">
                Your Answer: {qna.userAnswer}
              </Typography>
              <Typography style={{ color: qna.correct ? "green" : "red" }}>
                {qna.correct ? "Correct!" : "Incorrect."}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Button onClick={e => reset()} color="primary">
          Close Report
        </Button>
      </div>
    );
  };

  return (
    <section className="practice-quiz">
      {report.length === set.length && set.length > 0 ? (
        renderReport()
      ) : (
        <div className="practice-quiz">
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {renderCardSets()}
            {report.length <= 0 ? <FormControlLabel
              control={
                <Switch
                  checked={isShuffled}
                  onChange={e => {
                    changeShufSet(_.shuffle(set));
                    setShuffle(!isShuffled);
                  }}
                  color="primary"
                />
              }
              label="Shuffle"
              style={{ margin: 0 }}
            /> : null}
          </div>
          <Flashcard
            set={isShuffled ? shufSet : set}
            setName={setName}
            cardStyles={{
              ...userInfo.styles,
              cursor: "default"
            }}
            noFlip={true}
            arrowStyles={{display: 'none'}}
          />
          <Paper style={{ padding: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              label="Answer"
              size="small"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => {
                if (e.keyCode === 13) saveAnswer();
              }}
            />
            <IconButton
              color="primary"
              style={{ padding: 6 }}
              onClick={e => saveAnswer()}
            >
              <CheckIcon />
            </IconButton>
          </Paper>
        </div>
      )}
    </section>
  );
}

export default Quiz;
