import React, { Component } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import firebase from "./firebase/firebase";
import "firebase/firestore";
import "firebase/auth";
import ResetPassModal from "./components/ResetPassModal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

const styles = {
  profile: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(150px, 1fr))",
    gridRowGap: 16
  },
  colorRoot: {
    display: "flex",
    flexWrap: "wrap"
  },
  color: {
    width: 50,
    height: 50,
    margin: 4,
    cursor: "pointer"
  }
};

const colors = ["#fff", "#ffe08a", "#dfffc7", "#c7ffff", "#ddcfff", "#555555"];

class Profile extends Component {
  constructor(props) {
    super(props);
    const { name, styles, uid } = _.cloneDeep(props.userInfo);
    this.state = {
      unsaved: false,
      resetModal: false,
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
        alert(err.message);
      }
    }
  };

  setColor = e => {
    let styles = this.state.styles;
    styles.backgroundColor = e.target.id;
    if (e.target.id === "#555555") {
      styles.color = "#fff";
    } else {
      styles.color = "#000000";
    }
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
        <Card>
          <CardContent style={styles.profile}>
            <p>Username</p>
            <TextField
              type="text"
              variant="outlined"
              margin="dense"
              value={this.state.name}
              onChange={e =>
                this.setState({ name: e.target.value, unsaved: true })
              }
            />
            <p>Flashcard Color</p>
            <div className="color-picker" style={styles.colorRoot}>
              {this.renderColors()}
            </div>
            <p>Password</p>
            <Button
              style={{ width: 100 }}
              variant="outlined"
              color="secondary"
              onClick={e => this.setState({ resetModal: true })}
            >
              Reset
            </Button>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          color="primary"
          disabled={this.state.unsaved ? false : true}
          onClick={e => this.saveChanges()}
        >
          Save Changes
        </Button>
        <ResetPassModal
          isOpen={this.state.resetModal}
          closeModal={close => this.setState({ resetModal: false })}
        />
      </section>
    );
  }
}

export default Profile;
