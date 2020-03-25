import React, { useState } from "react";
import _ from "lodash";
import Flashcard from "../components/Flashcard";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import CheckIcon from "@material-ui/icons/Check";

function Typing({ cardSets, userInfo }) {
  const [ansCount, setCount] = useState(0);
  const [set, changeSet] = useState([]);
  const [setName, changeSetName] = useState("");
  const [answer, setAnswer] = useState("");

  const checkAnswer = () => {
    if (setName !== "" && answer !== "") {
      const back = document.querySelector(".back").textContent;
      const rightAnswer = back.replace(/\s+/g, "").toLowerCase();
      const userAnswer = answer.replace(/\s+/g, "").toLowerCase();

      if (rightAnswer === userAnswer) {
        console.log("right answer");
        document.querySelector('.go-right').click();
      } else {
        setCount(ansCount + 1);
        console.log("wrong answer");
        console.log([userAnswer, rightAnswer]);
      }
    }
  };

  const nextQuestion = () => {
    setCount(0);
    setAnswer("");
  }

  const handleSetSelect = e => {
    const setName = e.target.value;
    if (setName !== "") {
      let newSet = cardSets.filter(set => set.name === setName)[0].set;

      changeSet(_.shuffle(newSet));
      changeSetName(setName);
    } else {
      changeSet([]);
      changeSetName("");
    }
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

  return (
    <section className="practice-standard">
      {renderCardSets()}
      <Flashcard
        set={set} //use ternary here for shuffle?
        setName={setName}
        cardStyles={{
          ...userInfo.styles,
          cursor: ansCount < 1 ? "default" : "pointer"
        }}
        flipCardStyles={{ cursor: ansCount < 1 ? "default" : "pointer" }}
        noFlip={ansCount < 1 ? true : false}
        nextQuestion={nextQuestion}
      />
      <Paper style={{ padding: 4 }}>
        <TextField
          error={ansCount > 0 ? true : false}
          helperText={ansCount < 1 ? null : "Click card to show answer"}
          type="text"
          variant="outlined"
          label="Answer"
          size="small"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          onKeyDown={e => {if(e.keyCode === 13) checkAnswer()}}
        />
        <IconButton
          color="primary"
          style={{ padding: 6 }}
          onClick={e => checkAnswer()}
        >
          <CheckIcon />
        </IconButton>
      </Paper>
    </section>
  );
}

export default Typing;
