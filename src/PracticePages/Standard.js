import React, { useState } from "react";
import _ from "lodash";
import Flashcard from "../components/Flashcard";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

function Standard({ cardSets, userInfo }) {
  const [set, changeSet] = useState([]);
  const [setName, changeSetName] = useState("");
  const [isShuffled, setShuffle] = useState(true);

  const handleSetSelect = e => {
    const setName = e.target.value;
    if (setName !== "") {
      const newSet = cardSets.filter(set => set.name === setName)[0].set;

      changeSet(newSet);
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
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        {renderCardSets()}
        <FormControlLabel
          control={
            <Switch
              checked={isShuffled}
              onChange={e => setShuffle(!isShuffled)}
              color="primary"
            />
          }
          label="Shuffle"
          style={{ margin: 0 }}
        />
      </div>
      <Flashcard
        set={isShuffled ? _.shuffle(set) : set}
        setName={setName}
        cardStyles={userInfo.styles}
      />
    </section>
  );
}

export default Standard;
