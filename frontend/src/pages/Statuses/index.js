import React, { Fragment, Component } from 'react';
import Board from "react-trello";
import { PageTitle } from '../../layout-components';

const data = {
  "lanes": [
    {
      "id": "Planned",
      "title": "Planned",
      "label": "20/70",
      "style": {
        "width": 280
      },
      "cards": [
        {
          "id": "Milk",
          "title": "Alex Schwarz",
          "label": "45 mins",
          "description": "Haircut"
        },
        {
          "id": "Plan2",
          "title": "Milla Ricken",
          "label": "1h 50 mins",
          "description": "Prom haircut"
        },
        {
          "id": "Plan3",
          "title": "Alex Bald",
          "label": "30 mins",
          "description": "Haircut man's"
        },
        {
          "id": "Plan4",
          "title": "Alina Crug",
          "label": "15 mins",
          "description": "Coloring"
        }
      ]
    },
    {
      "id": "InProgress",
      "title": "In progress",
      "label": "10/20",
      "style": {
        "width": 280
      },
      "cards": [
        {
          "id": "Wip1",
          "title": "Alex",
          "label": "30 mins",
          "description": "Woman's haircut"
        }
      ]
    },
    {
      "id": "DONE",
      "title": "Done",
      "label": "0/0",
      "style": {
        "width": 280
      },
      "cards": []
    },
    {
      "id": "CANCELED",
      "title": "Canceled",
      "style": {
        "width": 280
      },
      "label": "2/5",
      "cards": [
        {
          "id": "Completed1",
          "title": "Hally Sancho",
          "label": "1h 15 mins",
          "description": "Haircut simole"
        }
      ]
    }
  ]
}

export default class Statuses extends Component {
  render() {
    return (
      <Fragment>
        <PageTitle
          titleHeading="Statuses"
          titleDescription="Drag n Drop statuses"
        />
        <div>
          <Board data={data} draggable />
        </div>
      </Fragment>
    );
  }
}
