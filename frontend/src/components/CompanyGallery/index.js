import React, { Fragment, Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";

class CompanyGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Col md="6">
            <Label>Photos</Label>
            <Dropzone
              multiple={true}
              onDrop={acceptedFiles => console.log(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="dropzone">
                  <span className="pe-7s-file" />
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag drop some files here, or click to select files</p>
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
                onClick={() => {
                  Swal.fire({
                    title: "Thank you!",
                    text: "Your info has been saved successfully!",
                    icon: "success",
                    confirmButtonColor: "#809f1d"
                  });
                }}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyGallery);
