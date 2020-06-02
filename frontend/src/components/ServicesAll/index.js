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
import { serviceActions } from '../../actions/ServiceActions';
import moment from 'moment';
import { history } from '../../utils/history';
import { companyActions } from "actions/CompanyActions";
import urls from '../../api/ApiUrl';

class ServicesAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Image", name: "image" },
        { title: "Title", name: "title" },
        { title: "Status", name: "status" },
        { title: "Category", name: "category" },
        { title: "Duration", name: "duration" },
        { title: "Price", name: "price" },
        { title: "Action", name: "action" },
      ],
      rows: [],
      tableColumnExtensions: [{ columnName: 'image', width: 50 }, { columnName: 'category', width: 300 }]
    };
    this.getCatHiearchy = this.getCatHiearchy.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.addActionBtn = this.addActionBtn.bind(this);
  }

  componentDidUpdate(prevProps){
    if(
      prevProps.services!==this.props.services ||
      prevProps.categories!==this.props.categories
    ){
      this.updateTable();
    }
  }

  addActionBtn = ({id}) => {
    return (
      <Button
        color="primary"
        size="sm"
        onClick={()=>{history.push('service/'+id);}}
      >
          EDIT
      </Button>
    );
  };

  addImage = ({src}) => {
    return (
      src?<img width="40" src={urls.url+src}/>:<></>
    );
  }

  getCatHiearchy(catId){
    if(!catId)
      return 'No category';
    const { categories } = this.props;
    let category = categories.find(cat=>cat.id===catId);
    let str = category.title;
    if(category.parent){
      str = this.getCatHiearchy(category.parent)+'->'+str;
    }
    return str;
  }

  updateTable(){
    const { services, categories } = this.props;
    console.log(categories);
    let newRows = [];
    services.forEach(service => {
      newRows.push({
        image: this.addImage.call(this, {src: service.image}),
        title: service.title,
        status: service.active?'Active':'Inactive',
        category: categories.length?this.getCatHiearchy(service.category):service.category,
        duration: service.hours+'h '+service.minutes+'m',
        price: service.price,
        action: this.addActionBtn.call(this, {id:service.id})
      });
    });
    this.setState({
      rows: newRows
    });
  }

  componentDidMount(){
    const { dispatch, company, services } = this.props;
    dispatch(serviceActions.getAll(company.id));
    if(services.length){
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
              <ToolbarButton onClick={()=>{history.push('service/add')}} buttonText={'ADD SERVICE'}/>
              <SearchPanel />
            </Grid>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.service.loading,
  services: state.service.services,
  categories: state.category.categories,
  company: state.company.company
});

export default connect(mapStateToProps)(ServicesAll);