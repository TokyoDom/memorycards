import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import CachedIcon from "@material-ui/icons/Cached";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CreateIcon from "@material-ui/icons/Create";

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
    padding: 12
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

function LoggedOut() {
  let classes = useStyles();
  const [flip, setFlip] = useState(false);

  return (
    <section className="home-logged-out">
      <h3>Welcome to Memory Cards</h3>
      <Card
        className={`${classes.root} ${flip ? "show-answer" : ""}`}
        elevation={3}
      >
        <IconButton className={classes.flip} onClick={e => setFlip(!flip)}>
          <CachedIcon />
        </IconButton>
        <CardContent className={classes.text} onClick={e => setFlip(!flip)}>
          <Typography className={classes.index}>1/1</Typography>
          <CardContent className="inner">
            <Typography className="front" variant="body1">
              What is Memory Cards?
            </Typography>
            <Typography className="back" variant="body1">
              A place to make simple online flashcards to study with. Click
              create set to start or login if you already have an account!
            </Typography>
          </CardContent>
        </CardContent>
        <CardActions className={classes.arrows}>
          <Button>
            <ArrowLeftIcon />
          </Button>
          <Button>
            <ArrowRightIcon />
          </Button>
        </CardActions>
      </Card>
      <ButtonGroup style={{ marginTop: 6 }}>
        <Button
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
        >
          <CreateIcon />
          Create Set
        </Button>
        <Button component={Link} to="/login" variant="contained">Login</Button>
      </ButtonGroup>
    </section>
  );
}

export default LoggedOut;
