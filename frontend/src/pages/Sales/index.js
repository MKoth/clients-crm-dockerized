import React, { Fragment, Component } from 'react';

import { PageTitle } from '../../layout-components';
import SalesAllUsers from "../../components/SalesAllUsers";
import { staffActions } from '../../actions/StaffActions';
import { serviceActions } from '../../actions/ServiceActions';
import { connect } from "react-redux";

class Sales extends Component {

  componentDidMount(){
    const {dispatch, company} = this.props;
    dispatch(staffActions.getAll(company.id));
    dispatch(serviceActions.getAll(company.id));
  }

  render() {
    const { services, staffs } = this.props;
    return (
      <Fragment>
        <PageTitle
          titleHeading="Sales"
          titleDescription="All users"
        />
        {services.length&&staffs.length?<SalesAllUsers />:<div style={{width:'100%', textAlign:'center'}}>Loading sales data...</div>}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  services: state.service.services,
  staffs: state.staff.staffs,
  company: state.company.company
});

export default connect(mapStateToProps)(Sales);