import React, { Fragment, Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { PageTitle } from "../../layout-components";
import CategoriesAll from "../../components/CategoriesAll";
import ServicesAll from "../../components/ServicesAll";

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabs: [
        {
          index: 0,
          name: "Categories",
          disabled: false
        },
        {
          index: 1,
          name: "Services",
          disabled: false
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Services"
          titleDescription="Information about services"
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
            <CategoriesAll />
          </TabPane>
          <TabPane tabId={1}>
            <ServicesAll />
          </TabPane>
        </TabContent>
      </Fragment>
    );
  }
}
