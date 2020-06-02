import React, {useState} from 'react';
import { DatePicker } from "@material-ui/pickers";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import moment from 'moment';

export function DateView(props) {
  const [date, changeDate] = useState(new Date());

  const onDateChange = (newDate) => {
    changeDate(newDate);
    moment(newDate).format('YYYY-MM-DD');
    props.onDateSelected(moment(newDate).format('YYYY-MM-DD'));
  }

  // prettier-ignore
  return (
    <>
      <List>
        <ListItem>
          <ArrowBackIosIcon onClick={props.onBack}/>
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
          onChange={onDateChange}
        />
      </>
    </>
  );
}

DateView.propTypes = {
  onDateSelected: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};