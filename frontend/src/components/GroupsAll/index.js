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
import { groupActions } from '../../actions/GroupActions';
import moment from 'moment';
import { history } from '../../utils/history';

class GroupsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", name: "name" },
        { title: "Description", name: "description" },
        { title: "Users", name: "users" },
        { title: "Permissions", name: "permissions" },
        { title: "Action", name: "action" }
      ],
      rows: []
    };
    this.updateTable = this.updateTable.bind(this);
    this.addActionBtn = this.addActionBtn.bind(this);
  }

  componentDidUpdate(prevProps){
    if(prevProps.groups!==this.props.groups){
      this.updateTable();
    }
  }

  addActionBtn = ({id}) => {
    return (
        <Button
          color="primary"
          size="sm"
          onClick={()=>{history.push('group/'+id);}}
        >
            EDIT
        </Button>
    );
  };

  updateTable(){
    const { groups } = this.props;
    console.log(groups);
    //group_permission_group
    let newRows = [];
    groups.forEach(group => {//group.user_company_group_field.
      const users = group.user_company_group_field.map(user=>{
        return user.user.first_name?user.user.first_name+" "+user.user.last_name:user.user.username;
      });
      newRows.push({
        name: group.title,
        description: group.description?group.description:'No description',
        users: users.length?users.join(', '):'No useers assigned',
        permissions: group.permissions,
        action: this.addActionBtn.call(this, {id:group.id})
      });
    });
    this.setState({
      rows: newRows
    });
  }

  componentDidMount(){
    const { dispatch, company } = this.props;
    dispatch(groupActions.getAll(company.id));
    if(this.props.groups){
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
              <ToolbarButton onClick={()=>{history.push('group/add');}} buttonText={'ADD GROUP'}/>
              <SearchPanel />
            </Grid>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.group.loading,
  groups: state.group.groups,
  company: state.company.company
});

export default connect(mapStateToProps)(GroupsAll);