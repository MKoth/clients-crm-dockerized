import React, {useState, useEffect} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {services as apiLibrary, baseUrl} from '../api-service';
import moment from 'moment';

export function TimeView(props) {
  const [time, timeDate] = useState();
  const [timeTables, setTimeTables] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const {staffId, services, date} = props;
  useEffect(() => {
    apiLibrary.staffListGet(props.company).then(({data})=>{ console.log(data); setStaffs(data); });
    apiLibrary.timetableGet(staffId, services, date).then(({data})=>{ console.log(data); setTimeTables(data); });
  }, []);

  const onTimeChange = (t) => {
    timeDate(t);
    props.onTimeSelected(t);
  }

  const getStaffNameById = (staffId) => {
    const selectedStaff = staffs.find(staff=>staff.id===staffId);
    return selectedStaff.user.first_name+" "+selectedStaff.user.last_name
  }

  const getStaffPhoneById = (staffId) => {
    const selectedStaff = staffs.find(staff=>staff.id===staffId);
    return selectedStaff.phone
  }

  // prettier-ignore
  return (
    <>
      <List>
        <ListItem>
          <ArrowBackIosIcon onClick={props.onBack}/>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"SELECT TIME"}</Typography>}
            secondary="Online booking"
          />
        </ListItem>
        <Divider />
      </List>
      <div style={{padding:15, maxWidth:330}}>
        {timeTables.length>0&&staffs.length>0&&timeTables.map(timeTable=>(<div key={timeTable.staff}>
          <h4 style={{margin:0, marginLeft: 5}}>{getStaffNameById(timeTable.staff)}'s hours:</h4>
          {timeTable.time_table.map(t=><Button key={t} variant={time==t?"contained":"outlined"} size="medium" color="primary" 
            onClick={()=>{onTimeChange({time:t, staff:timeTable.staff, staffName: getStaffNameById(timeTable.staff), staffPhone: getStaffPhoneById(timeTable.staff)})}} 
            style={{margin:5, width:69}}
          >
            {moment(t).format('HH:mm')}
          </Button>)}
          {!timeTable.time_table.length>0&&<p style={{margin:0, marginLeft: 5}}>Sorry, but no free time was found for this expert!</p>}
        </div>))}
        {(timeTables.length===0||staffs.length===0)&&<p style={{margin:0, marginLeft: 5}}>loading data...</p>}
      </div>
    </>
  );
}

TimeView.propTypes = {
  onTimeSelected: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};