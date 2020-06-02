import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { serviceActions } from '../../actions/ServiceActions';
import { staffActions } from '../../actions/StaffActions';
import { categoryActions } from '../../actions/CategoryActions';
//import './index.css';

import moment from 'moment';
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link,
  Select, InputLabel, MenuItem, Checkbox, Input, Button
} from "@material-ui/core";
import { history } from '../../utils/history';
import { Link as RouterLink } from 'react-router-dom';
import { ValidatorForm, TextValidator, SelectValidator} from 'react-material-ui-form-validator';
import { StyledDropzone } from '../../common/uploader-component'
import urls from '../../api/ApiUrl';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

class CategoryAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: '',
      active: true,
      language:'en',
      type:'person',
      category: '',
      price:0,
      hours:1,
      minutes:0,
      interval:15,
      description:'',
      image:null,
      staff_service_field:[],
      isImageUpdated: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onSave = this.onSave.bind(this);
    this.getImageUrlOrBlob = this.getImageUrlOrBlob.bind(this);
  }

  handleChecked(e, staff){
    if(e.target.checked){
      this.state.staff_service_field.push({staff:staff.id, service:null});
    }
    else{
      this.state.staff_service_field = this.state.staff_service_field.filter(ssf=>ssf.staff!==staff.id)
    }
    this.setState({
      staff_service_field: [...this.state.staff_service_field]
    });
  }

  onImageChange(image){
    this.setState({
      isImageUpdated: true,
      image
    });
  }

  handleSwitch(event) {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSave(){
    const { company, dispatch } = this.props;
    let send_data = {
      ...this.state,
      category: this.state.category?this.state.category:null
    };
    if(!send_data.isImageUpdated)
      delete send_data.image;
    if(this.state.id==='add'){
      dispatch(serviceActions.createService(company.id, this.state));
    }
    else{
      dispatch(serviceActions.updateService(this.state.id, send_data));
    }
    this.setState({
      isImageUpdated: false
    });
  }

  componentDidMount(){
    const id = this.props.match.params.service_id;
    this.setState({
      id
    });
    const { dispatch, company } = this.props;
    if(id!=='add'){
      dispatch(serviceActions.getService(id));
    }
    dispatch(staffActions.getAll(company.id));
    dispatch(categoryActions.getAll(company.id));
  }

  componentDidUpdate(prevProps){
    if(prevProps.service!==this.props.service){
      this.setState({
        ...this.props.service
      });
    }
    /*if(prevProps.staffs!==this.props.staffs){
      
      this.props.staffs.forEach(staff=>{
        console.log(this.state.staff_service_field.find(ssf=>ssf.staff===staff.id));
      });
      
    }*/
  }

  getImageUrlOrBlob(){
    return !this.state.isImageUpdated&&(typeof this.state.image === 'string')?urls.url+this.state.image:this.state.image
  }

  render() {
    return (
      <>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter color="inherit" to="/dashboard/services">
          Services
        </LinkRouter>
        <Typography color="textPrimary">{this.state.id==='add'?'Add new':'Update'} service</Typography>
      </Breadcrumbs>
      <ValidatorForm onError={errors => console.log(errors)} onSubmit={this.onSave}>
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={12} sm={8}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
                  <h4>Service Info</h4>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.active}
                        onChange={this.handleSwitch}
                        name="active"
                        color="primary"
                      />
                    }
                    label="Active"
                  />
                </Grid>
                <Grid container spacing={2}>
                  <Grid item sm={6} xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel id="language-select-label">Language</InputLabel>
                      <Select
                        value={this.state.language}
                        onChange={this.handleChange}
                        name="language"
                        labelId="language-select-label"
                        label="Language"
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
                  <Grid item sm={7} xs={12}>
                    <TextValidator
                      value={this.state.title}
                      onChange={this.handleChange}
                      name="title"
                      validators={['required']}
                      errorMessages={['this field is required']} 
                      size="small" label="Title" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel id="service-select-category">Select category</InputLabel>
                      <Select
                        value={this.state.category||''}
                        onChange={this.handleChange}
                        name="category"
                        labelId="service-select-category"
                        label="Select category"
                      >
                        {this.props.categories.map(cat=><MenuItem key={cat.id} value={cat.id}>{cat.title}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={7} xs={12}>
                    <TextField disabled={true} size="small" label="Displayed name" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel id="service-select-type">Type</InputLabel>
                      <Select
                        value={this.state.type}
                        onChange={this.handleChange}
                        name="type"
                        labelId="service-select-type"
                        label="Type"
                      >
                        <MenuItem value={'groups'}>For groups</MenuItem>
                        <MenuItem value={'person'}>For individuals</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={7} xs={12}>
                    <TextField disabled={true} size="small" label="Name on bill" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <TextValidator
                      value={this.state.price}
                      onChange={this.handleChange}
                      name="price"
                      validators={['required', 'isNumber', 'minNumber:0']}
                      errorMessages={['this field is required', 'should be a number', 'should be equal or more than 0']}  
                      size="small" label="Price" variant="outlined" fullWidth/>
                  </Grid>
                  <h4>Duration</h4>
                  <Grid item container spacing={2} direction="row" justify="flex-start" alignItems="center" xs={12}>
                    <Grid item sm={2} md={3} xs={8}>
                      <TextValidator
                        value={this.state.hours}
                        onChange={this.handleChange}
                        name="hours"
                        validators={['required', 'isNumber', 'minNumber:0', 'maxNumber:12']}
                        errorMessages={['this field is required', 'should be a number', 'should be equal or more than 0', 'should be equal or less than 12']} 
                        size="small" label="Hrs" variant="outlined"/>
                    </Grid>
                    <p style={{margin:0, marginLeft:5, marginRight:10}}>h</p>
                    <Grid item sm={2} md={3} xs={8}>
                      <TextValidator
                        value={this.state.minutes}
                        onChange={this.handleChange}
                        name="minutes"
                        validators={['required', 'isNumber', 'minNumber:0', 'maxNumber:59']}
                        errorMessages={['this field is required', 'should be a number', 'should be equal or more than 0', 'should be equal or less than 59']} 
                        size="small" label="Min" variant="outlined"/>
                    </Grid>
                    <p style={{margin:0, marginLeft:5, marginRight:10}}>m</p>
                    <Grid item sm={2} md={3} xs={8}>
                      <TextValidator
                        value={this.state.interval}
                        onChange={this.handleChange}
                        name="interval"
                        validators={['required', 'isNumber', 'minNumber:5', 'maxNumber:60']}
                        errorMessages={['this field is required', 'should be a number', 'should be equal or more than 5', 'should be equal or less than 60']} 
                        size="small" label="Interval(min.)" variant="outlined"/>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <TextValidator
                      value={this.state.description}
                      onChange={this.handleChange}
                      name="description"
                      validators={['required']}
                      errorMessages={['this field is required']} 
                      multiline
                      rows={5}
                      size="small" label="Description" variant="outlined" fullWidth />
                  </Grid>
                  <Grid item container xs={12} direction="row" justify="center" alignItems="center">
                    <Button type="submit">{this.state.id=='add'?'Save':'Update'} service</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item container spacing={3} xs={12} sm={4}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Cover</h4>
                <StyledDropzone onImageChange={this.onImageChange} preview={this.getImageUrlOrBlob()}/>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Staff</h4>
                <FormControl component="fieldset">
                  <FormGroup>
                    {this.props.staffs.map(staff=><FormControlLabel
                      key={staff.id}
                      control={<Checkbox 
                        checked={this.state.staff_service_field.find(ssf=>ssf.staff===staff.id)!==undefined} 
                        onChange={(e)=>{this.handleChecked(e, staff)}}
                        name={staff.id+''} />}
                      label={staff.user.first_name+" "+staff.user.last_name}
                    />)}
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </ValidatorForm>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.service.loading,
  company: state.company.company,
  service: state.service.service,
  staffs: state.staff.staffs,
  categories: state.category.categories
});

export default connect(mapStateToProps)(CategoryAddEdit);