import React, { Fragment, Component } from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';

import { connect } from 'react-redux';
import RouterLink from '../ReactMetismenuRouterLink';

import MetisMenu from 'react-metismenu';

const sidebarGeneralSettings = [
  {
    label: 'Company',
    icon: 'pe-7s-note2',
    content: [
      {
        label: 'Info',
        to: '/dashboard/company'
      },
      {
        label: 'Media',
        to: '/dashboard/company'
      },
      {
        label: 'Working time',
        to: '/dashboard/company'
      },
      {
        label: 'Social links',
        to: '/dashboard/company'
      },
      {
        label: 'Gallery',
        to: '/dashboard/company'
      }
    ]
  },
  {
    label: 'Users',
    icon: 'pe-7s-users',
    content: [
      {
        label: 'All users',
        to: '/dashboard/users'
      },
      {
        label: 'Groups',
        to: '/dashboard/users'
      }
    ]
  },
  {
    label: 'Services',
    icon: 'pe-7s-shopbag',
    content: [
      {
        label: 'Categories',
        to: '/dashboard/services'
      },
      {
        label: 'Services',
        to: '/dashboard/services'
      }
    ]
  },
  {
    label: 'Staff',
    icon: 'pe-7s-add-user',
    content: [
      {
        label: 'Staff',
        to: '/dashboard/staff'
      },
      {
        label: 'Schedule',
        to: '/dashboard/staff'
      }
    ]
  },
  {
    label: 'Widget',
    icon: 'pe-7s-browser',
    content: [
      {
        label: 'Settings',
        to: '/dashboard/widget'
      }
    ]
  },
  {
    label: 'Payment',
    icon: 'pe-7s-cash',
    content: [
      {
        label: 'Payment',
        to: '/dashboard/payment'
      }
    ]
  },
  {
    label: 'Communication',
    icon: 'pe-7s-paper-plane',
    content: [
      {
        label: 'Communication',
        to: '/dashboard/communication'
      }
    ]
  }
];

const sidebarBookingOnline = [
  {
    label: 'Sales',
    icon: 'pe-7s-ticket',
    content: [
      {
        label: 'All users',
        to: '/dashboard/sales'
      },
      {
        label: 'Sales statuses',
        to: '/dashboard/statuses'
      }
    ]
  },
  {
    label: 'Customers',
    icon: 'pe-7s-cart',
    content: [
      {
        label: 'All customers',
        to: '/dashboard/customers'
      },
      {
        label: 'Groups',
        to: '/dashboard/customers'
      }
    ]
  }
];

class SidebarMenu extends Component {
  render() {
    let { sidebarUserbox, company } = this.props;

    return (
      <Fragment>
        <PerfectScrollbar>
          <div className="sidebar-navigation">
            <div className="sidebar-header" style={{textAlign:'center'}}>
              <span>General settings</span>
              {company&&company.title&&<h5>{company.title}</h5>}
            </div>
            <MetisMenu
              content={sidebarGeneralSettings}
              LinkComponent={RouterLink}
              activeLinkFromLocation
              iconNamePrefix=""
              noBuiltInClassNames={true}
              classNameItemActive="active"
              classNameIcon="sidebar-icon"
              iconNameStateVisible="sidebar-icon-indicator"
              iconNameStateHidden="sidebar-icon-indicator"
              classNameItemHasVisibleChild="submenu-open"
              classNameItemHasActiveChild="active"
              classNameStateIcon="pe-7s-angle-down"
            />
          </div>
          <div className="sidebar-navigation">
            <div className="sidebar-header">
              <span>Booking online</span>
            </div>
            <MetisMenu
              content={sidebarBookingOnline}
              LinkComponent={RouterLink}
              activeLinkFromLocation
              iconNamePrefix=""
              noBuiltInClassNames={true}
              classNameItemActive="active"
              classNameIcon="sidebar-icon"
              iconNameStateVisible="sidebar-icon-indicator"
              iconNameStateHidden="sidebar-icon-indicator"
              classNameItemHasVisibleChild="submenu-open"
              classNameItemHasActiveChild="active"
              classNameStateIcon="pe-7s-angle-down"
            />
          </div>
        </PerfectScrollbar>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sidebarUserbox: state.ThemeOptions.sidebarUserbox,
  company: state.company.company
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);
