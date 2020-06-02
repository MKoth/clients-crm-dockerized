import React, {useState} from 'react';
import { DatePicker } from "@material-ui/pickers";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export function PaymentView(props) {
  const [payment, changePayment] = useState();

  const onPaymentChange = (payment) => {
    changePayment(payment);
    props.onPaymentSelected(payment);
  }

  // prettier-ignore
  return (
    <>
      <List>
        <ListItem>
          <ArrowBackIosIcon/>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"SELECT PAYING METHOD"}</Typography>}
            secondary="Online booking"
          />
        </ListItem>
        <Divider />
      </List>
      <div style={{padding:15, maxWidth:330}}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>Pay online with:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" color="primary" startIcon={<DoubleArrowIcon />}>Credit card</Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" color="primary" startIcon={<DoubleArrowIcon />}>PayPal</Button>
          </Grid>
          <Grid item xs={12} style={{marginTop:20}}>
            <Typography>Pay later with:</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="outlined" color="primary" startIcon={<DoubleArrowIcon />}>Cash</Button>
          </Grid>
        </Grid>
      </div>
      
    </>
  );
}