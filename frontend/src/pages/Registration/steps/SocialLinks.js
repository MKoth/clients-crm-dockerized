import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, Button
} from "@material-ui/core";

class SocialLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socials:this.props.data
    };
    this.onSocialChanged = this.onSocialChanged.bind(this);
    this.removeSocial = this.removeSocial.bind(this);
    this.addSocial = this.addSocial.bind(this);
  }

  onSocialChanged(e, social, type){
    const {socials} = this.state;
    social[type] = e.target.value;
    this.setState({
      socials:[...socials]
    });
  }

  removeSocial(removedSocial){
    const {socials} = this.state;
    this.setState({
      socials: socials.filter(social=>social!==removedSocial)
    });
  }

  addSocial(){
    const {socials} = this.state;
    socials.push({title:'', link:''});
    this.setState({
      socials:[...socials]
    });
  }

  render() {
    const {socials} = this.state;
    return (
      <Paper elevation={0} style={{padding:15}}>
        <Grid container spacing={3}>
          {socials.map((social, index)=><Grid key={index} item xs={12} container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField size="small" label="Social name" variant="outlined" value={social.title} onChange={(e)=>{this.onSocialChanged(e, social, 'title')}} fullWidth/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField size="small" label="Social link" variant="outlined" value={social.link} onChange={(e)=>{this.onSocialChanged(e, social, 'link')}} fullWidth/>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button onClick={()=>{this.removeSocial(social)}}>Remove social</Button>
              </Grid>
            </Grid>)
          }
          <Button onClick={this.addSocial}>Add social</Button>
        </Grid>
        <div style={{padding:15}}>
          <Button
            type="submit"
            onClick={this.props.onBack}
          >
            Back
          </Button>
          <Button onClick={()=>{this.props.onNext(this.state.socials)}} variant="contained" color="primary">
            Finish
          </Button>
        </div>
      </Paper>
    );
  }
}

export default SocialLinks;
