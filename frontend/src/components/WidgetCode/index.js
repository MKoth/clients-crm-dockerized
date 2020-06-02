import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link,
  Select, InputLabel, MenuItem, Checkbox, IconButton
} from "@material-ui/core";
import { withTheme } from '@material-ui/core/styles';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import { connect } from "react-redux";

class WidgetCode extends Component {
  constructor(props) {
    super(props);
    const {theme} = props;
    this.state = {
      company: props.company.id,
      formSettings: {
        primary: theme.palette.primary.main,
        secondary: theme.palette.secondary.main,
        background: theme.palette.background.paper,
        text: theme.palette.text.primary
      },
      buttonSettings: {
        primary: theme.palette.primary.main,
        contrastText: theme.palette.primary.contrastText,
        text: 'Book now!!!',
        variant: 'contained',
        isAnimation: true,
        isShadow: true,
      }
    };
    if(localStorage.getItem('widgetFormSettings')){
      const widgetFormSettings = JSON.parse(localStorage.getItem('widgetFormSettings'));
      this.state.formSettings = {...this.state.formSettings, ...widgetFormSettings};
    }
    if(localStorage.getItem('widgetButtonSettings')){
      const widgetButtonSettings = JSON.parse(localStorage.getItem('widgetButtonSettings'));
      this.state.buttonSettings = {...this.state.buttonSettings, ...widgetButtonSettings};
    }

    this.interval = null;
    this.getMessageToDisplay = this.getMessageToDisplay.bind(this);
  }

  componentDidMount(){
    this.interval = setInterval(()=>{
      const {formSettings, buttonSettings} = this.state;
      if(localStorage.getItem('widgetFormSettings')&&JSON.stringify(formSettings)!==localStorage.getItem('widgetFormSettings')){
        console.log('widget form updated');
        this.setState({
          formSettings: JSON.parse(localStorage.getItem('widgetFormSettings'))
        });
      }
      else if(localStorage.getItem('widgetButtonSettings')&&JSON.stringify(buttonSettings)!==localStorage.getItem('widgetButtonSettings')){
        console.log('widget button updated');
        this.setState({
          buttonSettings: JSON.parse(localStorage.getItem('widgetButtonSettings'))
        });
      }
    }, 2000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
  };

  getMessageToDisplay(){
    if(process.env.NODE_ENV === 'production'){
      return `<script src="${window.location.protocol+"//"+window.location.hostname}/widget/serftopiaWidget.js"></script>
        <script>
          SerftopiaWidget.init(${JSON.stringify(this.state, null, 2)});
        </script>
      `;
    }
    return `SerftopiaWidget.init(${JSON.stringify(this.state, null, 2)});`;
  }
  
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12} sm={8}>
          <Grid item xs={12}>
            <Paper elevation={0} style={{padding:15}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <h4 style={{textAlign:'center'}}>Copy this code to your website to add widget</h4>
                  <div style={{
                    background: '#eeeeef',
                    padding: 5,
                    paddingLeft: 20,
                    borderLeft: '6px solid #fbac4a'
                  }}>
                    <IconButton size="small" style={{float:'right'}} aria-label="copy" onClick={this.copyToClipboard}>
                      <FileCopyOutlined/>
                    </IconButton>
                    <pre>{this.getMessageToDisplay()}</pre>
                  </div>
                  <form>
                    <textarea
                      style={{
                        height: 0,
                        border: 'none',
                        position: 'absolute',
                        marginTop: -10,
                        zIndex: -1
                      }}
                      ref={(textarea) => this.textArea = textarea}
                      value={this.getMessageToDisplay()}
                    />
                  </form>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company.company
});

export default connect(mapStateToProps)(withTheme(WidgetCode));