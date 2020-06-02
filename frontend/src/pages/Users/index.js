import React, { Fragment, Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { PageTitle } from "../../layout-components";
import UsersAll from "../../components/UsersAll";
import GroupsAll from "../../components/GroupsAll";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabs: [
        {
          index: 0,
          name: "All users",
          disabled: false
        },
        {
          index: 1,
          name: "Groups",
          disabled: false
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Users"
          titleDescription="Information about users"
        />
        <Nav tabs>
          {this.state.tabs.map(function(tab, i) {
            return (
              <NavLink
                key={i}
                disabled={tab.disabled}
                className={this.state.tab == tab.index ? "active" : ""}
                onClick={() => {
                  this.setState({
                    tab: tab.index
                  });
                }}
              >
                {tab.name}
              </NavLink>
            );
          }, this)}
        </Nav>
        <TabContent className="pt-4" activeTab={this.state.tab}>
          <TabPane tabId={0}>
            <UsersAll />
          </TabPane>
          <TabPane tabId={1}>
            <GroupsAll />
          </TabPane>
        </TabContent>
      </Fragment>
    );
  }
}
