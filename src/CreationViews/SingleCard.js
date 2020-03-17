import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Flashcard from "../components/Flashcard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  btnGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 6
  }
}));

function SingleCard (props) {
  const classes = useStyles();
  const [addModal, addModalOpen] = useState(false);
  const [editModal, editModalOpen] = useState(false);
  //const [delSetModal, delSetModalOpen] = useState(false);

    return (
      <section className="single-card-view">
        <Flashcard set={props.set}/>
        <div>
        <ButtonGroup className={classes.btnGroup}>
          <Button onClick={e => addModalOpen(true)}>
            <AddIcon /> Add New Card
          </Button>
          <Button onClick={e => {
            if(props.set.length > 0) {
              props.changeModCard(props.set[props.getIndex()]);
              editModalOpen(true);
            }
          }}>
            <CreateIcon /> Edit Card
          </Button>
          <Button onClick={e => props.delCard()}>
            <DeleteIcon /> Delete Card
          </Button>
        </ButtonGroup>
        </div>
        <div>
        <ButtonGroup className={classes.btnGroup}>
          <Button variant="contained" color="primary">
            <SaveAltIcon /> Save Set
          </Button>
          <Button variant="contained" color="secondary">
            <DeleteForeverIcon /> Delete Set
          </Button>
        </ButtonGroup>
        </div>
        {/* Add Modal */}
        <Dialog open={addModal} onClose={e => addModalOpen(false)}>
          <DialogTitle>New Card</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="front"
              type="text"
              label="Front"
              fullWidth
              onChange={e => props.setText(e)}
            />
            <TextField
              margin="dense"
              id="back"
              type="text"
              label="Back"
              fullWidth
              onChange={e => props.setText(e)}
            />
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={e => {
                  props.addNewCard();
                  addModalOpen(false);
                  }}
              >
                Add
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        {/* Edit Modal */}
        <Dialog open={editModal} onClose={e => editModalOpen(false)}>
          <DialogTitle>Edit Card</DialogTitle>
          <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="front"
              type="text"
              label="Front"
              fullWidth
              value={editModal ? props.modCard.front : ''}
              onChange={e => props.setText(e)}
            />
            <TextField
              margin="dense"
              id="back"
              type="text"
              label="Back"
              fullWidth
              value={editModal ? props.modCard.back : ''}
              onChange={e => props.setText(e)}
            /> 
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={e => {
                  props.editCard();
                  editModalOpen(false);
                  }}
              >
                Change
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </section>
    );
}

export default SingleCard;