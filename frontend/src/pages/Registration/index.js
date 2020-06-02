import React, { Fragment, useState } from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import {history} from '../../utils/history';

import UserInfo from './steps/UserInfo';
import CompanyInfo from './steps/CompanyInfo';
import Media from './steps/Media';
import WorkingHours from './steps/WorkingHours';
import SocialLinks from './steps/SocialLinks';
import * as moment from 'moment';
import { successAlert, errorAlert } from '../../utils/sweetalert';

import {userService} from '../../services/UserService'

const userInfoData = {
  first_name:'',
  last_name:'',
  username:'',
  email:'',
  password1:'',
  password2:''
}

const companyInfoData = {
  title: '',
  language: 'en',
  website: '',
  description: '',
  currency: 'usd',
  vat: '15',
  time_zone:'gmt+3',
  address:''
}

const hour_from = moment().set({hour:9,minute:0,second:0,millisecond:0});
const hour_to = moment().set({hour:16,minute:0,second:0,millisecond:0});

const workingHoursData = [
  {day: 1, hour_from, hour_to}
]

const socialLinksData = [
  {title:'', link:''},
  {title:'', link:''},
  {title:'', link:''}
]

function getSteps() {
  return ['User info', 'Company info', 'Media', 'Working hours', 'Social links'];
}

export default function Registration() {
  const [activeStep, setActiveStep]     = useState(0);
  const [userInfo, setUserInfo]         = useState(userInfoData);
  const [companyInfo, setCompanyInfo]   = useState(companyInfoData);
  const [media, setMedia]               = useState({logo:undefined, cover:undefined});
  const [workingHours, setWorkingHours] = useState(workingHoursData);
  const [socials, setSocials]           = useState(socialLinksData);

  const steps = getSteps();


  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UserInfo data={userInfo} onNext={(e)=>{setUserInfo(e);handleNext()}} onBack={handleBack}/>;
      case 1:
        return <CompanyInfo  data={companyInfo} onNext={(e)=>{setCompanyInfo(e);handleNext()}} onBack={handleBack}/>;
      case 2:
        return <Media data={media} onNext={(e)=>{setMedia(e);handleNext()}} onBack={handleBack}/>;
      case 3:
        return <WorkingHours data={workingHours} onNext={(e)=>{setWorkingHours(e);handleNext()}} onBack={handleBack}/>;
      case 4:
        return <SocialLinks data={socials} onNext={(e)=>{setSocials(e);handleNext();registerCompany();}} onBack={handleBack}/>;
      default:
        return <Paper elevation={0} style={{padding:15}}>
          <Grid container spacing={3}>
            <p syle={{width:'100%', textAlign:'center'}}>All steps completed, you may proceed to login now <Button onClick={()=>{setActiveStep(4)}}>Back</Button><Button onClick={handleLogin}>Go to login</Button></p>
          </Grid></Paper>;
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleLogin = () => {
    history.push('login');
  }

  const registerCompany = () => {
    localStorage.removeItem('key');
    const data = {
      ...companyInfo, 
      ...media,
      user: userInfo,
      company_working_time: workingHours.map(hour=>({
        day: hour.day,
        hour_from: moment(hour.hour_from).format('HH:mm:ss'),
        hour_to: moment(hour.hour_to).format('HH:mm:ss')
      })),
      company_social_link: socials.filter(social=>social.title.trim()!==''&&social.link.trim()!=='')
    }
    console.log(data);
    userService.register(data).then(
      data => {
        console.log(data);
        successAlert();
      },
      error => {
        console.log(error);
        errorAlert(JSON.stringify(error));
      }
    );
  }

  return (<Fragment>
      <h1 style={{textAlign:'center'}}>Company owner account creation</h1>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{padding:20}}>
        {getStepContent(activeStep)}
      </div>
    </Fragment>);
}