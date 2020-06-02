import React, { Fragment, Component } from "react";
import { Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { companyActions } from '../../actions/CompanyActions';
import { 
  Paper
} from "@material-ui/core";
import './index.css';

class CompanySocial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_editing: false,
      editing_index: 0,
      editing_title: '',
      editing_link: '',
      adding_title: '',
      adding_link: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onAddChange = this.onAddChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
  }

  onChange(e){
    this.setState({
      ['editing_'+e.target.name]: e.target.value
    });
  }

  onAddChange(e){
    this.setState({
      ['adding_'+e.target.name]: e.target.value
    });
  }

  onSave(){
    const { dispatch, socials } = this.props;
    const { editing_title, editing_link } = this.state;
    const updated_social = socials.find(social=>social.id===this.state.editing_index);
    updated_social.title = editing_title;
    updated_social.link = editing_link;
    this.setState({
      editing_index:0
    });
    //update api
    dispatch(companyActions.updateSocial(updated_social.id, updated_social))
  }

  onCancel(){
    this.setState({
      editing_index:0
    });
  }

  onAddNew(){
    const { dispatch, company } = this.props;
    const new_social = {title: this.state.adding_title, link: this.state.adding_link, company: company.id}
    this.setState({
      adding_title: '',
      adding_link: ''
    });
    //adding api
    dispatch(companyActions.createSocial(new_social))
  }

  onDelete(social_id){
    const { dispatch } = this.props;
    //delete here
    dispatch(companyActions.deleteSocial(social_id))
  }

  edit(social){
    this.setState({
      editing_index: social.id,
      editing_title: social.title,
      editing_link: social.link
    });
  }

  componentDidMount(){
    const { dispatch, company } = this.props;
    dispatch(companyActions.getSocials(company.id));
  }

  render() {
    return (
      <Fragment>

        {this.props.socials.map(social=><Paper elevation={3} className="serftopia-card-icons" key={social.id}>
          <Row>
            <Col md="5">
              {social.id!==this.state.editing_index&&<div>{social.title}</div>}
              {social.id===this.state.editing_index&&<Form>
                <FormGroup>
                  <Input type="text" name="title" placeholder="Social network name" value={this.state.editing_title} onChange={this.onChange}/>
                </FormGroup>
              </Form>}
            </Col>
            <Col md="5">
              {social.id!==this.state.editing_index&&<div><a href={social.link}>{social.link}</a></div>}
              {social.id===this.state.editing_index&&<Form>
                <FormGroup>
                  <Input type="text" name="link" placeholder="Link to socials" value={this.state.editing_link} onChange={this.onChange}/>
                </FormGroup>
              </Form>}
            </Col>
            <Col md="2">
              {social.id===this.state.editing_index&&<span className="pe-7s-close-circle serftopia-socials-icons" onClick={this.onCancel}></span>}
              {social.id===this.state.editing_index&&<span className="pe-7s-album serftopia-socials-icons" onClick={this.onSave}></span>}
              {social.id!==this.state.editing_index&&<span className="pe-7s-tools serftopia-socials-icons" onClick={this.edit.bind(this, social)}></span>}
              <span className="pe-7s-trash serftopia-socials-icons" onClick={()=>{this.onDelete(social.id)}}></span>
            </Col>
          </Row>
        </Paper>)}
        
        <Row>
          <Col md="5">
            <Form>
              <FormGroup>
                <Input type="text" name="title" placeholder="Social network name" value={this.state.adding_title} onChange={this.onAddChange}/>
              </FormGroup>
            </Form>
          </Col>
          <Col md="5">
            <Form>
              <FormGroup>
                <Input type="text" name="link" placeholder="Link to socials" value={this.state.adding_link} onChange={this.onAddChange}/>
              </FormGroup>
            </Form>
          </Col>
          <Col md="2" className="text-center">
            <FormGroup>
              <Button
                onClick={this.onAddNew}
                color="primary"
                disabled={this.state.adding_title.trim()===''||this.state.adding_link.trim()===''}
              >
                Add
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
  company: state.company.company,
  socials: state.company.socials
});

//const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps)(CompanySocial);
