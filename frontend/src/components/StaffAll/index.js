import React, { Fragment, Component } from "react";
import { Row, Col, Button } from "reactstrap";
import {
  Grid,
  Table,
  TableSelection,
  TableHeaderRow,
  PagingPanel,
  Toolbar,
  SearchPanel
} from "@devexpress/dx-react-grid-bootstrap4";
import { 
  SelectionState, 
  PagingState, 
  IntegratedPaging, 
  SortingState,
  IntegratedSorting,
  SearchState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import { ToolbarButton } from '../../common/table-plugins/toolbar-button'
import { connect } from "react-redux";
import { staffActions } from '../../actions/StaffActions';
import { serviceActions } from '../../actions/ServiceActions';
import moment from 'moment';
import { history } from '../../utils/history';
import urls from '../../api/ApiUrl';

class StaffAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Image", name: "image" },
        { title: "Name", name: "name" },
        { title: "Title", name: "title" },
        { title: "Status", name: "status" },
        { title: "Services", name: "services" },
        { title: "Action", name: "action" },
      ],
      rows: [],
      tableColumnExtensions: [{ columnName: 'image', width: 50 }, { columnName: 'services', width: 300 }]
    };
    //this.updateTable = this.updateTable.bind(this);
    this.addActionBtn = this.addActionBtn.bind(this);
    this.getServicesList = this.getServicesList.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.staffs!==this.props.staffs){
      this.updateTable();
    }
    if(prevProps.services!==this.props.services){
      this.updateTable();
    }
  }

  addActionBtn = ({id}) => {
    return (
        <Button
          color="primary"
          size="sm"
          onClick={()=>{history.push('staff/'+id);}}
        >
            EDIT
        </Button>
    );
  };

  getServicesList(ss_fields){
    let srvs_list = [];
    const {services} = this.props;
    if(!services.length)
      return ss_fields.join();
    ss_fields.forEach(field=>{
      const service = services.find(srv=>srv.id===field.service);
      srvs_list.push(service.title);
    });
    return srvs_list.join();
  }

  addImage = ({src}) => {
    return (
      src?<img width="40" src={urls.url+src}/>:<></>
    );
  }

  updateTable(){
    const { staffs } = this.props;
    let newRows = [];
    staffs.forEach(staff => {
      newRows.push({
        image: this.addImage.call(this, {src:staff.image}),
        name: staff.user.first_name+" "+staff.user.last_name,
        title: staff.position,
        status: staff.active?'Active':'Not active',
        services: this.getServicesList(staff.service_staff_field),
        action: this.addActionBtn.call(this, {id:staff.id})
      });
    });
    this.setState({
      rows: newRows
    });
  }

  componentDidMount(){
    const { dispatch, company, staffs } = this.props;
    dispatch(staffActions.getAll(company.id));
    dispatch(serviceActions.getAll(company.id));
    if(staffs.length){
      this.updateTable();
    }
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md="12">
            <Grid rows={this.state.rows} columns={this.state.columns}>
              <SortingState
                defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
              />
              <SearchState defaultValue="" />
              <IntegratedFiltering />
              <IntegratedSorting />
              <PagingState
                defaultCurrentPage={0}
                defaultPageSize={5}
              />
              <IntegratedPaging />
              <Table columnExtensions={this.state.tableColumnExtensions}/>
              <TableHeaderRow showSortingControls />
              {this.state.rows.length>5&&<PagingPanel
                pageSizes={[5, 15, 25, 0]}
              />}
              <Toolbar/>
              <ToolbarButton onClick={()=>{history.push('staff/add')}} buttonText={'ADD STAFF'}/>
              <SearchPanel />
            </Grid>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.staff.loading,
  staffs: state.staff.staffs,
  services: state.service.services,
  company: state.company.company
});

export default connect(mapStateToProps)(StaffAll);