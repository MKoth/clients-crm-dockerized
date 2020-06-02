import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { categoryActions } from '../../actions/CategoryActions';
//import './index.css';

import moment from 'moment';
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link,
  Select, InputLabel, MenuItem, Checkbox, Button
} from "@material-ui/core";
import { history } from '../../utils/history';
import { Link as RouterLink } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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
      audience: '',
      parent: '',
      isImageUpdated: false
    };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  onSave(){
    const { company, dispatch } = this.props;
    let send_data = {...this.state};
    if(!send_data.isImageUpdated)
      delete send_data.image;
    if(this.state.id==='add'){
      dispatch(categoryActions.createCategory(company.id,this.state));
    }
    else{
      dispatch(categoryActions.updateCategory(this.state.id, send_data));
    }
    this.setState({
      isImageUpdated: false
    });
  }

  componentDidMount(){
    const id = this.props.match.params.category_id;
    this.setState({
      id
    });
    const { dispatch, company } = this.props;
    if(id!=='add'){
      dispatch(categoryActions.getCategory(id));
    }
    dispatch(categoryActions.getAll(company.id));
  }

  componentDidUpdate(prevProps){
    if(prevProps.category!==this.props.category){
      this.setState({
        ...this.props.category
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
          Categories
        </LinkRouter>
        <Typography color="textPrimary">Category info</Typography>
      </Breadcrumbs>
      <ValidatorForm onError={errors => console.log(errors)} onSubmit={this.onSave}>
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={12} sm={8}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <Grid container spacing={2} direction="row" justify="space-between" alignItems="center">
                  <h4>Category Info</h4>
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
                      <InputLabel id="category-select-audience">Service audience</InputLabel>
                      <Select
                        value={this.state.audience}
                        onChange={this.handleChange}
                        name="audience"
                        labelId="category-select-audience"
                        label="Service audience"
                      >
                        <MenuItem value={'woman'}>Woman</MenuItem>
                        <MenuItem value={'man'}>Man</MenuItem>
                        <MenuItem value={'all'}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item sm={7} xs={12}>
                    <TextField disabled={true} size="small" label="Displayed name" variant="outlined" fullWidth/>
                  </Grid>
                  <Grid item sm={5} xs={12}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <Select
                        displayEmpty={true}
                        value={this.state.parent||''}
                        onChange={this.handleChange}
                        name="parent"
                        labelId="category-select-parent"
                      >
                        <MenuItem value={''}>No parent</MenuItem>
                        {this.props.categories.map(cat=>(cat.id!==this.state.id?<MenuItem key={cat.id} value={cat.id}>{cat.title}</MenuItem>:null))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item container xs={12} direction="row" justify="center" alignItems="center">
                    <Button type="submit">Save category</Button>
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
            {/*<Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <h4>Staff</h4>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox name="gilad" />}
                      label="Gilad Gray"
                    />
                    <FormControlLabel
                      control={<Checkbox name="jason" />}
                      label="Jason Killian"
                    />
                    <FormControlLabel
                      control={<Checkbox name="antoine" />}
                      label="Antoine Llorca"
                    />
                  </FormGroup>
                </FormControl>
              </Paper>
            </Grid>*/}
          </Grid>
        </Grid>
      </ValidatorForm>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.group.loading,
  category: state.category.category,
  categories: state.category.categories,
  company: state.company.company
});

export default connect(mapStateToProps)(CategoryAddEdit);