import React, {useState} from 'react';
import { Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Resources,
  WeekView,
  DayView,
  MonthView,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  GroupingPanel,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  DragDropProvider,
  EditRecurrenceMenu,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import { connect } from "react-redux";
import { staffActions } from '../../actions/StaffActions';
import { scheduleActions } from '../../actions/ScheduleActions';
import moment from 'moment';
import TimePickerLayout from '../../common/calendar-custom-forms/time-picker-custom-form';

const grouping = [{
  resourceName: 'staff',
}];

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === 'multilineTextEditor' || props.type === 'titleTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />;
};

const BooleanEditor = (props) => {
  if (props.label === 'All Day')
    return null;
  return <AppointmentForm.BooleanEditor {...props} />;
};

class StaffSchedule extends React.Component {
  constructor(props) {
    
    super(props);
    let dayRange = this.getDayRange();
    this.state = {
      startDayHour: dayRange.min,
      endDayHour: dayRange.max,
      data: [],
      currentDate: new Date(),

      addedAppointment: {},
      appointmentChanges: {},
      editingAppointmentId: undefined,
      resources: [
        {
          fieldName: 'staff',
          title: 'Staff member',
          instances: this.stuffIntoInstance(this.props.staffs),
        }
      ],

      viewStaff: 'all',
      cellDuration: 60,
      staffInstances:[]
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onViewStaffChange = this.onViewStaffChange.bind(this);
    this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
    this.getDayRange = this.getDayRange.bind(this);
  }

  getDayRange(){
    const {company} = this.props;
    let minHour = 23;
    let maxHour = 0;
    company.company_working_time.forEach(time=>{
      let newMinHour = moment(time.hour_from, 'HH:mm:ss').hours();
      let newMaxHour = moment(time.hour_to, 'HH:mm:ss').hours();
      minHour = minHour>newMinHour?newMinHour:minHour;
      maxHour = maxHour<newMaxHour?newMaxHour:maxHour;
    });
    return {
      min: minHour,
      max: maxHour
    }
  }

  stuffIntoInstance(staffs){
    return staffs.map(staff=>({id:staff.id, text: staff.user.first_name+" "+staff.user.last_name}));
  }

  componentDidMount(){
    const {dispatch, company, schedules} = this.props;
    dispatch(scheduleActions.getAll(company.id));
    this.setState({
      data:schedules,
      staffInstances: this.state.resources[0].instances
    });
  }

  componentDidUpdate(prevProps){
    const {schedules} = this.props;
    if(prevProps.schedules.length!==schedules.length){
      this.setState({
        data: schedules
      });
    }
  }

  commitChanges({ added, changed, deleted }) {
    let { data } = this.state;
    const { company, dispatch } = this.props;
    if (added) {
      /*const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];*/
      dispatch(scheduleActions.createSchedule(company.id, { ...added, company: company.id }));
    }
    if (changed) {
      data = data.map(appointment => {
        if(changed[appointment.id]){
          dispatch(scheduleActions.updateSchedule(appointment.id, { ...appointment, ...changed[appointment.id] }))
          return { ...appointment, ...changed[appointment.id] }
        }
        return appointment;
      });
    }
    if (deleted !== undefined) {
      data = data.filter(appointment => appointment.id !== deleted);
      dispatch(scheduleActions.deleteSchedule(deleted));
    }
    this.setState({
      data
    });
  }

  onViewStaffChange(e){
    const {staffs} = this.props;
    const {staffInstances} = this.state;
    const value = e.target.value;
    if(value === 'all'){
      this.setState({
        resources: [
          {
            fieldName: 'staff',
            title: 'Staff member',
            instances: staffInstances,
          }
        ],
  
        viewStaff:'all',
        cellDuration: 60
      })
    }
    else{
      this.setState({
        resources: [
          {
            fieldName: 'staff',
            title: 'Staff member',
            instances: staffInstances.filter(member=>member.id===value),
          }
        ],
  
        viewStaff: value,
        cellDuration: 30
      })
    }
  }

  render() {
    const {staffs} = this.props;
    const {
      currentDate, data, resources, viewStaff, cellDuration, staffInstances, startDayHour, endDayHour
    } = this.state;

    return (
      <Paper>
        <FormControl style={{padding:10, minWidth: 200, position:'absolute', right:0, zIndex:1}} variant="outlined" size="small">
          <InputLabel id="change-view-select-label">Change view</InputLabel>
          <Select
            labelId="change-view-select-labell"
            label="Change view"
            defaultValue="all"
            value={viewStaff}
            onChange={this.onViewStaffChange}
          >
            <MenuItem key={'all'} value={'all'}>
              All stuff members
            </MenuItem>
            {staffInstances.map((member)=><MenuItem key={member.id} value={member.id}>
              {member.text}
            </MenuItem>)}
          </Select>
        </FormControl>
        <Scheduler
          data={data}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={this.currentDateChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={grouping}
            groupOrientation={()=>'Vertical'}
          />

          <EditRecurrenceMenu />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={cellDuration}
            name="Vertical"
          />
          <Appointments />

          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Resources
            data={resources}
            mainResourceName='staff'
          />
  
          <IntegratedGrouping />
          <AppointmentTooltip 
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm 
            booleanEditorComponent={BooleanEditor}
            textEditorComponent={TextEditor}
            dateEditorComponent={TimePickerLayout}
          />
  
          <GroupingPanel />
          <DragDropProvider />
          <ConfirmationDialog />
        </Scheduler>
      </Paper>
    );
  }
  
}

const mapStateToProps = state => ({
  loading: state.schedule.loading,
  schedules: state.schedule.schedules,
  staffs: state.staff.staffs,
  company: state.company.company
});

export default connect(mapStateToProps)(StaffSchedule);