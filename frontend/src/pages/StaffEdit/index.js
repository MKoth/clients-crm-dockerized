import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { staffActions } from '../../actions/StaffActions';
//import './index.css';

import moment from 'moment';
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link,
  Select, InputLabel, MenuItem, Checkbox, Input
} from "@material-ui/core";
import { history } from '../../utils/history';
import { Link as RouterLink } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { StyledDropzone } from '../../common/uploader-component'

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

class StaffEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      active:true,
      user:{
        first_name:'',
        last_name:'',
        email:''
      },
      language:'en',
      position:'',
      description:'',
      sex:'',
      image:null,
      phone:'',
      booking: false,
      isImageUpdated: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
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
    let send_data = {...this.state};
    if(!send_data.isImageUpdated)
      delete send_data.image;
    dispatch(staffActions.updateStaff(this.state.id, send_data));
    this.setState({
      isImageUpdated: false
    });
  }

  componentDidMount(){
    const id = this.props.match.params.staff_id;
    this.setState({
      id
    });
    const { dispatch } = this.props;
    dispatch(staffActions.getStaff(id));
  }

  componentDidUpdate(prevProps){
    if(prevProps.staff!==this.props.staff){
      this.setState({
        ...this.props.staff
      });
    }
  }

  render() {
    return (
      <>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter color="inherit" to="/dashboard/services">
          Services
        </LinkRouter>
        <Typography color="textPrimary">Add new service</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <ValidatorForm onError={errors => console.log(errors)} onSubmit={this.onSave}>
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
                    <TextField disabled={true} size="small" label="Displayed name" variant="outlined" fullWidth/>
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
            {/*<Grid item container spacing={3} xs={12} sm={5}>
              <Grid item xs={12}>
                <Paper elevation={0} style={{padding:15}}>
                  <Grid item container spacing={2}>
                    <Grid item xs={12}>
                      <TextField size="small" label="Password" type="password" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField size="small" label="Repeat password" type="password" variant="outlined" fullWidth/>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>*/}


          </Grid>
          <Grid item container spacing={3} xs={12} sm={4}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Staff's profile image</h4>
                <StyledDropzone onImageChange={this.onImageChange} preview={this.state.image} />
              </Paper>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.staff.loading,
  staff: state.staff.staff,
  company: state.company.company
});

export default connect(mapStateToProps)(StaffEdit);