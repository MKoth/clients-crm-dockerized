import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const timeMorning = [
  "9:30",
  "11:30",
  "12:00",
  "12:10",
  "12:15",
  "12:25",
  "12:30",
  "13:00",
];
const timeDay = [
  "13:30",
  "15:15",
  "15:25",
  "15:45",
  "16:15",
];
const timeEvening = [
  "17:30",
  "17:35",
  "17:40",
  "18:30",
]

export function TimeView(props) {
  const [time, timeDate] = useState();

  const onTimeChange = (t) => {
    timeDate(t);
    props.onTimeSelected(time);
  }

  // prettier-ignore
  return (
    <>
      <List>
        <ListItem>
          <ArrowBackIosIcon/>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"SELECT TIME"}</Typography>}
            secondary="Online booking"
          />
        </ListItem>
        <Divider />
      </List>
      <div style={{padding:15, maxWidth:330}}>
        <h4 style={{margin:0, marginLeft: 5}}>Morning</h4>
        <div>
          {timeMorning.map(t=><Button key={t} variant={time==t?"contained":"outlined"} size="medium" color="primary" style={{margin:5, width:69}}>
            {t}
          </Button>)}
        </div>
        <h4 style={{margin:0, marginLeft: 5}}>Day</h4>
        <div>
          {timeDay.map(t=><Button key={t} variant={time==t?"contained":"outlined"} size="medium" color="primary" style={{margin:5, width:69}}>
            {t}
          </Button>)}
        </div>
        <h4 style={{margin:0, marginLeft: 5}}>Evening</h4>
        <div>
          {timeEvening.map(t=><Button key={t} variant={time==t?"contained":"outlined"} size="medium" color="primary" style={{margin:5, width:69}}>
            {t}
          </Button>)}
        </div>
      </div>
    </>
  );
}