import React, { Fragment, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import { connect } from "react-redux";
import { userActions } from '../../actions/UserActions';

import avatar5 from '../../assets/images/avatars/avatar.jpg';

class HeaderUserbox extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }
  render() {
    return (
      <Fragment>
        <UncontrolledDropdown className="user-box position-relative ml-2">
          <DropdownToggle
            color="link"
            className="p-0 text-left d-flex align-items-center pr-3">
            <div className="d-block d-44 rounded-sm overflow-hidden">
              <img src={avatar5} className="img-fluid" alt="..." />
            </div>
            <span className="pl-1 pl-xl-3">
              <FontAwesomeIcon
                icon={['fas', 'angle-down']}
                className="opacity-5"
              />
            </span>
          </DropdownToggle>
          <DropdownMenu right className="dropdown-menu-lg overflow-hidden p-0">
            <ListGroup flush className="text-left bg-transparent">
              <ListGroupItem className="rounded-top">
                <Nav pills className="nav-neutral-primary flex-column">
                  <NavItem>
                    <NavLink href="#" onClick={e => e.preventDefault()}>
                      Profile settings
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={this.handleLogout}>
                      Exit
                    </NavLink>
                  </NavItem>
                </Nav>
              </ListGroupItem>
            </ListGroup>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

/*const mapDispatchToProps = dispatch => ({
});*/

export default connect(mapStateToProps)(HeaderUserbox);