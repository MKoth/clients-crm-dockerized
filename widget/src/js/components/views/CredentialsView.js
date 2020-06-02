import React, {useState} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export function CredentialsView(props) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [isAccept, setAccept] = useState(false);
  return (
    <>
      <List>
        <ListItem>
          <ArrowBackIosIcon onClick={props.onBack}/>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"YOUR CREDENTIALS"}</Typography>}
            secondary="Online booking"
          />
        </ListItem>
        <Divider />
      </List>
      <div style={{padding:15, maxWidth:330}}>
        <Grid container spacing={3}>
          <Grid xs={12} item>
            <TextField size="small" required value={first_name} onChange={(e)=>{setFirst_name(e.target.value)}} label="First name" variant="outlined" fullWidth/>
          </Grid>
          <Grid xs={12} item>
            <TextField size="small" required value={last_name} onChange={(e)=>{setLast_name(e.target.value)}} label="Last name" variant="outlined" fullWidth/>
          </Grid>
          <Grid xs={12} item>
            <TextField size="small" type="number" required value={phone} onChange={(e)=>{setPhone(e.target.value)}} label="Phone" variant="outlined" fullWidth/>
          </Grid>
          <Grid xs={12} item>
            <TextField size="small" required value={email} onChange={(e)=>{setEmail(e.target.value)}} label="Email" variant="outlined" fullWidth/>
          </Grid>
          <Grid xs={12} item>
            <TextField size="small" value={description} onChange={(e)=>{setDescription(e.target.value)}} label="Message" variant="outlined" multiline fullWidth rows={4}/>
          </Grid>
          <Grid xs={12} item>
            <FormControlLabel
              control={<Checkbox checked={isAccept} onChange={(e)=>{setAccept(e.target.checked)}} name="agreement" />}
              label="I accept the term of user agreement"
            />
          </Grid>
          <Grid xs={12} item container direction="row" justify="center">
            <Button variant="contained" disabled={!phone||!email||!first_name||!last_name||!isAccept} color="primary" onClick={()=>{props.onCredentialsFilled({
              phone,
              email,
              name: first_name+' '+last_name,
              message: description,
              status: 'new'
            })}}>
              Send data and continue
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider />
    </>
  );
}

CredentialsView.propTypes = {
  onCredentialsFilled: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};