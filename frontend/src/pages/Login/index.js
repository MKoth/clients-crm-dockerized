import React, { Fragment, Component } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Button,
  CardBody,
  CardHeader,
  Container
} from "reactstrap";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { userActions } from '../../actions/UserActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem('key');
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      this.setState({ submitted: true })
      dispatch(userActions.login(email, password));
    }
  }

  render() {
    const { loading } = this.props;
    const { submitted } = this.state;
    return (
      <Fragment>
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md="3" />
            <Col md="6" className="mt-5">
              <Card className="p-3 mt-5">
                <CardHeader className="text-center">
                  Welcome to Serftopia!
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        name="email"
                        onChange={e => {
                          this.setState({ email: e.target.value });
                        }}
                        value={this.state.email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        name="password"
                        onChange={e => {
                          this.setState({ password: e.target.value });
                        }}
                        value={this.state.password}
                      />
                    </FormGroup>
                    <FormGroup className="text-center">
                      <Button
                        color="primary"
                      >
                        Log In
                      </Button>
                      {loading &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                    </FormGroup>
                    {submitted&&!loading&&<p style={{color:'red'}}>Email or password are incorrect, please try again!</p>}
                    <p style={{textAlign:'center', margin:0}}>Not registered yet ? <Link to={'/registration'}>Register here</Link></p>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="3" />
          </Row>
        </Container>
      </Fragment>
    );
  }
}


const mapStateToProps = state => ({
  loading: state.user.loading,
  user: state.user.user
});

/*const mapDispatchToProps = dispatch => ({
});*/

export default connect(mapStateToProps)(Login);
