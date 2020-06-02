import React from "react";
import {
  Plugin,
  Template,
  TemplatePlaceholder
} from '@devexpress/dx-react-core';
import { Row, Col, Button } from "reactstrap";

const pluginDependencies = [
  { name: 'Toolbar' }
];

export class ToolbarButton extends React.PureComponent {
  constructor(props){
    super(props);

  }
  render() {
    return (
      <Plugin
        name="ToolbarButton"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent" >
          
          <TemplatePlaceholder />
          <Button
            color="primary"
            onClick={this.props.onClick }
            style={{marginRight:10}}
          >
            {this.props.buttonText}
          </Button>
        </Template>
      </Plugin>
    );
  }
}