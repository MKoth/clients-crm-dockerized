import React, {useCallback} from 'react';
import { TimePicker } from "@material-ui/pickers";
import moment from 'moment';

const TimePickerLayout = (props) => {
  console.log(props);

  return (
    <TimePicker style={{flex:'2 1 auto'}} classNmae={props.className} variant="outlined" size="small" ampm={false} value={props.value} onChange={(e)=>{props.onValueChange(e.toISOString())}} />
  );
};

export default TimePickerLayout;