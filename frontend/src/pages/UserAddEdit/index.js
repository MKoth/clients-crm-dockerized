import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { userActions } from '../../actions/UserActions';
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, Button,
  InputLabel, Select, MenuItem
} from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { permissionUsersActions } from '../../actions/PermissionUserActions';
import { groupActions } from '../../actions/GroupActions';
import { StyledDropzone } from '../../common/uploader-component';
import urls from '../../api/ApiUrl';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

class UserAddEdit extends Component {
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
      description:'',
      image:null,
      group:'',
      phone:'',
      isImageUpdated: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onImageChange = this.onImageChange.bind(this);
    this.getImageUrlOrBlob = this.getImageUrlOrBlob.bind(this);
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
    if(this.state.id!=='add'){
      dispatch(permissionUsersActions.updateUser(this.state.id, send_data));
    }
    else{
      dispatch(permissionUsersActions.createUser(company.id, this.state));
    }
    this.setState({
      isImageUpdated: false
    });
  }

  componentDidMount(){
    const id = this.props.match.params.user_id;
    this.setState({
      id
    });
    const { dispatch, company } = this.props;
    if(id!=='add'){
      dispatch(permissionUsersActions.getUser(id));
    }
    dispatch(groupActions.getAll(company.id));

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
    if(prevProps.user!==this.props.user){
      console.log(this.props.user);
      this.setState({
        ...{...this.props.user, group: this.props.user.group.id}
      });
    }
  }

  getImageUrlOrBlob(){
    return !this.state.isImageUpdated&&(typeof this.state.image === 'string')?urls.url+this.state.image:this.state.image
  }

  render() {
    const {groups} = this.props;
    return (
      <>
        <Breadcrumbs aria-label="breadcrumb">
          <LinkRouter color="inherit" to="/dashboard/services">
            Services
          </LinkRouter>
          <Typography color="textPrimary">User info</Typography>
        </Breadcrumbs>

        <ValidatorForm onError={errors => console.log(errors)} onSubmit={this.onSave}>
          <Grid container spacing={3}>
            <Grid item container spacing={3} xs={12} sm={8}>
              <Grid item xs={12}>
                <Paper elevation={0} style={{padding:15}}>
                  <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
                    <h4>User Info</h4>
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
                      <TextValidator
                        value={this.state.user.first_name}
                        onChange={this.handleUserChange}
                        name="first_name"
                        validators={['required', 'minStringLength:3']}
                        errorMessages={['this field is required', 'should be at least 3 characters long']}
                        size="small" label="First name" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                        value={this.state.description}
                        onChange={this.handleChange}
                        name="description"
                        size="small" label="Description" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextValidator 
                        value={this.state.user.last_name}
                        onChange={this.handleUserChange}
                        name="last_name"
                        validators={['required', 'minStringLength:3']}
                        errorMessages={['this field is required', 'should be at least 3 characters long']}
                        size="small" label="Last name" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel id="service-select-group">Group</InputLabel>
                        <Select
                          value={this.state.group&&groups.length?this.state.group:''}
                          onChange={this.handleChange}
                          name="group"
                          labelId="user-select-group"
                          label="Group"
                        >
                          <MenuItem>- Select permission group -</MenuItem>
                          {groups.map(group=><MenuItem key={group.id} value={group.id}>{group.title}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>
                    {this.state.id==='add'&&<><Grid item sm={6} xs={12}>
                      <TextValidator 
                        value={this.state.user.password1}
                        onChange={this.handleUserChange}
                        type="password"
                        name="password1"
                        validators={['required', 'minStringLength:6']}
                        errorMessages={['this field is required', 'should be at least 6 characters long']}
                        size="small" label="Password" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextValidator 
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={['this field is required', 'password should match']}
                        name="password2"
                        value={this.state.user.password2}
                        onChange={this.handleUserChange}
                        type="password" size="small" label="Repeat password" variant="outlined" fullWidth/>
                    </Grid></>}
                    <Grid item container xs={12} direction="row" justify="center" alignItems="center">
                      <Button type="submit">{this.state.id==='add'?'Create':'Update'} user</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid item container spacing={3} xs={12} sm={4}>
              <Grid item xs={12}>
                <Paper elevation={0} style={{padding:15}}>
                  <h4>User's profile image</h4>
                  <Grid container spacing={2}>
                    <StyledDropzone onImageChange={this.onImageChange} 
                      preview={this.getImageUrlOrBlob()} />
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0} style={{padding:15}}>
                  <h4>User's contacts</h4>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextValidator
                        value={this.state.phone}
                        onChange={this.handleChange}
                        name="phone"
                        validators={['required', 'minStringLength:5']}
                        errorMessages={['this field is required', 'should be at least 3 characters long']}
                        size="small" label="Phone" variant="outlined" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator 
                        value={this.state.user.email}
                        onChange={this.handleUserChange}
                        name="email"
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'is not valid email']}
                        size="small" label="Email" variant="outlined" fullWidth/>
                    </Grid>
                  </Grid>
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
  loading: state.permissionUser.loading,
  company: state.company.company,
  user: state.permissionUser.user,
  groups: state.group.groups
});

export default connect(mapStateToProps)(UserAddEdit);