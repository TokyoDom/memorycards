import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Login extends Component {
  state = {
    user: null,
    pass: null
  };

  handleUser = value => {
    this.setState({ user: value });
  };

  handlePass = value => {
    this.setState({ pass: value });
  };

  handleClick = (e) => {
    console.log(this.state);
  };

  render() {
    return (
      <section className="login-page">
        <Card>
          <form>
            <CardContent>
              <Typography>Memory Cards</Typography>
              <TextField
                autoFocus
                type="email"
                margin="dense"
                label="E-Mail"
                variant="outlined"
                fullWidth
                onChange={e => this.handleUser(e.target.value)}
              />
              <TextField
                type="password"
                margin="dense"
                label="Password"
                variant="outlined"
                fullWidth
                onChange={e => this.handlePass(e.target.value)}
              />
            </CardContent>
            <CardActions style={{ flexDirection: "row-reverse" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={e => this.handleClick(e)}
              >
                Login
              </Button>
            </CardActions>
          </form>
        </Card>
      </section>
    );
  }
}

export default Login;
