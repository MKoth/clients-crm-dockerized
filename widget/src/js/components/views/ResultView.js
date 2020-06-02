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
import {services, baseUrl} from '../api-service';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';

export function ResultView(props) {
  const theme = useTheme();
  console.log(props);

  useEffect(() => {
    const data = getAppointmentData();
    console.log(data);
    services.createAppointment(props.company, data).then(data=>{console.log(data);});
  }, []);

  const getAppointmentData = () => {
    let data = {
      ...props.credentials,
      description: props.credentials.message,
      staff: props.staff,
      services: props.services,
      company: props.company,
      startDate: moment(props.time).toISOString(),
      endDate: moment(props.time).add(props.durationMinutes, 'minutes').toISOString()
    }
    return data;
  }

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
                <ListItemText primary={props.staffName} secondary={props.staffPhone}/>
                <ListItemSecondaryAction>
                  <Typography>{moment(props.time).format('LLL')}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography>Services</Typography>
            <div>
              {props.servicesNames.map((srv, index)=><Chip key={index} label={srv} style={{marginRight:10}} color="secondary" />)}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Typography>Booking information was sent to your email</Typography>
            <h4>{props.credentials.email}</h4>
          </Grid>
          <Grid item container direction="row" justify="center">
            <Button style={{marginTop:30}} variant="contained" color="primary" onClick={props.onRestartSelected}>
              Book more
            </Button>
          </Grid>
        </Grid>
        
      </div>
    </>
  );
}

ResultView.propTypes = {
  onRestartSelected: PropTypes.func.isRequired
};