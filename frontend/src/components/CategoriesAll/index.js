import React, { Fragment, Component } from "react";
import { Row, Col, Button } from "reactstrap";
import {
  Grid,
  Table,
  TableSelection,
  TableTreeColumn,
  TableHeaderRow,
  
  PagingPanel,
  Toolbar,
  SearchPanel
} from "@devexpress/dx-react-grid-bootstrap4";
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import {
  SelectionState,
  TreeDataState,
  CustomTreeData,
  PagingState, 
  IntegratedPaging, 
  SortingState,
  IntegratedSorting,
  SearchState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";
import { ToolbarButton } from '../../common/table-plugins/toolbar-button'

import { connect } from "react-redux";
import { history } from '../../utils/history';
import { categoryActions } from "actions/CategoryActions";

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

class CategoriesAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Title",
          name: "title"
        },
        {
          title: "Status",
          name: "status"
        },
        {
          title: "Audience",
          name: "audience"
        },
        {
          title: "Action",
          name: "action"
        }
      ],
      rows: [],
      tableColumnExtensions: [{ columnName: 'title', width: 300 }, { columnName: 'id', width: 80 }]
    };
    
  }

  updateTable(){
    const { categories } = this.props;
    console.log(categories);
    //group_permission_group
    let newRows = [];
    categories.forEach(category => {
      newRows.push({
        id: category.id,
        title: category.title,
        status: category.active?'Active':'Not active',
        audience: category.audience,
        parentId: category.parent?category.parent:null,
        action: this.addActionBtn.call(this, {id:category.id})
      });
    });
    this.setState({
      rows: newRows
    });
  }

  addActionBtn = ({id}) => {
    return (
        <Button
          color="primary"
          size="sm"
          onClick={()=>{history.push('category/'+id);}}
        >
            EDIT
        </Button>
    );
  };

  componentDidMount(){
    const { dispatch, company } = this.props;
    dispatch(categoryActions.getAll(company.id));
    if(this.props.categories.length){
      this.updateTable();
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.categories!==this.props.categories){
      console.log('updated');
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
                  defaultSorting={[{ columnName: 'title', direction: 'asc' }]}
                />
              <SearchState defaultValue="" />
              <IntegratedFiltering />
              <IntegratedSorting />
              <PagingState
                defaultCurrentPage={0}
                defaultPageSize={5}
              />
              <IntegratedPaging />
              <TreeDataState />
              <CustomTreeData getChildRows={getChildRows} />
              <Table columnExtensions={this.state.tableColumnExtensions}/>
              <TableHeaderRow showSortingControls/>
              <TableTreeColumn for="title"/>
              {getChildRows(null, this.state.rows)&&getChildRows(null, this.state.rows).length>5&&<PagingPanel
                pageSizes={[5, 15, 25, 0]}
              />}
              <Toolbar/>
              <ToolbarButton onClick={()=>{history.push('category/add')}} buttonText={'ADD CATEGORY'}/>
              <SearchPanel />
            </Grid>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.category.loading,
  categories: state.category.categories,
  company: state.company.company
});

export default connect(mapStateToProps)(CategoriesAll);