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
import { saleActions } from '../../actions/SaleActions';
import { staffActions } from '../../actions/StaffActions';
import { serviceActions } from '../../actions/ServiceActions';
import CustomSalesForm from './customSalesForm';
import moment from 'moment';
import './index.css';
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
  return null;
};

const Appointment = ({
  children, style, ...restProps
}) => {
  return <Appointments.Appointment
    {...restProps}
  >
    {children}
    <div className={'appointment-content'}>
      <p><b>Status:</b> {restProps.data.status}</p>
      <p><b>Client:</b> {restProps.data.name}</p>
      <p><b>Services:</b> {restProps.data.services.length?restProps.data.services.map(srv_id=>{
        const service = restProps.resources.find(res=>res.id===srv_id&&res.fieldName==='services')
        if(!service){ console.log(srv_id); console.log(restProps.resources)}
        return service?service.text:'No service';
      }).join():'No services'}</p>
    </div>
  </Appointments.Appointment>
};

class Sales extends React.Component {
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
        },
        {
          fieldName: 'services',
          title: 'Services',
          allowMultiple: true,
          instances: this.serviceIntoInstance(this.props.services),
        }
      ],

      viewStaff: 'all',
      cellDuration: 30,
      staffInstances:[],
      serviceInstances:[]
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

  serviceIntoInstance(services){
    return services.map(service=>({id:service.id, text: service.title}));
  }

  componentDidMount(){
    console.log(this.state.resources[1].instances);
    const {dispatch, company, staffs, services, sales} = this.props;
    dispatch(saleActions.getAll(company.id));
    this.setState({
      data: sales,
      staffInstances: this.state.resources[0].instances,
      serviceInstances: this.state.resources[1].instances
    });
    /*{ id:1, startDate: new Date('2018-11-01T09:45'), endDate: new Date('2018-11-01T11:00'), title: 'Anna Glove', status:'new', staff: 2, client: 1, services:[1,2,4] },
      { id:2, startDate: new Date('2018-11-01T12:00'), endDate: new Date('2018-11-01T13:30'), title: 'Mikhael Row', status:'in_progress', staff: 3, client: 2, services:[5] },
      { id:3, startDate: new Date('2018-12-01T11:00'), endDate: new Date('2018-11-01T14:30'), title: 'Akker Man', status:'canceled', staff: 5, client: null, services:[3,4] }*/
  }

  componentDidUpdate(prevProps){
    const {sales} = this.props;
    if(prevProps.sales.length!==sales.length){
      this.setState({
        data: sales
      });
    }
  }

  commitChanges({ added, changed, deleted }) {
    const { dispatch, company } = this.props;
    let {data} = this.state;
    if (added) {
      console.log(added);
      /*const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];*/
      dispatch(saleActions.createSale(company.id, { ...added, company: company.id }));
    }
    if (changed) {
      console.log(changed);
      data = data.map(appointment => {
        if(changed[appointment.id]){
          dispatch(saleActions.updateSale(appointment.id, { ...appointment, ...changed[appointment.id] }))
          return { ...appointment, ...changed[appointment.id] }
        }
        return appointment;
      });
    }
    if (deleted !== undefined) {
      data = data.filter(appointment => appointment.id !== deleted);
      dispatch(saleActions.deleteSale(deleted));
    }
    this.setState({
      data
    });
  }

  onViewStaffChange(e){
    const {staffs} = this.props;
    const {staffInstances, serviceInstances} = this.state;
    const value = e.target.value;
    if(value === 'all'){
      this.setState({
        resources: [
          {
            fieldName: 'staff',
            title: 'Staff member',
            instances: staffInstances,
          },
          {
          fieldName: 'services',
          title: 'Services',
          allowMultiple: true,
          instances: serviceInstances,
        }
        ],
  
        viewStaff:'all'
      })
    }
    else{
      this.setState({
        resources: [
          {
            fieldName: 'staff',
            title: 'Staff member',
            instances: staffInstances.filter(member=>member.id===value),
          },
          {
            fieldName: 'services',
            title: 'Services',
            allowMultiple: true,
            instances: serviceInstances,
          }
        ],
  
        viewStaff: value
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
        <FormControl variant="outlined" size="small">
          <InputLabel id="change-view-select-label">Change view</InputLabel>
          <Select
            labelId="change-view-select-label"
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
            defaultCurrentViewName="Day"
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />
          <GroupingState
            grouping={grouping}
          />

          <EditRecurrenceMenu />
          <WeekView
            startDayHour={8}
            endDayHour={18}
            cellDuration={cellDuration}
            name="Week"
          />
          <DayView
            startDayHour={8}
            endDayHour={18}
            cellDuration={cellDuration}
            name="Day"
          />
          <Appointments 
            appointmentComponent={Appointment}
          />

          <Toolbar />
          <ViewSwitcher />
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
            basicLayoutComponent={CustomSalesForm}
            textEditorComponent={TextEditor}
            booleanEditorComponent={BooleanEditor}
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
  loading: state.sale.loading,
  sales: state.sale.sales,
  staffs: state.staff.staffs,
  services: state.service.services,
  company: state.company.company
});

export default connect(mapStateToProps)(Sales);