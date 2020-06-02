import React, { Fragment, Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardTitle, CardText } from "reactstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import { companyActions } from '../../actions/CompanyActions';
import { TimePicker } from "@material-ui/pickers";
import * as moment from 'moment';

const from = moment().set({hour:9,minute:0,second:0,millisecond:0});
const to = moment().set({hour:16,minute:0,second:0,millisecond:0});

class CompanyWorkingTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing_day: -1,
      editing_days:[{
        hour_from: from,
        hour_to: to,
        is_active: true
      }]
      
    };
    this.week_days = ['Monday', 'Tuesday', 'Wednesday', 'Thirthday', 'Friday', 'Saturday', 'Sunday'];
    this.edit = this.edit.bind(this);
    this.addHours = this.addHours.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    const { dispatch, company } = this.props;
    dispatch(companyActions.getHours(company.id));
    setTimeout(()=>{
      console.log(this.props.hours);
    },1000);
  }

  onChange(index, type, value){
    this.state.editing_days[index][type] = value
    this.setState({
      editing_days: [...this.state.editing_days]
    });
  }

  edit(index, dayHours){
    let dayHoursCopy = JSON.parse(JSON.stringify(dayHours));
    dayHours&&dayHours.length?(
      this.setState({
        editing_day: index,
        editing_days: dayHoursCopy.map(day=>({...day, 
          hour_from:moment(day.hour_from, 'HH:mm:ss'), 
          hour_to:moment(day.hour_to, 'HH:mm:ss')
        }))
      })
    ):(
      this.setState({
        editing_day: index,
        editing_days: [{
          day: index,
          hour_from: from,
          hour_to: to,
          is_active: true
        }]
      })
    );
  }

  addHours(){
    this.state.editing_days.push({
      day: this.state.editing_day,
      hour_from: from,
      hour_to: to,
      is_active: true
    });
    this.setState({
      editing_days: [...this.state.editing_days]
    });
  }

  removeHours(index){
    this.state.editing_days.splice(index,1);
    this.setState({
      editing_days: [...this.state.editing_days]
    });
  }

  cancel(){
    this.setState({
      editing_day: -1
    });
  }

  save(dayIndex, dayHours){
    const { company, dispatch } = this.props;
    this.setState({
      editing_day: -1
    });
    const {editing_days} = this.state;

    let days = JSON.parse(JSON.stringify(editing_days));
    days.map(day=>{
      day.day = dayIndex;
      day.company = company.id;
      day.hour_from = moment(day.hour_from).format('HH:mm:ss');
      day.hour_to = moment(day.hour_to).format('HH:mm:ss');
      return day;
    });
    //console.log(days);
    //api update or add hour
    dispatch(companyActions.updateHours(company.id, dayIndex, days));
  }

  render() {
    return (
      <Fragment>
        <Row>
          {this.week_days.map((day, index)=>{
            const dayIndex = index+1;
            const dayHours = this.props.hours.filter(hour=>hour.day===dayIndex);
            return <Col key={dayIndex} md="3">
              <Card body style={{marginBottom:15}}>
                <CardTitle>{day}</CardTitle>
                {this.state.editing_day!==dayIndex?<>
                  {dayHours&&dayHours.map((dayHour, index)=>(<div key={index}>
                    <CardText style={{marginBottom:0}}><b>From:</b> {moment(dayHour.hour_from, 'HH:mm:ss').format('hh:mm	a')}</CardText>
                    <CardText><b>To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b> {moment(dayHour.hour_to, 'HH:mm:ss').format('hh:mm	a')}</CardText>
                    <hr></hr>
                  </div>))}
                  {(!dayHours||!dayHours.length)&&<><CardText>No work day</CardText></>}
                </>:<Form>
                  {this.state.editing_days.map((day_hours, index)=>(<div key={index}><FormGroup>
                      <TimePicker variant="outlined" size="small" ampm={false} label="From" value={day_hours.hour_from} onChange={this.onChange.bind(this,index,'hour_from')} fullWidth/>
                    </FormGroup>
                    <FormGroup>
                      <TimePicker variant="outlined" size="small" ampm={false} label="To" value={day_hours.hour_to} onChange={this.onChange.bind(this,index,'hour_to')} fullWidth/>
                    </FormGroup><Button style={{width:'100%',marginBottom:10}} onClick={this.removeHours.bind(this, index)}>Remove hours</Button></div>))}
                </Form>}
                {this.state.editing_day!==dayIndex?<Button onClick={this.edit.bind(this, dayIndex, dayHours)}>Edit</Button>:<>
                  <Button onClick={this.addHours} style={{marginBottom:10}}>Add hours</Button>
                  <Button onClick={this.save.bind(this, dayIndex, dayHours)} style={{marginBottom:10}}>Save</Button>
                  <Button onClick={this.cancel}>Cancel</Button>
                </>}
              </Card>
            </Col>}, this)}
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.company.loading,
  hours: state.company.hours,
  company: state.company.company
});

//const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps)(CompanyWorkingTime);
