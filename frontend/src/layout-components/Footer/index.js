import React, { Fragment, Component } from 'react';

import cx from 'classnames';

import { connect } from 'react-redux';

class Footer extends Component {
  render() {
    let { footerShadow, footerFixed, footerBgTransparent } = this.props;

    return (
      <Fragment>
        <div
          className={cx('app-footer text-black-50', {
            'app-footer--shadow': footerShadow,
            'app-footer--opacity-bg': footerBgTransparent
          })}>
          <div className="app-footer--first">
          </div>
          <div className="app-footer--second">
            <span>Serftopia</span> © 2020
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed,
  footerShadow: state.ThemeOptions.footerShadow,
  footerBgTransparent: state.ThemeOptions.footerBgTransparent
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
