import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, Select, InputLabel, MenuItem, Button
} from "@material-ui/core";
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = props.data;
  }

  handleChange(value, name){
    this.setState({[name]:value});
  }

  render() {
    return <Paper elevation={0} style={{padding:15}}>
      <ValidatorForm onError={errors => console.log(errors)} onSubmit={()=>{this.props.onNext(this.state)}}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextValidator
              validators={['required']}
              errorMessages={['this field is required']}
              value={this.state.title}
              onChange={(e)=>{this.handleChange(e.target.value,'title')}}
              size="small" label="Company name" variant="outlined" fullWidth/>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="company-currency-label">Default currency</InputLabel>
              <Select
                value={this.state.currency}
                onChange={(e)=>{this.handleChange(e.target.value,'currency')}}
                labelId="company-currency-label"
                label="Default currency"
              >
                <MenuItem value={'rub'}>
                  (RUB) Russian Rubble
                </MenuItem>
                <MenuItem value={'usd'}>
                  (USD) US Dollar
                </MenuItem>
                <MenuItem value={'eur'}>
                  (EUR) Euro
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="company-language-label">Default Language</InputLabel>
              <Select
                value={this.state.language}
                onChange={(e)=>{this.handleChange(e.target.value,'language')}}
                labelId="company-language-label"
                label="Default Language"
              >
                <MenuItem value={'en'}>
                  <img width={20} style={{marginRight:10}} src={process.env.PUBLIC_URL + "/flag/uk.png"}/>
                  English
                </MenuItem>
                <MenuItem value={'ru'}>
                  <img width={20} style={{marginRight:10}} src={process.env.PUBLIC_URL + "/flag/russia.png"}/>
                  Russian
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="company-vat-label">VAT</InputLabel>
              <Select
                value={this.state.vat}
                onChange={(e)=>{this.handleChange(e.target.value,'vat')}}
                labelId="company-vat-label"
                label="VAT"
              >
                <MenuItem value={'15'}>
                  15%
                </MenuItem>
                <MenuItem value={'20'}>
                  20%
                </MenuItem>
                <MenuItem value={'30'}>
                  30%
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator
              validators={['required', 'matchRegexp:^(?!mailto:)(?:(?:http|https|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$']}
              errorMessages={['this field is required', 'should be valid url']}
              value={this.state.website}
              onChange={(e)=>{this.handleChange(e.target.value,'website')}}
              size="small" label="Website" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="company-timezone-label">Timezone</InputLabel>
              <Select
                value={this.state.time_zone}
                onChange={(e)=>{this.handleChange(e.target.value,'time_zone')}}
                labelId="company-timezone-label"
                label="Timezone"
              >
                <MenuItem value={'gmt+3'}>
                  GMT+3
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              value={this.state.description}
              onChange={(e)=>{this.handleChange(e.target.value,'description')}}
              size="small" label="Description" variant="outlined" multiline rows={4} fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              validators={['required']}
              errorMessages={['this field is required']}
              value={this.state.address}
              onChange={(e)=>{this.handleChange(e.target.value,'address')}}
              size="small" label="Address" variant="outlined" fullWidth/>
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