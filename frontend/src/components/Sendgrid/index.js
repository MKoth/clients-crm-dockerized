import React, { Fragment, Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import Swal from "sweetalert2";

export default class Sendgrid extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Col md="12">
            <Row>
              <Col md="6">
                <Form>
                  <FormGroup>
                    <Label>Token</Label>
                    <Input type="text" name="token" placeholder="" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email</Label>
                    <Input type="text" name="email" placeholder="" />
                  </FormGroup>
                </Form>
              </Col>
              <Col md="6" />
            </Row>
            <Row>
              <Col md="12" className="text-center">
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
          </Col>
        </Row>
      </Fragment>
    );
  }
}
