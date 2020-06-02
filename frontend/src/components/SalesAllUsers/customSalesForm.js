import React, {useState} from 'react';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { 
  FormControlLabel, Switch
} from "@material-ui/core";

const CustomSalesForm = ({ onFieldChange, appointmentData, ...restProps }) => {
  //console.log(restProps);

  const [isAnonimus, setAnonimus] = useState(appointmentData.name&&appointmentData.name.trim()==='');

  if(!appointmentData.status){
    setTimeout(()=>{
      onFieldChange({ status: 'new' });
    })
  }

  const onCustomFieldChange = (event) => {
    onFieldChange({ [event.target.name]: event.target.value });
    /*if(value&&value.id)
      onFieldChange({ client: value.id });*/

  };

  const onAnonymChange = (event) => {
    const checked = event.target.checked;
    setAnonimus(checked);
    if(checked) onFieldChange({ name:'' });
  }

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label
        text="Appointment status"
        type="title"
      />
      <FormControl fullWidth variant="outlined">
        <InputLabel id="calendar-appointment-status">Status</InputLabel>
        <Select
          labelId="calendar-appointment-status"
          label="Status"
          name="status"
          value={appointmentData.status?appointmentData.status:'new'}
          onChange={onCustomFieldChange}
        >
          <MenuItem value={'new'}>New</MenuItem>
          <MenuItem value={'in_progress'}>In progress</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
          <MenuItem value={'canceled'}>Canceled</MenuItem>
        </Select>
      </FormControl>
      <AppointmentForm.Label
        text="Attach client"
        type="title"
      />
      <FormControlLabel
        control={
          <Switch
            name="anonym"
            color="primary"
            checked={isAnonimus}
            onChange={onAnonymChange}
          />
        }
        label="Anonym client"
      />
      {!isAnonimus&&<div style={{display: 'flex',flexDirection: 'column', justifyContent: 'space-between', height: 330}}>
        <TextField
          value={appointmentData.name}
          onChange={onCustomFieldChange}
          label="Client name"
          name="name" 
          variant="outlined" fullWidth />
        <TextField
          value={appointmentData.phone}
          onChange={onCustomFieldChange}
          label="Phone"
          name="phone" 
          variant="outlined" fullWidth />
        <TextField
          value={appointmentData.email}
          onChange={onCustomFieldChange}
          label="Email"
          name="email" 
          variant="outlined" fullWidth />
        <TextField
          value={appointmentData.description}
          onChange={onCustomFieldChange}
          label="Description"
          name="description" 
          variant="outlined" 
          fullWidth multiline
          rows={4} />
        {/**<Autocomplete
        id="combo-box-demo"
        value={clients.find(client=>client.id===appointmentData.client)}
        onChange={onCustomFieldChange}
        options={clients}
        getOptionLabel={(option) => option.name+" "+option.phone}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      /> */}
      </div>
      }
    </AppointmentForm.BasicLayout>
  );
};

export default CustomSalesForm;