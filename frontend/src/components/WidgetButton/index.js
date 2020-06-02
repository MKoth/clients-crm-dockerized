import React, { Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, Typography, Breadcrumbs, Link,
  Select, InputLabel, MenuItem, Checkbox
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ColorPicker from '../../utils/colorPicker';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      paper: '#ffffff',
      default: '#fafafa'
    }
  }
});

export default class WidgetButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      primary: theme.palette.primary.main,
      contrastText: theme.palette.primary.contrastText,
      text: 'Book now!!!',
      variant: 'contained',
      isAnimation: true,
      isShadow: true,
      buttonTheme: theme
    };
    this.onSettingUpdate = this.onSettingUpdate.bind(this);
    this.updateWidgetTheme = this.updateWidgetTheme.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
    if(localStorage.getItem('widgetButtonSettings')){
      const widgetSettings = JSON.parse(localStorage.getItem('widgetButtonSettings'));
      this.state = {...this.state, ...widgetSettings};
      setTimeout(()=>{this.updateWidgetTheme()});
    }
  }

  onSettingUpdate(value, name){
    const {primary, contrastText, text, variant, isAnimation, isShadow} = this.state;
    this.setState({
      [name]:value
    });
    setTimeout(()=>{
      this.updateStorage();
    });
    if(name==='primary'||name==='contrastText'){
      setTimeout(()=>{
        this.updateWidgetTheme();
      });
    }
    
  }

  updateStorage(){
    const {primary, contrastText, text, variant, isAnimation, isShadow} = this.state;
    localStorage.setItem('widgetButtonSettings', JSON.stringify({primary, contrastText, text, variant, isAnimation, isShadow}));
  }

  updateWidgetTheme(){
    const {primary, contrastText} = this.state;
    const buttonTheme = createMuiTheme({
      palette: {
        primary: {
          main: primary,
          contrastText
        }
      }
    });
    this.setState({
      buttonTheme
    });
  }

  render() {
    const {primary, contrastText, text, variant, isAnimation, isShadow, buttonTheme} = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Grid container spacing={3}>
          <Grid item container spacing={3} xs={12} sm={8}>
            <Grid item xs={12}>
              <Paper elevation={0} style={{padding:15}}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField value={text} size="small" label="Button text" variant="outlined" onChange={(e)=>{this.onSettingUpdate(e.target.value, 'text')}} fullWidth/>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <ColorPicker value={primary} label={'Background'} onChange={(val)=>{this.onSettingUpdate(val.hex, 'primary')}}/>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isAnimation}
                          onChange={(e)=>{this.onSettingUpdate(e.target.checked, 'isAnimation')}}
                          name="active"
                          color="primary"
                        />
                      }
                      label="Animation"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel id="widget-settings-language-label">Button type</InputLabel>
                      <Select
                        labelId="widget-settings-language-label"
                        label="Button type"
                        onChange={(e)=>{this.onSettingUpdate(e.target.value, 'variant')}}
                        value={variant}
                      >
                        <MenuItem value={'text'}>Without background</MenuItem>
                        <MenuItem value={'contained'}>Contained</MenuItem>
                        <MenuItem value={'outlined'}>Outlined</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <ColorPicker value={contrastText} label={'Text color'} onChange={(val)=>{this.onSettingUpdate(val.hex, 'contrastText')}}/>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isShadow}
                          onChange={(e)=>{this.onSettingUpdate(e.target.checked, 'isShadow')}}
                          name="active"
                          color="primary"
                        />
                      }
                      label="Shadow"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Grid item container spacing={3} xs={12} sm={4}>
            <Grid item xs={12}>
              <ThemeProvider theme={buttonTheme}>
                <Paper elevation={0} style={{padding:15}}>
                  <h4 style={{textAlign:'center'}}>Button preview</h4>
                  <Grid item container direction="row" justify="center">
                    <Button variant={variant} disableRipple={!isAnimation} color="primary" disableElevation={!isShadow}>
                      {text}
                    </Button>
                  </Grid>
                </Paper>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
