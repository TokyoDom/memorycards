import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./firebase/firebase";
import "firebase/auth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: null,
      pass: null,
      error: null,
      loggedIn: props.loggedIn
    };
  };

  handleEmail = value => {
    this.setState({ email: value });
  };

  handlePass = value => {
    this.setState({ pass: value });
  };

  handleClick = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.pass);
    } catch (err) {
      console.log(err);
      this.setState({ error: err.message });
    }
  };

  renderRedirect = () => {
    if(this.props.loggedIn) {
    return <Redirect to="/" />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <section className="login-page">
        {this.renderRedirect()}
        {this.state.loading ? null : (
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
                  onChange={e => this.handleEmail(e.target.value)}
                />
                <TextField
                  type="password"
                  margin="dense"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  onChange={e => this.handlePass(e.target.value)}
                />
                <Typography variant="caption">{this.state.error}</Typography>
              </CardContent>
              <CardActions style={{ flexDirection: "row-reverse" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => this.handleClick()}
                >
                  Login
                </Button>
              </CardActions>
            </form>
          </Card>
        )}
      </section>
    );
  }
}

export default Login;
