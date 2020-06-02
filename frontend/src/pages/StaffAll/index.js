import React, { Fragment, Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { PageTitle } from "../../layout-components";
import StaffAll from "../../components/StaffAll";
import StaffSchedule from "../../components/StaffSchedule";
import { connect } from "react-redux";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabs: [
        {
          index: 0,
          name: "Staff",
          disabled: false
        },
        {
          index: 1,
          name: "Schedule",
          disabled: false
        }
      ],
      schedulerBeenLoaded: false
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Staff"
          titleDescription="Information about staff"
        />
        <Nav tabs>
          {this.state.tabs.map(function(tab, i) {
            return (
              <NavLink
                key={i}
                disabled={tab.disabled}
                className={this.state.tab == tab.index ? "active" : ""}
                onClick={() => {
                  if(tab.index === 1 && this.props.staffs.length === 0){
                    alert("You haven't created any staff yet, please create staff to be able to create schedule for them!");
                    return;
                  }
                  this.setState({
                    tab: tab.index
                  });
                  if(!this.state.schedulerBeenLoaded&&tab.index==1){
                    this.setState({
                      schedulerBeenLoaded: true
                    });
                  };
                }}
              >
                {tab.name}
              </NavLink>
            );
          }, this)}
        </Nav>
        <TabContent className="pt-4" activeTab={this.state.tab}>
          <TabPane tabId={0}>
            <StaffAll />
          </TabPane>
          <TabPane tabId={1}>
            {this.state.schedulerBeenLoaded&&<StaffSchedule />}
          </TabPane>
        </TabContent>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  staffs: state.staff.staffs
});

export default connect(mapStateToProps)(StaffList);