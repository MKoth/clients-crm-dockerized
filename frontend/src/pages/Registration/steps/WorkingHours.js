import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, 
  Button, InputLabel, Select, MenuItem
} from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import * as moment from 'moment';

import Dropzone from "react-dropzone";

const hour_from = moment().set({hour:9,minute:0,second:0,millisecond:0});
const hour_to = moment().set({hour:16,minute:0,second:0,millisecond:0});
const weekdays = [
  {id:1, day:'Monday'},{id:2, day:'Tuesday'},{id:3, day:'Wednesday'},{id:4, day:'Thursday'},
  {id:5, day:'Friday'},{id:6, day:'Saturday'},{id:7, day:'Sunday'},
]

class WorkingHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: props.data
    };
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.removeDay = this.removeDay.bind(this);
    this.addDay = this.addDay.bind(this);
  }
  handleDateChange(newDate, day, type){
    day[type] = newDate;
    this.setState({days:[...this.state.days]});
  }
  handleDayChange(e, day){
    day.day = e.target.value;
    this.setState({days:[...this.state.days]});
  }
  removeDay(removedDay){
    this.setState({days:[...this.state.days.filter(day=>day!==removedDay)]});
  }
  addDay(){
    this.state.days.push({day:1, hour_from, hour_to });
    this.setState({days:[...this.state.days]});
  }
  render() {
    const {days} = this.state;
    return (
      <Paper elevation={0} style={{padding:15}}>
        <Grid container spacing={3}>
          {days.map((day, index)=><Grid key={index} item xs={12} container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel id="working-hours-weekday-select-label">Weekday</InputLabel>
                  <Select
                    labelId="working-hours-weekday-select-label"
                    label="Weekday"
                    value={day.day}
                    onChange={(e)=>{this.handleDayChange(e, day)}}
                  >
                    {weekdays.map(weekday=><MenuItem key={weekday.id} value={weekday.id}>
                      {weekday.day}
                    </MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TimePicker variant="outlined" size="small" ampm={false} label="From" value={day.hour_from} onChange={(e)=>{this.handleDateChange(e, day, 'hour_from')}} variant="outlined" fullWidth/>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TimePicker variant="outlined" size="small" ampm={false} label="To" value={day.hour_to} onChange={(e)=>{this.handleDateChange(e, day, 'hour_to')}} variant="outlined" fullWidth/>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button onClick={()=>{this.removeDay(day)}}>Remove time</Button>
              </Grid>
            </Grid>)
          }
          <Button onClick={this.addDay}>Add working time</Button>
        </Grid>
        <div style={{padding:15}}>
          <Button
            type="submit"
            onClick={this.props.onBack}
          >
            Back
          </Button>
          <Button onClick={()=>{this.props.onNext(this.state.days)}} variant="contained" color="primary">
            Next
          </Button>
        </div>
      </Paper>
    );
  }
}

export default WorkingHours;
