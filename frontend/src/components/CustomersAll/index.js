import React, { Fragment, Component } from "react";
import { Row, Col } from "reactstrap";
import {
  Grid,
  Table,
  TableSelection,
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4";
import { SelectionState } from "@devexpress/dx-react-grid";

export default class CustomersAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: "id", title: "ID" },
        {
          title: "Name",
          name: "name"
        },
        {
          title: "Group",
          name: "group"
        },
        {
          title: "Email",
          name: "email"
        },
        {
          title: "Phone",
          name: "phone"
        },
        {
          title: "Last login",
          name: "last_login"
        },
        {
          title: "Money, UAH",
          name: "money"
        }
      ],
      rows: [
        {
          id: 1,
          name: "Edward Watts",
          group: "Facebook",
          email: "wdraws.watts@gmail.com",
          phone: "+10962650277",
          last_login: "20.02.2020",
          money: "3 000"
        },
        {
          id: 2,
          name: "Edward Watts",
          group: "Facebook",
          email: "wdraws.watts@gmail.com",
          phone: "+10962650277",
          last_login: "20.02.2020",
          money: "3 000"
        },
        {
          id: 3,
          name: "Edward Watts",
          group: "Facebook",
          email: "wdraws.watts@gmail.com",
          phone: "+10962650277",
          last_login: "20.02.2020",
          money: "3 000"
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col md="12">
            <Grid rows={this.state.rows} columns={this.state.columns}>
              <SelectionState />
              <Table />
              <TableHeaderRow />
              <TableSelection />
            </Grid>
          </Col>
        </Row>
      </Fragment>
    );
  }
}
