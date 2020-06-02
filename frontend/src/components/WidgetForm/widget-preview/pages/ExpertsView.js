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
import { useTheme } from '@material-ui/core/styles';

export function ExpertsView(props) {
  const theme = useTheme();
  console.log(theme);
  const staff_team = [
    {id: 1, name: "Arthur Schloss", position: "Top barber"},
    {id: 2, name: "Michael Kunst", position: "Simple barber"},
    {id: 3, name: "Anna Kunst", position: "Helper"},
    {id: 4, name: "Bob Wizard", position: "Hair painter"},
    {id: 5, name: "Jessica Blob", position: "Top barber"},
    {id: 6, name: "Chris Michmald", position: "Middle barber"},
    {id: 7, name: "Roberto Catenillo", position: "Senior barber"}
  ];

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
                {staff_member.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography style={{fontSize: 14}}>{staff_member.name.toUpperCase()}</Typography>}
              secondary={staff_member.position}
            />
            <ListItemSecondaryAction>
              <IconButton size="small" edge="end" style={{fontSize: 15, color: theme.palette.primary.main}}>
                Choose
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </>
  );
}
