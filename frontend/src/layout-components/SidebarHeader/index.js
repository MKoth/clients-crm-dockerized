import React, { Fragment, Component } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  setSidebarToggle,
  setSidebarToggleMobile
} from "../../reducers/ThemeOptions";

class SidebarHeader extends Component {
  toggleSidebarMobile = () => {
    let { sidebarToggleMobile, setSidebarToggleMobile } = this.props;
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  toggleSidebar = () => {
    let { sidebarToggle, setSidebarToggle } = this.props;
    setSidebarToggle(!sidebarToggle);
  };

  render() {
    let { sidebarToggle, sidebarToggleMobile } = this.props;

    return (
      <Fragment>
        <div className="app-sidebar--header">
          <div className="nav-logo">
            <Link to="/dashboard" title="Serftopia panel">
              <span>SERFTOPIA</span>
            </Link>
          </div>
          <button
            color="light"
            className={cx(
              "navbar-toggler hamburger hamburger--elastic toggle-mobile-sidebar-btn",
              { "is-active": sidebarToggleMobile }
            )}
            onClick={this.toggleSidebarMobile}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  sidebarToggle: state.ThemeOptions.sidebarToggle
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable)),
  setSidebarToggle: enable => dispatch(setSidebarToggle(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHeader);
