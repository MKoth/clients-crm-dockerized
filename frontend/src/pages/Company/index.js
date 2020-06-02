import React, { Fragment, Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavLink
} from "reactstrap";

import { PageTitle } from "../../layout-components";

import CompanyInfo from "../../components/CompanyInfo";
import CompanyMedia from "../../components/CompanyMedia";
import CompanyWorkingTime from "../../components/CompanyWorkingTime";
import CompanySocial from "../../components/CompanySocial";
import CompanyGallery from "../../components/CompanyGallery";

//import { connect } from "react-redux";
//import { companyActions } from '../../actions/CompanyActions';

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      tabs: [
        {
          index: 0,
          name: "Info",
          disabled: false
        },
        {
          index: 1,
          name: "Media",
          disabled: false
        },
        {
          index: 2,
          name: "Working time",
          disabled: false
        },
        {
          index: 3,
          name: "Social links",
          disabled: false
        },
        {
          index: 4,
          name: "Gallery",
          disabled: true
        }
      ]
    };
  }

  componentDidMount(){
    //const { dispatch } = this.props;
    //dispatch(companyActions.get());
    /*setTimeout(()=>{
      dispatch(companyActions.create());
    }, 1000);*/
  }

  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Company"
          titleDescription="Information about company"
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
            <CompanyInfo info={this.props.company}/>
          </TabPane>
          <TabPane tabId={1}>
            <CompanyMedia />
          </TabPane>
          <TabPane tabId={2}>
            <CompanyWorkingTime />
          </TabPane>
          <TabPane tabId={3}>
            <CompanySocial />
          </TabPane>
          <TabPane tabId={4}>
            <CompanyGallery />
          </TabPane>
        </TabContent>
      </Fragment>
    );
  }
}

/*const mapStateToProps = state => ({
  loading: state.company.loading,
  company: state.company.company
});

export default connect(mapStateToProps)(Company);*/