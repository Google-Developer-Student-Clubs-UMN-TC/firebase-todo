import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
    getFirestore,
    collection,
    connectFirestoreEmulator,
    addDoc
} from "firebase/firestore";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.db = getFirestore(props.firebase);
        this.state = {
            tasks: null,
            newText: "",
            checked: null,
            currIndex: 0,
            triggerEditAlert: false,
            triggerAddAlert: false
        }
        if(this.state.tasks!==null) this.state.checked = Array(this.state.tasks.length).fill(false);
        else {
            console.log("I am here");
            this.state.tasks = [];
            this.state.checked = Array(this.state.tasks.length).fill(false);
        }
        this.state.checked = Array(this.state.tasks.length).fill(false);
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
            connectFirestoreEmulator(this.db, "http://localhost:8080");
    }
    
    addTask() {
        try {
            const docRef = addDoc(collection(this.db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815,
                special: this.state.newText
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    handleAdd = () => {
        this.setState({
            triggerAddAlert: true,
        });
    }

    handleCheck(index) {
        const newChecked = [...this.state.checked];
        if (this.state.checked[index]) {
            newChecked[index] = false;
            this.setState({ checked: newChecked });
        } else {
            newChecked[index] = true;
            this.setState({ checked: newChecked });
        }
    };

    handleTaskEdit(index) {
        // open popup that has an accept and cancel button to accept new value for the specific task
        // set the task text to whatever value the user inputs
        this.setState({
            triggerEditAlert: true,
            currIndex: index
        });
    }

    handleTextFieldChange = event => {
        this.setState({ newText: event.target.value });
    }

    handleAlertEditClose = () => {
        const temp = this.state.tasks;
        temp[this.state.currIndex] = this.state.newText;
        this.setState({
            tasks: temp,
            triggerEditAlert: false
        });
    };

    render() {
        return (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Dialog open={this.state.triggerEditAlert} onClose={this.handleAlertEditClose}>
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit your task description
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={this.handleTextFieldChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAlertEditClose}>Submit</Button>
                    </DialogActions>
                </Dialog>
                {this.state.tasks.map((value, index) => {
                    const labelId = `checkbox-list-label-${index}`;
                    return (
                        <ListItem
                            key={value}
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments" onClick={() => this.handleTaskEdit(index)}>
                                    <CommentIcon />
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={this.state.checked[index]}
                                        onChange={() => this.handleCheck(index)}
                                        disableRipple
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${value}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                <ListItemButton onClick={this.handleAdd}>
                    <ListItemText
                        sx={{ my: 0 }}
                        primary="Firebash"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Dialog open={this.state.triggerAddAlert} onClose={this.addTask}>
                        <DialogTitle>Add Task</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add your task description
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                                variant="standard"
                                onChange={this.handleTextFieldChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.addTask}>Submit</Button>
                        </DialogActions>
                    </Dialog>
                </ListItemButton>
            </List>
        );
    }
}

export default Todo;