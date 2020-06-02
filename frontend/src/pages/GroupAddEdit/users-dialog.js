import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import urls from '../../api/ApiUrl';

export const UsersDialog = (props) => {
  const { onClose, open, users } = props;

  const [checked, setChecked] = React.useState([]);
  const [checkedAll, setCheckedAll] = React.useState(0);

  const checkUncheckAll = () => {
    if(checkedAll === 0){
      setChecked(users);
      setCheckedAll(1);
    }
    else{
      setChecked([]);
      setCheckedAll(0);
    }
    //indeterminate
  }

  const handleToggle = (user) => () => {
    if(checkedAll === 1)
      setCheckedAll(-1);
    const currentIndex = checked.indexOf(user);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(user);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  }

  const handleClose = () => {
    onClose(checked)
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="users-dialog-title" open={open}>
      <DialogTitle id="users-dialog-title">Select user</DialogTitle>
      <DialogContent style={{padding:0}}>
        <List>
          <ListItem button onClick={() => {}} key={0}>
            <ListItemIcon>
              <Checkbox
                onClick={(e)=>{e.stopPropagation();}}
                onChange={checkUncheckAll}
                checked={checkedAll===1||checkedAll===-1}
                edge="start"
                tabIndex={-1}
                disableRipple
                indeterminate={checkedAll===-1}
              />
            </ListItemIcon>
            <ListItemText primary={'Select all users'}/>
          </ListItem>
          {users.map((user) => (
            <ListItem button onClick={() => {onClose([user])}} key={user.id}>
              <ListItemIcon>
                <Checkbox
                  onClick={(e)=>{e.stopPropagation()}}
                  onChange={handleToggle(user)}
                  checked={checked.indexOf(user)!==-1}
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemAvatar>
                <Avatar>
                  {user.image?<img width="50" style={{borderRadius:30}} src={urls.url+user.image} />:<PersonIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.user.first_name+" "+user.user.last_name} secondary={user.user.email} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose([])} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onClose(checked)} color="primary">
          Add selected users
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UsersDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired
};