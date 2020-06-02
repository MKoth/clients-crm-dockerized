import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = props.data;
  }

  handleChange(value, name){
    this.setState({[name]:value});
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
        if (value !== this.state.password1) {
            return false;
        }
        return true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  render() {
    return <Paper elevation={0} style={{padding:15}}>
      <ValidatorForm onError={errors => console.log(errors)} onSubmit={()=>{this.props.onNext(this.state)}}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              validators={['required']}
              errorMessages={['this field is required']}
              value={this.state.first_name}
              onChange={(e)=>{this.handleChange(e.target.value,'first_name')}}
              size="small" label="First name" variant="outlined" fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              validators={['required']}
              errorMessages={['this field is required']}
              value={this.state.last_name}
              onChange={(e)=>{this.handleChange(e.target.value,'last_name')}}
              size="small" label="Last name" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              validators={['required']}
              errorMessages={['this field is required']}
              value={this.state.username}
              onChange={(e)=>{this.handleChange(e.target.value,'username')}}
              size="small" label="Username" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
              value={this.state.email}
              onChange={(e)=>{this.handleChange(e.target.value,'email')}}
              type="email" size="small" label="Email" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              validators={['required', 'minStringLength:6']}
              errorMessages={['this field is required', 'password must be a minimum of 6 characters']}
              value={this.state.password1}
              onChange={(e)=>{this.handleChange(e.target.value,'password1')}}
              type="password" type="password" size="small" label="Password" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              validators={['required', 'isPasswordMatch']}
              errorMessages={['this field is required', 'password should match']}
              value={this.state.password2}
              onChange={(e)=>{this.handleChange(e.target.value,'password2')}}
              type="password" size="small" label="Repeat password" variant="outlined" fullWidth/>
          </Grid>
        </Grid>
        <div style={{padding:15}}>
          <Button
            type="submit"
            onClick={this.props.onBack}
          >
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </ValidatorForm>
    </Paper>
  }
}

export default UserInfo;