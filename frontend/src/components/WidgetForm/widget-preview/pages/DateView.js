import React, {useState} from 'react';
import { DatePicker } from "@material-ui/pickers";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Divider from '@material-ui/core/Divider';

export function DateView(props) {
  const [date, changeDate] = useState(new Date());

  const onDateChange = (newDate) => {
    changeDate(newDate);
  }

  // prettier-ignore
  return (
    <>
      <List>
        <ListItem>
          <ArrowBackIosIcon/>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"SELECT DATE"}</Typography>}
            secondary="Online booking"
          />
        </ListItem>
        <Divider />
      </List>
      <>
        <DatePicker
          autoOk
          variant="static"
          openTo="date"
          value={date}
          onChange={()=>{}}
        />
      </>
    </>
  );
}