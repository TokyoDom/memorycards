import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import firebase from "./firebase/firebase";
import "firebase/firestore";
import "firebase/auth";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const styles = {
  colorRoot: {
    display: "flex",
    flexWrap: "wrap",
    padding: 8,
    backgroundColor: "#fff",
    width: 200,
    borderRadius: 5
  },
  color: {
    width: 50,
    height: 50,
    margin: 4,
    cursor: "pointer"
  }
};

const colors = ["fff", "#ffe08a", "#dfffc7", "#c7ffff", "#ddcfff", "#ffd4fa"];

class Profile extends Component {
  constructor(props) {
    super(props);
    const { name, styles, uid } = _.cloneDeep(props.userInfo);
    this.state = {
      unsaved: false,
      name,
      styles,
      uid
    };
  }

  saveChanges = async () => {
    if (this.state.unsaved) {
      try {
        const userInfo = firebase
          .firestore()
          .collection("users")
          .doc(this.state.uid);
        await userInfo.set(
          {
            name: this.state.name,
            styles: this.state.styles,
            uid: this.state.uid
          },
          { merge: true }
        );
        this.setState({ unsaved: false });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("no unsaved changes");
    }
  };

  resetPass = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(this.props.email);
    } catch (err) {
      console.log(err);
    }
  };

  setColor = e => {
    let styles = this.state.styles;
    styles.backgroundColor = e.target.id;
    this.setState({ unsaved: true, styles });
  };

  renderColors = () => {
    if (this.state.styles) {
      const activeColor = this.state.styles.backgroundColor;
      return colors.map(color => (
        <Paper
          key={color}
          variant="outlined"
          id={color}
          onClick={e => this.setColor(e)}
          style={{
            ...styles.color,
            backgroundColor: color,
            border: activeColor === color ? "3px solid black" : null
          }}
        />
      ));
    }
  };

  renderRedirect = () => {
    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <section className="profile-page">
        {this.renderRedirect()}
        <div className="color-picker" style={styles.colorRoot}>
          {this.renderColors()}
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={this.state.unsaved ? false : true}
          onClick={e => this.saveChanges()}
        >
          Save Changes
        </Button>
        <Button onClick={e => this.resetPass()}>Reset Password</Button>
      </section>
    );
  }
}

export default Profile;
