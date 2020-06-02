import React, { Fragment, Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

import { PageTitle } from "../../layout-components";
import WidgetSettings from "../../components/WidgetSettings";
import WidgetForm from "../../components/WidgetForm";
import WidgetButton from "../../components/WidgetButton";
import WidgetCode from "../../components/WidgetCode";

export default class Widget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabs: [
        {
          index: 0,
          name: "Settings",
          disabled: false
        },
        {
          index: 1,
          name: "Form",
          disabled: false
        },
        {
          index: 2,
          name: "Button",
          disabled: false
        },
        {
          index: 3,
          name: "Code",
          disabled: false
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Widget"
          titleDescription="Information about widget"
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
            <WidgetSettings />
          </TabPane>
          <TabPane tabId={1}>
            <WidgetForm />
          </TabPane>
          <TabPane tabId={2}>
            <WidgetButton />
          </TabPane>
          <TabPane tabId={3}>
            <WidgetCode />
          </TabPane>
        </TabContent>
      </Fragment>
    );
  }
}
