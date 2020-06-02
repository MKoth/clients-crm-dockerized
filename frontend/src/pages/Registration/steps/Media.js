import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link, Button
} from "@material-ui/core";

import Dropzone from "react-dropzone";

class Media extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
    this.onFilesAccepted = this.onFilesAccepted.bind(this);
  }

  onFilesAccepted(file, name){
    this.setState({
      [name]:file
    });
  }

  render() {
    return (
      <Paper elevation={0} style={{padding:15}}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <h3>Logo</h3>
            <Dropzone
              multiple={false}
              accept={'image/*'}
              onDrop={acceptedFiles => this.onFilesAccepted(acceptedFiles[0], 'logo')}
            >
              {({ getRootProps, getInputProps }) => (<section className="dropzone">
                  <span className="pe-7s-file" />
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some file here, or click to select file</p>
                    <p>Uploaded file: {this.state.logo?this.state.logo.name:'No file'}</p>
                  </div>
                </section>
              )}
            </Dropzone> 
          </Grid>
          <Grid item xs={12} sm={6}>
            <h3>Cover</h3>
            <Dropzone
              multiple={false}
              accept={'image/*'}
              onDrop={acceptedFiles => this.onFilesAccepted(acceptedFiles[0], 'cover')}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="dropzone">
                  <span className="pe-7s-file" />
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some file here, or click to select file</p>
                    <p>Uploaded file: {this.state.cover?this.state.cover.name:'No file'}</p>
                  </div>
                </section>
              )}
            </Dropzone> 
          </Grid>
        </Grid>
        <div style={{padding:15}}>
          <Button
            type="submit"
            onClick={this.props.onBack}
          >
            Back
          </Button>
          <Button onClick={()=>{this.props.onNext(this.state)}} variant="contained" color="primary">
            Next
          </Button>
        </div>
      </Paper>
      
    );
  }
}

export default Media;
