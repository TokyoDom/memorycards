import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const cardStyles = {
  margin: 8,
  cursor: "pointer",
  textDecoration: "none"
};

function PracticeHome() {
  return (
    <section className="practice-page">
      <Card component={Link} to={"/practice/standard"} style={cardStyles}>
        <CardContent>
          <Typography gutterBottom variant="h3" color="primary">
            Standard
          </Typography>
          <Typography gutterBottom variant="body1">
            Just click and flip! The standard way to use Flashcards.
          </Typography>
        </CardContent>
      </Card>
      <Card component={Link} to={"/practice/typing"} style={cardStyles}>
        <CardContent>
          <Typography gutterBottom variant="h3" color="primary">
            Typing
          </Typography>
          <Typography gutterBottom variant="body1">
            Type the answer instead of flipping.
          </Typography>
        </CardContent>
      </Card>
      <Card component={Link} to={"/practice/quiz"} style={cardStyles}>
        <CardContent>
          <Typography gutterBottom variant="h3" color="primary">
            Quiz
          </Typography>
          <Typography gutterBottom variant="body1">
            Test your knowledge!
          </Typography>
        </CardContent>
      </Card>
    </section>
  );
}

export default PracticeHome;
