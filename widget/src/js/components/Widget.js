import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { ExpertsView, ServiceView, DateView, TimeView, CredentialsView, PaymentView, CreditCardView, ResultView } from './views';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import setInterceptors from './api-service/interceptors';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: '#ffffff',
      default: '#fafafa'
    }
  }
});

class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      company: props.company?props.company:3,
      step: 1,
      services: [],
      durationMinutes: 0,
      finalPrice: 0,
      servicesNames: [],
      date: new Date(),
      time: null,
      staff: null,
      staffName: '',
      staffPhone: '',
      credentials: {},
      payment: null,
      textAreaSettings: '',
      //admin settings properties
      formTheme: theme,
      buttonTheme: theme,
      buttonText: 'Create an appointment',
      buttonVariant: 'contained',
      disableRipple: false,
      disableElevation: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.setViewSwitch = this.setViewSwitch.bind(this);
    this.setExpert = this.setExpert.bind(this);
    this.setServices = this.setServices.bind(this);
    this.setDate = this.setDate.bind(this);
    this.setTime = this.setTime.bind(this);
    this.setCredentials = this.setCredentials.bind(this);
    this.setPayment = this.setPayment.bind(this);
    this.setCreditCard = this.setCreditCard.bind(this);
    this.restart = this.restart.bind(this);
    this.back = this.back.bind(this);
    this.updateSettingsTextArea = this.updateSettingsTextArea.bind(this);
    this.updateFormWidgetTheme = this.updateFormWidgetTheme.bind(this);
    this.updateButtonWidgetTheme = this.updateButtonWidgetTheme.bind(this);
  }

  componentDidMount(){
    if(process.env.NODE_ENV==='production'){
      this.updateFormWidgetTheme(this.props.formSettings);
      this.updateButtonWidgetTheme(this.props.buttonSettings);
      setInterceptors(this.props.api);
    }
  }

  //this function here for testing widget theme changing in development mode
  updateSettingsTextArea(e){
    const SerftopiaWidget = {
      init: (data)=>{
        console.log(data);
        this.updateFormWidgetTheme(data.formSettings);
        this.updateButtonWidgetTheme(data.buttonSettings);
        this.setState({
          company: data.company
        })
      }
    }
    this.setState({
      textAreaSettings: e.target.value 
    });

    try {
        eval(e.target.value ); 
    } catch (err) {
        if (err instanceof SyntaxError) {
            console.error(err.message);
        }
    }
  }

  updateFormWidgetTheme(data){
    const {primary, secondary, background, text} = data;
    const themeSettings = {
      palette: {
        primary: {
          main: primary
        },
        secondary: {
          main: secondary
        },
        background: {
          paper: background
        },
        text: {
          primary: text,
          secondary: text+'66'
        }
      }
    };
    const formTheme = createMuiTheme(themeSettings);
    this.setState({
      formTheme
    });
  }

  updateButtonWidgetTheme(data){
    const {primary, contrastText, text, variant, isAnimation, isShadow} = data;
    const buttonTheme = createMuiTheme({
      palette: {
        primary: {
          main: primary,
          contrastText
        }
      }
    });
    this.setState({
      buttonTheme,
      buttonText: text,
      buttonVariant: variant,
      disableRipple: !isAnimation,
      disableElevation: !isShadow
    });
  }

  toggleDrawer(open){
    this.setState({
      open
    });
  }

  setExpert(staff){
    console.log(staff);
    this.setState({
      staff,
      step: 2
    });
  }

  setServices(services){
    console.log(services);
    this.setState({
      ...services,
      step: 3
    });
  }

  setDate(date){
    console.log(date);
    this.setState({
      date,
      step: 4
    });
  }

  setTime(time){
    this.setState({
      ...time,
      step: 5
    });
  }

  setCredentials(credentials){
    console.log(credentials);
    this.setState({
      credentials,
      step: 6
    });
  }

  setPayment(payment){
    console.log(payment);
    this.setState({
      payment,
      step: payment==='credit_card'? 7:8
    });
  }

  setCreditCard(){
    this.setState({
      step: 8
    });
  }

  restart(){
    this.setState({
      step: 1
    });
  }

  back(){
    this.setState({
      step: this.state.step-1
    });
  }

  setViewSwitch(){
    const { step, staff, services, date, company } = this.state;
    switch(step) {
      case 1:
        return <ExpertsView mediaPath={this.props.api} company={company} onExpertSelected={this.setExpert}/>;
      case 2:
        return <ServiceView company={company} onServicesSelected={this.setServices} staffId={staff?staff.id:'all'} onBack={this.back}/>;
      case 3:
        return <DateView onDateSelected={this.setDate} onBack={this.back}/>;
      case 4:
        return <TimeView company={company} onTimeSelected={this.setTime} staffId={staff?staff.id:'all'} services={services} date={date} onBack={this.back}/>;
      case 5:
        return <CredentialsView onCredentialsFilled={this.setCredentials} onBack={this.back}/>;
      case 6:
        return <PaymentView onPaymentSelected={this.setPayment} onBack={this.back}/>;
      case 7:
        return <CreditCardView onCreditCardSubmit={this.setCreditCard} onBack={this.back}/>;
      case 8:
        return <ResultView onRestartSelected={this.restart} {...this.state}/>;
      default:
        return <ExpertsView onExpertSelected={this.setExpert}/>;
    }
  }

  render() {
    const {open, formTheme, buttonTheme, buttonText, buttonVariant, disableElevation, disableRipple} = this.state;
    return (
      <ThemeProvider theme={formTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <React.Fragment>
            <ThemeProvider theme={buttonTheme}>
              <Button 
                variant={buttonVariant} 
                disableElevation={disableElevation} 
                disableRipple={disableRipple} 
                color="primary" 
                onClick={()=>{this.toggleDrawer(true)}} 
              >{buttonText}</Button>
            </ThemeProvider>
            {process.env.NODE_ENV!=='production'&&<p>
              Insert code from widget settings here to see the result<br />
              <textarea style={{width:'100%', height:200}} value={this.state.textAreaSettings} onChange={this.updateSettingsTextArea}></textarea>
            </p>}

            <Drawer style={{minWidth: 330}} anchor={'right'} open={open} onClose={()=>{this.toggleDrawer(false)}}>
              {this.setViewSwitch()}
              <div style={{height:1, minWidth:330}}></div>
            </Drawer>
          </React.Fragment>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    );
  }
}

export default Widget;