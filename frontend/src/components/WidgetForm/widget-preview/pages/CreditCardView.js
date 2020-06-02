import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Card from "react-credit-cards";
import 'react-credit-cards/es/styles-compiled.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export function CreditCardView(props) {


  return (
    <>
      <List>
        <ListItem>
          <ArrowBackIosIcon onClick={props.onBack}/>
          <ListItemText
            primary={<Typography style={{fontSize: 14}}>{"SELECT DATE"}</Typography>}
            secondary="Online booking"
          />
        </ListItem>
        <Divider />
      </List>
      <div style={{padding:15, maxWidth:330}}>
        <Card 
          cvc={''}
          expiry={''}
          focused={''}
          name={''}
          number={''}
        />
        <Grid container direction="row" justify="center">
          <Button style={{marginTop:30}} variant="outlined" color="primary" onClick={props.onCreditCardSubmit}>
            Confirm payment
          </Button>
        </Grid>
      </div>
    </>
  );
}

CreditCardView.propTypes = {
  onCreditCardSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired
};