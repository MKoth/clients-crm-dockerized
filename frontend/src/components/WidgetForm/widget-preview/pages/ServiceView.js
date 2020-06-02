import React, {useState} from 'react';
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
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { useTheme } from '@material-ui/core/styles';

const services = [
  {id:1, name: "Unisex haircut", price: 80, hours:1, minutes:0},
  {id:2, name: "Biker style", price: 65, hours:0, minutes:0},
  {id:3, name: "Hopnik style", price: 34, hours:3, minutes:20},
  {id:4, name: "Metalist style", price: 64, hours:2, minutes:40},
  {id:5, name: "Barbie style", price: 12, hours:5, minutes:15},
  {id:6, name: "Long hair", price: 34, hours:0, minutes:0},
  {id:7, name: "Short hair", price: 654, hours:4, minutes:0},
  {id:8, name: "Exclusive hair", price: 1234, hours:1, minutes:30},
  {id:9, name: "Prom queen", price: 187, hours:5, minutes:0},
  {id:10, name: "Prom barbie", price: 74, hours:2, minutes:15},
  {id:11, name: "I don't care style", price: 94, hours:3, minutes:45},
  {id:12, name: "Dandy haircut", price: 33, hours:1, minutes:30},
  {id:13, name: "Boss style", price: 15, hours:1, minutes:0},
  {id:14, name: "Rich boy", price: 87, hours:4, minutes:0},
  {id:15, name: "Man black", price: 76, hours:7, minutes:10},
  {id:16, name: "Man brown", price: 27, hours:1, minutes:0},
  {id:17, name: "Man blonde", price: 90, hours:1, minutes:15},
  {id:18, name: "Woman black", price: 35, hours:3, minutes:25},
  {id:19, name: "Woman brown", price: 99, hours:1, minutes:20},
  {id:20, name: "Woman blonde", price: 100, hours:1, minutes:10},
]

const categories = [
  {id:1, name: "Haircut", services:[1], parent:null},
  {id:2, name: "Man haircut", services:[2,3,4], parent:1},
  {id:3, name: "Woman haircut", services:[5,6,7], parent:1},
  {id:4, name: "Exclusive", services:[8], parent:3},
  {id:5, name: "Girls prom haircut", services:[9,10,11], parent:null},
  {id:6, name: "Mans prom haircut", services:[12,13,14], parent:null},
  {id:7, name: "Hair coloring", services:[], parent:null},
  {id:8, name: "Man hair coloring", services:[15,16,17], parent:7},
  {id:9, name: "Woman hair coloring", services:[18,19,20], parent:7},
]

export function ServiceView(props) {
  const theme = useTheme();
  const [servicesIds, setServicesIds] = useState([]);

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

  const calculateSummary = () => {
    let cost = 0, hours = 0, minutes = 0;
    const selectedServices = services.filter(service=>servicesIds.includes(service.id));
    selectedServices.forEach(service=>{
      cost += service.price;
      hours += service.hours;
      minutes += service.minutes;
    });
    hours += Math.floor(minutes/60);
    minutes = minutes%60;
    return cost+"$ - "+hours+"h "+minutes+"m"
  }

  const expansionPanel = (parent=null) => {
    return categories.map(category=>(
      category.parent===parent&&<ExpansionPanel key={category.id}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>{category.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{display:"block", padding:"0px 0px 15px 15px"}}>
          {category.services.length?<List>
            {category.services.map(service_id=>{
              const service = services.find(serv=>serv.id===service_id);
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
                <ListItemText primary={service.name} secondary={"Duration: "+service.hours+"h "+service.minutes+"m"}/>
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
        <ListItemText
          primary={<Typography style={{fontSize: 14}}>{"SELECT SERVICES"}</Typography>}
          secondary="Online booking"
        />
      </ListItem>
      <Divider />
    </List>
    <div>
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
          <IconButton size="small" edge="end" style={{fontSize: 15, color: theme.palette.primary.main}}>
            Next
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      
    </List>
  </div>);
}
