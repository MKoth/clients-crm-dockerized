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
import { permissionUsersActions } from '../../actions/PermissionUserActions';
import moment from 'moment';
import { history } from '../../utils/history';

class UsersAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", name: "name" },
        { title: "Group", name: "group" },
        { title: "Email", name: "email" },
        { title: "Phone", name: "phone" },
        { title: "Last login", name: "last_login" },
        { title: "Status", name: "status" },
        { title: "Action", name: "action" },
      ],
      rows: []
    };
    this.updateTable = this.updateTable.bind(this);
    this.addActionBtn = this.addActionBtn.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.users!==this.props.users){
      this.updateTable();
    }
  }

  addActionBtn = ({id}) => {
    return (
        <Button
          color="primary"
          size="sm"
          onClick={()=>{history.push('user/'+id);}}
        >
            EDIT
        </Button>
    );
  };

  updateTable(){
    const { users } = this.props;
    let newRows = [];
    users.forEach(user => {
      newRows.push({
        name:user.user.first_name&&user.user.last_name?user.user.first_name+" "+user.user.last_name:user.user.username,
        group: user.group&&user.group.id?user.group.title:"No group",
        email: user.user.email,
        phone: user.phone,
        last_login: moment(user.user.last_login).format('DD.mm.YY, hh:mm'),
        status: user.active?"Active":"Disable",
        action: this.addActionBtn.call(this, {id:user.id})
      });
    });
    this.setState({
      rows: newRows
    });
  }

  componentDidMount(){
    const { dispatch, company } = this.props;
    dispatch(permissionUsersActions.getUsers(company.id));
    if(this.props.users){
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
              <Table />
              <TableHeaderRow showSortingControls />
              {this.state.rows.length>5&&<PagingPanel
                pageSizes={[5, 15, 25, 0]}
              />}
              <Toolbar/>
              <ToolbarButton onClick={()=>{history.push('/dashboard/user/add');}} buttonText={'ADD USER'}/>
              <SearchPanel />
            </Grid>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.user.loading,
  users: state.permissionUser.users,
  company: state.company.company
});

export default connect(mapStateToProps)(UsersAll);