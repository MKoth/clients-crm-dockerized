import React, { Fragment, Component } from 'react';

import { PageTitle } from '../../layout-components';

import Statistics from '../../components/Statistics';

export default class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Statistics"
          titleDescription="Reports overview"
        />
        <Statistics />
      </Fragment>
    );
  }
}
