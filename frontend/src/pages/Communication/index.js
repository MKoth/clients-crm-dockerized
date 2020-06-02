import React, { Fragment, Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavLink
} from "reactstrap";

import { PageTitle } from "../../layout-components";

import Sendgrid from "../../components/Sendgrid";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabs: [
        {
          index: 0,
          name: "Sendgrid",
          disabled: false
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Communication"
          titleDescription="Information about communication"
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
            <Sendgrid />
          </TabPane>
        </TabContent>
      </Fragment>
    );
  }
}
