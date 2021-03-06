import React, { Component } from "react";
import firebase from "./firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Creation from "./Creation";
import Practice from "./Practice";
import Profile from "./Profile";
import Login from "./Login";
import Navbar from "./components/Navbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0e68cf"
    },
    secondary: {
      main: "#3d3d3d"
    }
  }
});

class App extends Component {
  state = {
    loading: false,
    loggedIn: "pending",
    userInfo: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.unsub = firebase.auth().onAuthStateChanged(async user => {
      this.setState({ loading: true });
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot(doc => {
            this.setState({
              loggedIn: true,
              signedOut: false,
              userInfo: doc.data(),
              email: user.email,
              loading: false
            });
          });
      } else {
        if (this.state.userInfo !== "") {
          this.setState({
            signedOut: true,
            userInfo: ""
          });
        }
        this.setState({
          loggedIn: false,
          loading: false
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    return (
      <HashRouter basename="/">
        <ThemeProvider theme={theme}>
          {!this.state.loading ? (
            <div className="App">
              <Navbar
                loggedIn={this.state.loggedIn}
                userInfo={this.state.userInfo}
                signedOut={this.state.signedOut}
              />

              <Switch>
                <Route
                  path="/login"
                  render={props => (
                    <Login
                      {...props}
                      loggedIn={this.state.loggedIn}
                      userInfo={this.state.userInfo}
                      key={window.location.pathname}
                    />
                  )}
                />
                <Route
                  path="/create"
                  render={props => (
                    <Creation
                      {...props}
                      loggedIn={this.state.loggedIn}
                      userInfo={this.state.userInfo}
                      key={window.location.pathname}
                    />
                  )}
                />
                <Route
                  path="/practice"
                  render={props => (
                    <Practice
                      {...props}
                      loggedIn={this.state.loggedIn}
                      userInfo={this.state.userInfo}
                      key={window.location.pathname}
                    />
                  )}
                />
                <Route
                  path="/settings"
                  render={props => (
                    <Profile
                      {...props}
                      loggedIn={this.state.loggedIn}
                      userInfo={this.state.userInfo}
                      key={window.location.pathname}
                    />
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home
                      {...props}
                      loggedIn={this.state.loggedIn}
                      userInfo={this.state.userInfo}
                      key={window.location.pathname}
                    />
                  )}
                />
                <Route path="/">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          ) : (
            <AppBar position="sticky" style={{ opacity: 0.75 }}>
              <Toolbar></Toolbar>
            </AppBar>
          )}
        </ThemeProvider>
      </HashRouter>
    );
  }
}

export default App;
