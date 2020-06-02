import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { groupActions } from '../../actions/GroupActions';
import { permissionUsersActions } from '../../actions/PermissionUserActions';
import { UsersDialog } from './users-dialog';
import './index.css';

import moment from 'moment';
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, Button
} from "@material-ui/core";
import { history } from '../../utils/history';
import { Link as RouterLink } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PersonIcon from '@material-ui/icons/Person';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const permissions = ['users', 'staff', 'services', 'categories', 'company', 'widget', 'sales']

class GroupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title:'',
      description:'',
      permissions:'',
      userDialogOpen: false,
      user_company_group_field:[]
    };
    this.onSave = this.onSave.bind(this);
    this.isPermissionChecked = this.isPermissionChecked.bind(this);
    this.handlePermissionSwitch = this.handlePermissionSwitch.bind(this);
    this.getScopeValue = this.getScopeValue.bind(this);
    this.handleScopeChange = this.handleScopeChange.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.getNonSelectedUsers = this.getNonSelectedUsers.bind(this);
    this.addUsersFromDialog = this.addUsersFromDialog.bind(this);
  }

  addUsersFromDialog(newUsers){
    const { user_company_group_field } = this.state;
    this.setState({
      user_company_group_field: [...user_company_group_field, ...newUsers]
    });
  }

  removeUser(user_id){
    const { user_company_group_field } = this.state;
    this.setState({
      user_company_group_field: user_company_group_field.filter(user=>user.id!==user_id)
    });
  }

  getNonSelectedUsers(){
    const {users} = this.props;
    const {user_company_group_field} = this.state;
    return users.filter(user=>{
      if(user_company_group_field.find(usr=>usr.id===user.id))
        return false;
      return true;
    });
  }

  isPermissionChecked(permission){
    return this.state.permissions.search(permission)!==-1;
  }

  handlePermissionSwitch(event){
    const { permissions } = this.state;
    const permission = event.target.name;
    let permissionsArr = permissions===''?[]:this.state.permissions.split(',');
    if(event.target.checked){
      permissionsArr.push(permission+'_view');
    }
    else{
      permissionsArr = permissionsArr.filter(perm=>perm.search(permission)===-1)
    }
    this.setState({
      permissions: permissionsArr.join()
    });
  }

  getScopeValue(permission){
    const { permissions } = this.state;
    return permissions.search(permission+'_edit')===-1?'view':'edit';
  }

  handleScopeChange(value, permission){
    let { permissions } = this.state;
    permissions = permissions.split(',').map(perm=>perm.search(permission)!==-1?permission+'_'+value:perm)
    this.setState({
      permissions: permissions.join()
    });
  }

  onSave(){
    const { dispatch } = this.props;
    dispatch(groupActions.updateGroup(this.state.id, this.state));
  }

  componentDidUpdate(prevProps){
    if(prevProps.group.id !== this.props.group.id){
      const { group } = this.props;
      this.setState({
        ...group
      });
    }
  }

  componentDidMount(){
    const group_id = this.props.match.params.group_id;
    const { dispatch, users, company } = this.props;
    dispatch(groupActions.getGroup(group_id));
    if(users.length === 0){
      dispatch(permissionUsersActions.getUsers(company))
    }
  }

  render() {
    const {user_company_group_field} = this.state;
    return (
      <>
      <Breadcrumbs aria-label="breadcrumb">
        <LinkRouter color="inherit" to="/dashboard/users#groups">
          Groups
        </LinkRouter>
        <Typography color="textPrimary">Add new group</Typography>
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12} sm={8}>
          <ValidatorForm onError={errors => console.log(errors)} onSubmit={this.onSave}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Settings</h4>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <TextField size="small" label="Group name" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField size="small" label="Description" variant="outlined" fullWidth/>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Permissions</h4>

                <Grid container spacing={2}>
                  {permissions.map(permission=>(
                    <Grid key={permission} item xs={12} sm={4} md={3}>
                      <Paper elevation={3} style={{padding:15}}>
                        <FormGroup>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={()=>{this.isPermissionChecked(permission)}}
                                onChange={this.handlePermissionSwitch}
                                name={permission}
                                color="primary"
                              />
                            }
                            label={permission}
                          />
                          <FormControl style={{marginLeft:10}} component="fieldset">
                            <RadioGroup
                              value={this.getScopeValue(permission)} 
                              onChange={(e)=>{this.handleScopeChange(e.target.value, permission)}}
                              aria-label="permission" name={'scope_'+permission}
                            >
                              <FormControlLabel disabled={!this.isPermissionChecked(permission)} value="view" control={<Radio />} label="View" />
                              <FormControlLabel disabled={!this.isPermissionChecked(permission)} value="edit" control={<Radio />} label="Edit" />
                            </RadioGroup>
                          </FormControl>
                        </FormGroup>
                      </Paper>
                    </Grid>
                  ))}
                  <Button type="submit">Update group</Button>
                </Grid>

              </Paper>
            </Grid>
          </ValidatorForm>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} style={{padding:15}}>
            <h4>Users</h4>
            <Grid container spacing={1}>

              {user_company_group_field.map(user=>(
                <Grid item xs={12} className="group-user-profile-cart">
                <Paper style={{padding:15}}>
                  <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                      <ButtonBase>
                        {user.image?<img width="50" style={{borderRadius:30}} src={user.image} />:<PersonIcon />}
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Typography variant="body2" gutterBottom>
                          {user.user.first_name+' '+user.user.last_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user.user.email}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <ButtonBase onClick={()=>{this.removeUser(user.id)}}>
                        <Typography className="group-user-profile-cart-remove-button" variant="body2">
                          Remove
                        </Typography>
                      </ButtonBase>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              ))}
              
              <Grid item container spacing={2} direction="row" justify="space-between" alignItems="center">
                <Grid item>
                  <ButtonBase onClick={()=>{this.setState({userDialogOpen:true})}}>
                    <div className="group-user-profile-cart-add-button">+</div>
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Typography variant="body2" style={{color:'#7f9f22', fontWeight:'bold'}} onClick={()=>{this.setState({userDialogOpen:true})}}>
                      Add user to the group
                    </Typography>
                    <UsersDialog users={this.getNonSelectedUsers()} open={this.state.userDialogOpen} onClose={(selectedUsers)=>{this.addUsersFromDialog(selectedUsers); this.setState({userDialogOpen:false});}} />
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
      </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.group.loading,
  group: state.group.group,
  users: state.permissionUser.users,
  company: state.company.company
});

export default connect(mapStateToProps)(GroupEdit);