import React, { Component } from "react";
import Navbar from "./components/Navbar";
import firebase from "./firebase/firebase";
import "firebase/auth";
import "firebase/firestore";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";
import SingleCard from "./CreationViews/SingleCard";
import MultiCard from "./CreationViews/MultiCard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";

// const testSet = [
//   { front: "Card 1 Front", back: "Card 1 Back" },
//   { front: "Card 2 Front", back: "Card 2 Back" },
//   { front: "Card 3 Front", back: "Card 3 Back" },
//   { front: "Card 4 Front", back: "Card 4 Back" },
//   { front: "Card 5 Front", back: "Card 5 Back" },
//   { front: "Card 6 Front", back: "Card 6 Back" },
//   { front: "Card 7 Front", back: "Card 7 Back" },
//   { front: "Card 8 Front", back: "Card 8 Back" },
//   { front: "Card 9 Front", back: "Card 9 Back" },
//   { front: "Card 10 Front", back: "Card 10 Back" }
// ];

class Creation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userInfo: "",
      cardSets: [],
      setName: "",
      initialSet: [],
      set: [],
      modCard: { front: "", back: "", id: null },
      singView: true,
      saveModal: false
    };

    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  componentDidMount() {
    //get data from firestore
    this.setState({ loading: true });
    this.unsub = this.auth.onAuthStateChanged(async user => {
      if (user) {
        const userInfo = await this.db
          .collection("users")
          .doc(user.uid)
          .get();
        const cardSets = await this.db
          .collection("stacks")
          .where("uid", "==", user.uid)
          .get();
        this.setState({
          loggedIn: true,
          userInfo: userInfo.data(),
          cardSets: cardSets.docs.map(doc => doc.data()),
          verified: user.emailVerified,
          loading: false
        });
      } else {
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

  changeModCard = card => {
    this.setState({ modCard: card });
  };

  //Helper
  updateSet = set => {
    const newSet = set.map((card, i) => ({ ...card, id: i }));
    this.setState({ set: newSet });
  };

  //for modCard modal text
  setText = e => {
    if (e.target.id === "front") {
      this.setState({
        modCard: {
          front: e.target.value,
          back: this.state.modCard.back,
          id: this.state.modCard.id
        }
      });
    } else {
      this.setState({
        modCard: {
          front: this.state.modCard.front,
          back: e.target.value,
          id: this.state.modCard.id
        }
      });
    }
  };

  //for choosing set
  handleSetSelect = e => {
    const setName = e.target.value;
    if (setName !== "") {
      const set = this.state.cardSets.filter(set => set.name === setName)[0]
        .set;
      this.updateSet(set);
      this.setState({
        setName,
        singView: true,
        initialSet: set.map((card, i) => ({ ...card, id: i }))
      });
    } else {
      this.setState({ setName, singView: true, set: [] });
    }
  };

  //card set conditional
  renderCardSets = () => {
    if (this.state.cardSets.length > 0) {
      return (
        <FormControl>
          <InputLabel>Set</InputLabel>
          <Select
            native
            value={this.state.setName}
            onChange={e => this.handleSetSelect(e)}
          >
            <option value=""></option>
            {this.state.cardSets.map(set => (
              <option value={set.name} key={set.name}>
                {set.name}
              </option>
            ))}
          </Select>
        </FormControl>
      );
    }
  };

  //save new set to database (from modal)
  saveNewSet = async set => {
    set = set.map(card => ({ front: card.front, back: card.back }));
    try {
      await this.db.collection("stacks").add({
        name: this.state.setName,
        uid: this.state.userInfo.uid,
        set
      });
      this.setState({
        cardSets: [
          ...this.state.cardSets,
          { name: this.state.setName, set, uid: this.state.userInfo.uid }
        ]
      });
      console.log("set added");
    } catch (err) {
      console.log(err);
    }
  };

  //save existing set to database
  saveSet = async set => {
    set = set.map(card => ({ front: card.front, back: card.back }));
    let notSame = false;
    const initSet = this.state.initialSet;
    if (initSet.length !== set.length) {
      notSame = true;
    } else {
      set.forEach((card, i) => {
        if (card.front !== initSet[i].front || card.back !== initSet[i].back) {
          notSame = true;
        }
      });
    }
    if (notSame) {
      if (this.state.setName !== "") {
        try {
          const setQuery = await this.db
            .collection("stacks")
            .where("uid", "==", this.state.userInfo.uid)
            .where("name", "==", this.state.setName)
            .get();
          const fbSetName = setQuery.docs[0].id;
          const dataSet = this.db.collection("stacks").doc(fbSetName);
          await dataSet.update({ set });
          this.setState({ initialSet: set });
          console.log("set saved");
        } catch (err) {
          console.log(err);
        }
      } else {
        this.setState({ saveModal: true });
      }
    }
  };

  //del set from database
  delSet = async () => {
    const setName = this.state.setName;
    if (setName !== "") {
      try {
        const setQuery = await this.db
          .collection("stacks")
          .where("uid", "==", this.state.userInfo.uid)
          .where("name", "==", setName)
          .get();
        const fbSetName = setQuery.docs[0].id;
        await this.db
          .collection("stacks")
          .doc(fbSetName)
          .delete();
        this.setState({
          set: [],
          setName: "",
          initialSet: [],
          cardSets: this.state.cardSets.filter(set => set.name !== setName)
        });
        console.log("set deleted");
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    return (
      <DndProvider backend={Backend} options={HTML5toTouch}>
        {this.state.loggedIn ? <Navbar userInfo={this.state.userInfo} /> : null}
        <section
          className="creation-page"
          style={{ display: this.state.loading ? "none" : null }}
        >
          <div className="creation-page-settings">
            {this.renderCardSets()}
            <ButtonGroup style={{ margin: 12 }}>
              <Button
                variant={this.state.singView ? "contained" : null}
                color={this.state.singView ? "primary" : null}
                onClick={e => this.setState({ singView: true })}
              >
                <CheckBoxOutlineBlankIcon />
              </Button>
              <Button
                variant={this.state.singView ? null : "contained"}
                color={this.state.singView ? null : "primary"}
                onClick={e => this.setState({ singView: false })}
              >
                <BorderAllIcon />
              </Button>
            </ButtonGroup>
          </div>
          {this.state.singView ? (
            <SingleCard
              set={this.state.set}
              setName={this.state.setName}
              modCard={this.state.modCard}
              updateSet={this.updateSet}
              saveSet={this.saveSet}
              delSet={this.delSet}
              changeModCard={this.changeModCard}
              setText={this.setText}
            />
          ) : (
            <MultiCard
              set={this.state.set}
              modCard={this.state.modCard}
              updateSet={this.updateSet}
              saveSet={this.saveSet}
              delSet={this.delSet}
              changeModCard={this.changeModCard}
              setText={this.setText}
            />
          )}
          <Dialog
            open={this.state.saveModal}
            onClose={() => this.setState({ saveModal: false, setName: "" })}
          >
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Set Name"
                type="text"
                fullWidth
                value={this.state.setName}
                onChange={e => this.setState({ setName: e.target.value })}
              ></TextField>
              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={e => {
                    if (this.state.setName !== "") {
                      let alreadyExists = false;
                      this.state.cardSets.forEach(set => {
                        if (set.name === this.state.setName)
                          alreadyExists = true;
                      });
                      if (!alreadyExists) {
                        this.saveNewSet(this.state.set);
                        this.setState({ saveModal: false });
                      } else {
                        console.log("name already exists");
                      }
                    }
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </section>
      </DndProvider>
    );
  }
}

export default Creation;
