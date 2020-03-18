import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    height: 250,
    border: "1px solid black",
    cursor: "pointer"
  },
  index: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 3,
    padding: "2px 4px"
  },
  flip: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 3
  },
  arrows: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    marginLeft: -75,
    zIndex: 3
  },
  text: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

//Set is only prop from state, card handles index
function Flashcard(props) {
  let classes = useStyles();
  const [flip, setFlip] = useState(false);
  const [index, setIndex] = useState(0);

  const frontText = set => {
    if (set.length !== 0) {
      if (index >= set.length) {
        setIndex(set.length - 1);
      }
      const card = set[index];
      return card === undefined ? null : card.front;
    }
    return null;
  };

  const backText = set => {
    if (set.length !== 0) {
      if (index >= set.length) {
        setIndex(set.length - 1);
      }
      const card = set[index];
      return card === undefined ? null : card.back;
    }
    return null;
  };

  return (
    <Card
      style={props.cardStyles}
      className={`${classes.root} ${flip ? "show-answer" : ""}`}
      elevation={3}
    >
      <IconButton
        size="small"
        className={classes.flip}
        onClick={e => setFlip(!flip)}
      >
        <CachedIcon />
      </IconButton>
      <CardContent className={classes.text} onClick={e => setFlip(!flip)}>
        <Typography
          id="index"
          className={classes.index}
          style={props.indexStyles}
        >
          {props.set.length === 0 ? 0 : index + 1}/{props.set.length}
        </Typography>
        <CardContent className="inner">
          <Typography className="front" variant="body1">
            {frontText(props.set)}
          </Typography>
          <Typography className="back" variant="body1">
            {backText(props.set)}
          </Typography>
        </CardContent>
      </CardContent>
      <CardActions className={classes.arrows} style={props.arrowStyles}>
        <Button
          onClick={e => {
            if (index > 0) {
              setFlip(false);
              setTimeout(() => setIndex(index - 1), 100);
            }
          }}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          onClick={e => {
            if (index < props.set.length - 1) {
              setFlip(false);
              setTimeout(() => setIndex(index + 1), 100);
            }
          }}
        >
          <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Flashcard;