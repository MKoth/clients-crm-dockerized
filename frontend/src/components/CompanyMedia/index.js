import React, { Fragment, Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import urls from '../../api/ApiUrl';
import {companyActions} from '../../actions/CompanyActions'
import './index.css';

class CompanyMedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoPreview: props.company.logo?urls.url+props.company.logo:null,
      coverPreview: props.company.cover?urls.url+props.company.cover:null,
      logoFile: null,
      coverFile: null,
      logoShouldUpdate: false,
      coverShouldUpdate: false,
    };
    this.updatePreview = this.updatePreview.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }
  updatePreview(name, file){
    if(this.state[name])
      URL.revokeObjectURL(this.state[name]);
    this.setState({
      [name+"Preview"]: file?URL.createObjectURL(file):null,
      [name+"File"]: file?file:null,
      [name+"ShouldUpdate"]:true
    });
  }
  saveChanges(){
    const { dispatch } = this.props;
    let images = [];
    if(this.state.logoShouldUpdate)
      images.push({name:'logo', file:this.state.logoFile});
    if(this.state.coverShouldUpdate)
      images.push({name:'cover', file:this.state.coverFile});
    console.log(companyActions);
    dispatch(companyActions.updateMedia(this.props.company.id, images));
  }
  componentWillUnmount(){
    URL.revokeObjectURL(this.state.logoPreview);
    URL.revokeObjectURL(this.state.coverPreview);
  }

  render() {
    const { logoPreview, coverPreview } = this.state;
    return (
      <Fragment>
        <Row>
          <Col md="6">
            <Label>Logo</Label>
            <Dropzone
              multiple={false}
              accept={'image/*'}
              onDrop={acceptedFiles => this.updatePreview('logo',acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="dropzone">
                  <span className="pe-7s-file" />
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {logoPreview?<div style={{width:'100%'}}>
                        <span className="company-media-close" onClick={(e)=>{e.stopPropagation();this.updatePreview('logo',null)}}>x</span>
                        <img src={logoPreview} style={{width: '100%'}}/>
                      </div>:
                      <p>Drag drop some file here, or click to select file</p>
                    }
                  </div>
                </section>
              )}
            </Dropzone>
          </Col>
          <Col md="6">
            <Label>Cover</Label>
            <Dropzone
              multiple={false}
              accept={'image/*'}
              onDrop={acceptedFiles => this.updatePreview('cover',acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="dropzone">
                  <span className="pe-7s-file" />
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {coverPreview?<div style={{width:'100%'}}>
                        <span className="company-media-close" onClick={(e)=>{e.stopPropagation();this.updatePreview('cover',null)}}>x</span>
                        <img src={coverPreview} style={{width: '100%'}}/>
                      </div>:
                      <p>Drag drop some file here, or click to select file</p>
                    }
                  </div>
                </section>
              )}
            </Dropzone>
          </Col>
        </Row>
        <Row>
          <Col md="12" className="text-center pt-3">
            <FormGroup>
              <Button
                disabled={!this.state.logoShouldUpdate&&!this.state.coverShouldUpdate}
                onClick={this.saveChanges}
                color="primary"
              >
                Update
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.company.loading,
  company: state.company.company
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps)(CompanyMedia);
