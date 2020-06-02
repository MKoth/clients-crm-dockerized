import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import {services, baseUrl} from '../api-service';
import { useTheme } from '@material-ui/core/styles';

export function ServiceView(props) {
  const theme = useTheme();
  const [servicesIds, setServicesIds] = useState([]);
  const [servicesArr, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  let finalPrice, durationMinutes = 0;

  useEffect(() => {
    services.serviceListGet(props.company, props.staffId).then(({data})=>{ setServices(data.services); setCategories(data.categories); console.log(data)});
  }, []);

  const handlePanelClick = (serviceId) => {
    if(!servicesIds.includes(serviceId))
      servicesIds.push(serviceId);
    else
      servicesIds.splice(servicesIds.indexOf(serviceId),1);
    const newArray = servicesIds.slice();
    setServicesIds(newArray);
  }

  const isChecked = (servicesId) => {
    return servicesIds.includes(servicesId)
  }

  const getServicesNames = (servicesIds) => {
    return servicesArr.filter(srv=>servicesIds.includes(srv.id)).map(srv=>srv.title)
  }

  const calculateSummary = () => {
    let cost = 0, hours = 0, minutes = 0;
    const selectedServices = servicesArr.filter(service=>servicesIds.includes(service.id));
    selectedServices.forEach(service=>{
      cost += service.price;
      hours += service.hours;
      minutes += service.minutes;
    });
    hours += Math.floor(minutes/60);
    minutes = minutes%60;
    durationMinutes = hours*60+minutes;
    finalPrice = cost;
    return cost+"$ - "+hours+"h "+minutes+"m"
  }

  const expansionPanel = (parent=null) => {
    return categories.map(category=>(
      category.parent===parent&&<ExpansionPanel key={category.id}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{category.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display:"block", padding:"0px 0px 15px 15px"}}>
          {servicesArr.filter(srv=>srv.category===category.id).length?<List>
            {servicesArr.filter(srv=>srv.category===category.id).map(service=>{
              return <ListItem key={service.id} dense button onClick={()=>{handlePanelClick(service.id)}}>
                <ListItemIcon>
                  <Checkbox
                    value={service.id}
                    checked={isChecked(service.id)}
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={service.title} secondary={"Duration: "+service.hours+"h "+service.minutes+"m"}/>
                <ListItemSecondaryAction>
                  <Typography>{service.price+'$'}</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            })}
          </List>:null}
          {expansionPanel(category.id)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )) 
  }

  return (<div>
    <List>
      <ListItem>
        <ArrowBackIosIcon onClick={props.onBack}/>
        <ListItemText
          primary={<Typography style={{fontSize: 14}}>{"SELECT SERVICES"}</Typography>}
          secondary="Online booking"
        />
      </ListItem>
      <Divider />
    </List>
    <div style={{height: "calc(100vh - 175px)", overflow: "auto"}}>
      {expansionPanel()}
    </div>
    <List>
      <Divider />
      <ListItem>
        <ListItemText
          primary={<Typography style={{fontSize: 14}}>{"SELECTED SERVICES: "+servicesIds.length}</Typography>}
          secondary={calculateSummary()}
        />
        <ListItemSecondaryAction>
          <IconButton disabled={!servicesIds.length} size="small" edge="end" style={{fontSize: 15, color: theme.palette.primary.main}} 
            onClick={()=>{props.onServicesSelected({services: servicesIds, servicesNames: getServicesNames(servicesIds), finalPrice, durationMinutes})}}
          >
            {servicesIds.length?'Next':'Select service!'}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      
    </List>
  </div>);
}

ServiceView.propTypes = {
  onServicesSelected: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};