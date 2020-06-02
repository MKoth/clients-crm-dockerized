import React, { Fragment, Component } from "react";
import cx from "classnames";
import { connect } from "react-redux";

import { setSidebarToggleMobile } from "../../reducers/ThemeOptions";

import HeaderUserbox from "../../layout-components/HeaderUserbox";

class Header extends Component {
  toggleSidebarMobile = () => {
    let { sidebarToggleMobile, setSidebarToggleMobile } = this.props;
    setSidebarToggleMobile(!sidebarToggleMobile);
  };

  render() {
    let { headerShadow, headerBgTransparent, sidebarToggleMobile } = this.props;

    return (
      <Fragment>
        <div
          className={cx("app-header", {
            "app-header--shadow": headerShadow,
            "app-header--opacity-bg": headerBgTransparent
          })}
        >
          <div className="app-header--pane">
            <button
              color="danger"
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
          <div className="app-header--pane">
            <HeaderUserbox />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerBgTransparent: state.ThemeOptions.headerBgTransparent,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
