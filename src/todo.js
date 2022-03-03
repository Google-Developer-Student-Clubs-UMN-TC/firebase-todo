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
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
            connectAuthEmulator(this.db, "http://localhost:8080");
    }

    render() {
        return (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            </List>
        );
    }
}

export default Todo;