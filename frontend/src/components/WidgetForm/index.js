import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link,
  Select, InputLabel, MenuItem, Checkbox
} from "@material-ui/core";
import ColorPicker from '../../utils/colorPicker';
import Dropzone from "react-dropzone";
import WidgetPreview from './widget-preview';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const h4Style = {
  marginBottom: 5,
  fontSize: 14,
  color: 'grey'
}

const theme = createMuiTheme({
  palette: {
    background: {
      paper: '#ffffff',
      default: '#fafafa'
    }
  }
});

export default class WidgetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widgetTheme: theme,
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      background: theme.palette.background.paper,
      text: theme.palette.text.primary
    };
    
    this.onColorChange = this.onColorChange.bind(this);
    this.updateWidgetTheme = this.updateWidgetTheme.bind(this);
    if(localStorage.getItem('widgetFormSettings')){
      const widgetSettings = JSON.parse(localStorage.getItem('widgetFormSettings'));
      this.state = {...this.state, ...widgetSettings};
      setTimeout(()=>{this.updateWidgetTheme()});
    }
  }

  onColorChange(value, name){
    this.setState({
      [name]:value
    });
    setTimeout(()=>{
      this.updateWidgetTheme();
    })
  }

  updateWidgetTheme(){
    const {primary, secondary, background, text} = this.state;
    const themeSettings = {
      palette: {
        primary: {
          main: primary
        },
        secondary: {
          main: secondary
        },
        background: {
          paper: background
        },
        text: {
          primary: text,
          secondary: text+'66'
        }
      }
    };
    const widgetTheme = createMuiTheme(themeSettings);
    this.setState({
      widgetTheme
    });
    localStorage.setItem('widgetFormSettings', JSON.stringify({primary, secondary, background, text}));
  }

  render() {
    const {widgetTheme, primary, secondary, background, text} = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={12} sm={8}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <ColorPicker value={primary} label={'Primary color'} onChange={(val)=>{this.onColorChange(val.hex, 'primary')}}/>
                  </Grid>
                  <Grid item xs={3}>
                    <ColorPicker value={secondary} label={'Secondary color'} onChange={(val)=>{this.onColorChange(val.hex, 'secondary')}}/>
                  </Grid>
                  <Grid item xs={3}>
                    <ColorPicker value={background} label={'Background'} onChange={(val)=>{this.onColorChange(val.hex, 'background')}}/>
                  </Grid>
                  <Grid item xs={3}>
                    <ColorPicker value={text} label={'Text color'} onChange={(val)=>{this.onColorChange(val.hex, 'text')}}/>
                  </Grid>
                  {/*<Grid item xs={12}>
                    <h3>Logo</h3>
                    <Dropzone
                      multiple={false}
                      onDrop={acceptedFiles => console.log(acceptedFiles)}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section className="dropzone">
                          <span className="pe-7s-file" />
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some file here, or click to select file</p>
                          </div>
                        </section>
                      )}
                    </Dropzone> 
                  </Grid>*/}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item container spacing={3} xs={12} sm={4}>
            <Grid item xs={12}>
              <ThemeProvider theme={widgetTheme}>
                <Paper elevation={0} style={{padding:15}}>
                  <h4 style={{textAlign:'center'}}>Widget preview</h4>
                  <WidgetPreview />
                </Paper>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
