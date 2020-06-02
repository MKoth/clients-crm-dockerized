import React, { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import {services, baseUrl} from '../api-service';
import { useTheme } from '@material-ui/core/styles';

export function ExpertsView(props) {
  const theme = useTheme();
  const [staff_team, staffSet] = useState([]);
  useEffect(() => {
    services.staffListGet(props.company).then(data=>{staffSet(data.data); console.log(data);});
  }, []);

  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"SELECT AN EXPERT"}</Typography>}
            secondary="Online booking"
          />
          <ListItemSecondaryAction>
            <IconButton size="small" edge="end" style={{fontSize: 15, color: theme.palette.primary.main}} onClick={()=>{props.onExpertSelected(null)}}>
              Skip
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      
      <List>
        <Divider/>
        {staff_team.map(staff_member=><ListItem divider key={staff_member.id}>
            <ListItemAvatar>
              <Avatar>
                {staff_member.image?<img width="60" src={baseUrl+staff_member.image}/>:staff_member.user.first_name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography style={{fontSize: 14}}>{staff_member.user.first_name.toUpperCase()+" "+staff_member.user.last_name.toUpperCase()}</Typography>}
              secondary={staff_member.position}
            />
            <ListItemSecondaryAction>
              <IconButton size="small" edge="end" style={{fontSize: 15, color: theme.palette.primary.main}} onClick={()=>{props.onExpertSelected(staff_member)}}>
                Choose
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </>
  );
}

ExpertsView.propTypes = {
  onExpertSelected: PropTypes.func.isRequired
};