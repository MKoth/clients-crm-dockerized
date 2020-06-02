import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { staffActions } from '../../actions/StaffActions';
import { serviceActions } from '../../actions/ServiceActions';
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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { StyledDropzone } from '../../common/uploader-component'
import urls from '../../api/ApiUrl';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

class StaffAddEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      active:true,
      user:{
        first_name:'',
        last_name:'',
        email:'',
        password1:'',
        password2:''
      },
      language:'en',
      position:'',
      description:'',
      booking:false,
      sex:'male',
      image:null,
      phone:'',
      service_staff_field:[],
      isImageUpdated: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.getImageUrlOrBlob = this.getImageUrlOrBlob.bind(this);
  }

  handleChecked(e, service){
    if(e.target.checked){
      this.state.service_staff_field.push({service:service.id, staff:null});
    }
    else{
      this.state.service_staff_field = this.state.service_staff_field.filter(ssf=>ssf.service!==service.id)
    }
    this.setState({
      service_staff_field: [...this.state.service_staff_field]
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

  handleUserChange(event){
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [event.target.name]: event.target.value,
      }
    });
  }

  onSave(){
    const { company, dispatch } = this.props;
    //dispatch(staffActions.createStaff(this.state, company.id));
    let send_data = {...this.state};
    if(!send_data.isImageUpdated)
      delete send_data.image;
    if(this.state.id!=='add'){
      dispatch(staffActions.updateStaff(this.state.id, send_data));
    }
    else{
      dispatch(staffActions.createStaff(company.id, this.state));
    }
    this.setState({
      isImageUpdated: false
    });
  }

  componentDidMount() {
    const id = this.props.match.params.staff_id;
    this.setState({
      id
    });
    const { dispatch, company } = this.props;
    if(id!=='add'){
      dispatch(staffActions.getStaff(id));
    }
    dispatch(serviceActions.getAll(company.id))

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.user.password1) {
          return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  componentDidUpdate(prevProps){
    if(prevProps.staff!==this.props.staff){
      console.log(this.props.staff);
      this.setState({
        ...this.props.staff
      });
    }
  }

  getImageUrlOrBlob(){
    return !this.state.isImageUpdated&&(typeof this.state.image === 'string')?urls.url+this.state.image:this.state.image
  }

  render() {
    return (
      <>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter color="inherit" to="/dashboard/services">
          Staff list
        </LinkRouter>
        <Typography color="textPrimary">{this.state.id==='add'?'Add new':'Update'} staff</Typography>
      </Breadcrumbs>
      <ValidatorForm onError={errors => console.log(errors)} onSubmit={this.onSave}>
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={12} sm={8}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
                  <h4>Staff user</h4>
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
                      value={this.state.user.first_name}
                      onChange={this.handleUserChange}
                      name="first_name"
                      validators={['required', 'minStringLength:3']}
                      errorMessages={['this field is required', 'should be at least 3 characters long']}
                      size="small" label="First name" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <TextValidator 
                      value={this.state.position}
                      onChange={this.handleChange}
                      name="position"
                      validators={['required']}
                      errorMessages={['this field is required']}
                      size="small" label="Position" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item sm={7} xs={12}>
                    <TextValidator
                      value={this.state.user.last_name}
                      onChange={this.handleUserChange}
                      name="last_name"
                      validators={['required', 'minStringLength:3']}
                      errorMessages={['this field is required', 'should be at least 3 characters long']}
                      size="small" label="Last name" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.booking}
                          onChange={this.handleSwitch}
                          name="booking"
                          color="primary"
                        />
                      }
                      label="Online booking"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup row aria-label="sex" name="sex" defaultValue="male" 
                        value={this.state.sex}
                        onChange={this.handleChange} 
                      >
                        <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                        <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      value={this.state.description}
                      onChange={this.handleChange}
                      name="description"
                      size="small" 
                      label="Staff description" 
                      multiline
                      rows="6" 
                      variant="outlined" 
                      fullWidth
                    />
                  </Grid>
                  <Grid item container xs={12} direction="row" justify="center" alignItems="center">
                    <Button type="submit">{this.state.id==='add'?'Create':'Update'} staff</Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>


            <Grid item container spacing={3} xs={12} sm={7}>
              <Grid item xs={12}>
                <Paper elevation={0} style={{padding:15}}>
                  <Grid item container spacing={2}>
                    <Grid item xs={12}>
                      <TextValidator 
                        value={this.state.user.email}
                        onChange={this.handleUserChange}
                        name="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'is not valid email']} 
                        size="small" label="Email" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        value={this.state.phone}
                        onChange={this.handleChange}
                        name="phone"
                        validators={['required', 'minStringLength:5']}
                        errorMessages={['this field is required', 'should be at least 3 characters long']}
                        size="small" label="Phone" variant="outlined" fullWidth/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            {this.state.id==='add'&&<Grid item container spacing={3} xs={12} sm={5}>
              <Grid item xs={12}>
                <Paper elevation={0} style={{padding:15}}>
                  <Grid item container spacing={2}>
                    <Grid item xs={12}>
                      <TextValidator 
                        value={this.state.user.password1}
                        onChange={this.handleUserChange}
                        type="password"
                        name="password1"
                        validators={['required', 'minStringLength:6']}
                        errorMessages={['this field is required', 'should be at least 6 characters long']}
                        size="small" label="Password" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator 
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={['this field is required', 'password should match']}
                        name="password2"
                        value={this.state.user.password2}
                        onChange={this.handleUserChange}
                        type="password" size="small" label="Repeat password" variant="outlined" fullWidth/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>}


          </Grid>
          <Grid item container spacing={3} xs={12} sm={4}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Staff's profile image</h4>
                <StyledDropzone onImageChange={this.onImageChange} preview={this.getImageUrlOrBlob()} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Services</h4>
                <FormControl component="fieldset">
                  <FormGroup>
                    {this.props.services.map(service=><FormControlLabel
                      key={service.id}
                      control={<Checkbox 
                        checked={this.state.service_staff_field.find(ssf=>ssf.service===service.id)!==undefined} 
                        onChange={(e)=>{this.handleChecked(e, service)}}
                        name={service.id+''} />}
                      label={service.title}
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
  loading: state.staff.loading,
  staff: state.staff.staff,
  company: state.company.company,
  services: state.service.services
});

export default connect(mapStateToProps)(StaffAddEdit);