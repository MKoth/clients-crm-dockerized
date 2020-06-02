import React, { Fragment, Component } from "react";
import { 
  Paper, Grid, FormControl, TextField, FormGroup, 
  FormControlLabel, Switch, FormLabel, RadioGroup, 
  Radio, ButtonBase, Typography, Breadcrumbs, Link,
  Select, InputLabel, MenuItem, Checkbox
} from "@material-ui/core";

export default class WidgetSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Grid container spacing={3}>
        <Grid item container spacing={3} xs={12} sm={8}>
          <Grid item xs={12}>
            <Paper elevation={0} style={{padding:15}}>
              <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="widget-settings-language-label">Language</InputLabel>
                    <Select
                      labelId="widget-settings-language-label"
                      label="Language"
                    >
                      <MenuItem value={'en'}>
                        <img width={20} style={{marginRight:10}} src={process.env.PUBLIC_URL + "/flag/uk.png"}/>
                        English
                      </MenuItem>
                      <MenuItem value={'ru'}>
                        <img width={20} style={{marginRight:10}} src={process.env.PUBLIC_URL + "/flag/russia.png"}/>
                        Russian
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size="small" label="Google tag manager ID" variant="outlined" fullWidth/>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="widget-settings-steps-order-label">Steps order</InputLabel>
                    <Select
                      labelId="widget-settings-steps-order-label"
                      label="Steps order"
                    >
                      <MenuItem value={'Services>Employee>Calendar'}>
                        Services>Employee>Calendar
                      </MenuItem>
                      <MenuItem value={'Employee>Services>Calendar'}>
                        Employee>Services>Calendar
                      </MenuItem>
                      <MenuItem value={'Calendar>Services>Employee'}>
                        Calendar>Services>Employee
                      </MenuItem>
                      <MenuItem value={'Calendar>Employee>Services'}>
                        Calendar>Employee>Services
                      </MenuItem>
                      <MenuItem value={'Employee>Calendar>Services'}>
                        Employee>Calendar>Services
                      </MenuItem>
                      <MenuItem value={'Services>Calendar>Employee'}>
                        Services>Calendar>Employee
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size="small" label="Yandex metrika ID" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2} direction="column">
                    <FormControlLabel
                      control={
                        <Switch
                          name="active"
                          color="primary"
                        />
                      }
                      label="SMS confirmation"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          name="active"
                          color="primary"
                        />
                      }
                      label="Comment field is required"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          name="active"
                          color="primary"
                        />
                      }
                      label="Email field is required"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
