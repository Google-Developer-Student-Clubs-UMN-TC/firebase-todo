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
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: ["Sample Task"],
            newText: "",
            checked: [],
            setChecked: [],
            currIndex: 0,
            triggerAlert: false,
            alertFieldValue: ""
        }
    }
    
    handleToggle(value) {
        // const currentIndex = this.state.checked.indexOf(value);
        // const newChecked = [...this.state.checked];

        // if (currentIndex === -1) {
        //     newChecked.push(value);
        // } else {
        //     newChecked.splice(currentIndex, 1);
        // }

        // this.state.setChecked(newChecked);
        alert("I am in handle toggle");
    };
    
    handleTaskEdit(index) {
        // open popup that has an accept and cancel button to accept new value for the specific task
        // set the task text to whatever value the user inputs
        this.setState({
            triggerAlert: true,
            currIndex: index
        });
    }
    
    handleTextFieldChange = e => {
        this.setState({
            alertFieldValue: e.target.value,
            newText: e.target.value
        });
    }
    
    handleAlertOpen = () => {
        this.setState({triggerAlert: true});
    };
    
    handleAlertClose = () => {
        const temp = this.state.tasks;
        temp[this.state.currIndex] = this.state.newText;
        this.setState({
            alertFieldValue: "",
            tasks: temp});
        this.setState({triggerAlert: false});
    };

    render() {
        return (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Dialog open={this.state.triggerAlert} onClose={this.handleAlertClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={this.state.alertFieldValue}
                            onChange={this.handleTextFieldChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleAlertClose}>Cancel</Button>
                        <Button onClick={this.handleAlertClose}>Subscribe</Button>
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
                                        checked={this.state.checked.indexOf(value) !== -1}
                                        tabIndex={-1}
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