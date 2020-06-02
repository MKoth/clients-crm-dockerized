import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { companyActions } from '../../actions/CompanyActions';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, Select, InputLabel, MenuItem, Button
} from "@material-ui/core";

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    //this.props.info.title
    //this.props.info.address
    
    this.state = {
      id: 0,
      address: "",
      currency: '',
      description: '',
      email: '',
      is_active: true,
      language: '',
      phone: '',
      telegram: '',
      time_zone: '',
      title: '',
      vat: '',
      viber: '',
      whatsap: '',
      website:'',
      is_updated: false
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.populateFields = this.populateFields.bind(this);
  }

  componentDidMount(){
    this.populateFields();
  }

  componentDidUpdate(prevProps){
    //check if object was empty
    if(Object.keys(prevProps.company).length === 0&&Object.keys(this.props.company).length !== 0){
      console.log(this.props.company);
      this.populateFields();
    }
  }

  populateFields(){
    if(this.props.company){
      for (const [key, value] of Object.entries(this.props.company)) {
        if(value!==null&&this.state.hasOwnProperty(key)){
          this.setState({[key]:value});
        }
      }
    }
  }

  onHandleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  formValidation(){
    console.log(this.state.title);
    return this.state.title.trim()==='';
  }
  
  render() {
    return (
      <Paper elevation={3} style={{padding:15}}>
      <ValidatorForm onError={errors => console.log(errors)} onSubmit={() => { const { dispatch } = this.props; dispatch(companyActions.update(this.state));}}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextValidator
              name="title" 
              validators={['required']}
              errorMessages={['this field is required']}
              value={this.state.title}
              onChange={this.onHandleChange}
              size="small" label="Company name" variant="outlined" fullWidth/>
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="company-currency-label">Default currency</InputLabel>
              <Select
                name="currency" 
                value={this.state.currency}
                onChange={this.onHandleChange}
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
                name="language"
                value={this.state.language}
                onChange={this.onHandleChange}
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
                name="vat"
                value={this.state.vat}
                onChange={this.onHandleChange}
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
              name="website"
              validators={['required', 'matchRegexp:^(?!mailto:)(?:(?:http|https|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$']}
              errorMessages={['this field is required', 'should be valid url']}
              value={this.state.website}
              onChange={this.onHandleChange}
              size="small" label="Website" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel id="company-timezone-label">Timezone</InputLabel>
              <Select
                name="time_zone"
                value={this.state.time_zone}
                onChange={this.onHandleChange}
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
              name="description"
              value={this.state.description}
              onChange={this.onHandleChange}
              size="small" label="Description" variant="outlined" multiline rows={4} fullWidth/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextValidator 
              name="address"
              validators={['required']}
              errorMessages={['this field is required']}
              value={this.state.address}
              onChange={this.onHandleChange}
              size="small" label="Address" variant="outlined" fullWidth/>
          </Grid>
        </Grid>
        <div style={{padding:15}}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </div>
      </ValidatorForm>
    </Paper>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.company.loading,
  company: state.company.company
});

//const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps)(CompanyInfo);
