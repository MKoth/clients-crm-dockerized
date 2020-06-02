import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

export function ResultView() {
  const theme = useTheme();
  return (
    <>
      <List>
        <ListItem>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"WELL DONE!!!"}</Typography>}
            secondary="Online booking"
          />
        </ListItem>
        <Divider />
      </List>
      <div style={{padding:15, maxWidth:330}}>
        <h1 style={{margin:0, color: theme.palette.primary.main}}>Your booking is ready</h1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>Booking information</Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              <Divider />
              <ListItem dense>
                <ListItemText primary={'ARTHUR SCHLOSS'} secondary={"+380673452187"}/>
                <ListItemSecondaryAction>
                  <Typography>{'25 July 2020 17:45'}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography>Services</Typography>
            <div>
              <Chip label="Short haircut" color="secondary" style={{marginRight:10}}/>
              <Chip label="Hair coloring" color="secondary"/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography>Booking information was sent to your email</Typography>
            <h4>shein123@gmail.com</h4>
          </Grid>
          <Grid item container direction="row" justify="center">
            <Button style={{marginTop:30}} variant="contained" color="primary">
              Book more
            </Button>
          </Grid>
        </Grid>
        
      </div>
    </>
  );
}