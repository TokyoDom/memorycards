import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import firebase from "./firebase/firebase";
import "firebase/auth";
import SignUpModal from "./components/SignUpModal";
import ResetPassModal from "./components/ResetPassModal";
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
      signUpModal: false,
      loggedIn: props.loggedIn
    };
  }

  handleEmail = value => {
    this.setState({ email: value });
  };

  handlePass = value => {
    this.setState({ pass: value });
  };

  handleLogin = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.pass);
    } catch (err) {
      console.log(err);
      this.setState({
        error: err.message,
        pass: "",
        loading: false
      });
    }
  };

  handleEnter = code => {
    if (code === 13) {
      this.handleLogin();
    }
  };

  renderRedirect = () => {
    if (this.props.loggedIn === true) {
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
          <div>
            <Card>
              <form onKeyDown={e => this.handleEnter(e.keyCode)}>
                <CardContent>
                  <Typography>Memory Cards</Typography>
                  <TextField
                    autoFocus
                    type="email"
                    margin="dense"
                    label="E-Mail"
                    variant="outlined"
                    fullWidth
                    value={this.state.email}
                    onChange={e => this.handleEmail(e.target.value)}
                  />
                  <TextField
                    type="password"
                    margin="dense"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    value={this.state.pass}
                    onChange={e => this.handlePass(e.target.value)}
                  />
                  <Typography variant="caption">{this.state.error}</Typography>
                </CardContent>
                <CardActions style={{ flexDirection: "row-reverse" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={e => this.handleLogin()}
                  >
                    Login
                  </Button>
                </CardActions>
              </form>
            </Card>
            <div>
              Don't have an account?
              <Button
                variant="text"
                color="primary"
                onClick={e => this.setState({ signUpModal: true })}
              >
                Sign Up
              </Button>
            </div>
            <div>
              Forgot password?
              <Button
                variant="text"
                color="primary"
                onClick={e => this.setState({ resetModal: true })}
              >
                Reset
              </Button>
            </div>
            <SignUpModal
              isOpen={this.state.signUpModal}
              closeModal={close => this.setState({ signUpModal: close })}
              loggedIn={this.props.loggedIn}
            />
            <ResetPassModal
              isOpen={this.state.resetModal}
              closeModal={close => this.setState({ resetModal: close })}
            />
          </div>
        )}
      </section>
    );
  }
}

export default Login;
