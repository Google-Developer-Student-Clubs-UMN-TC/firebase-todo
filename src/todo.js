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
    getFirestore
} from "firebase/firestore";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.db = getFirestore(props.firebase);
        this.state = {
            tasks: ["Sample Task", "Sample Task 2"],
            newText: "",
            checked: null,
            currIndex: 0,
            triggerAlert: false
        }
        this.state.checked = Array(this.state.tasks.length).fill(false);
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
            connectAuthEmulator(this.db, "http://localhost:8080");
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
            triggerAlert: true,
            currIndex: index
        });
    }

    handleTextFieldChange = event => {
        this.setState({ newText: event.target.value });
    }

    handleAlertClose = () => {
        const temp = this.state.tasks;
        temp[this.state.currIndex] = this.state.newText;
        this.setState({
            tasks: temp,
            triggerAlert: false
        });
    };

    render() {
        return (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Dialog open={this.state.triggerAlert} onClose={this.handleAlertClose}>
                    <DialogTitle>Subscribe</DialogTitle>
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
                        <Button onClick={this.handleAlertClose}>Submit</Button>
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
            </List>
        );
    }
}

export default Todo;