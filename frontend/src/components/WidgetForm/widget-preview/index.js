import React from "react";
import Carousel from 'react-material-ui-carousel';
import { ExpertsView, ServiceView, DateView, TimeView, CredentialsView, PaymentView, CreditCardView, ResultView } from './pages';

function WidgetPreview(props)
{
    return (
      <Carousel>
        <ExpertsView />
        <ServiceView />
        <DateView />
        <TimeView />
        <CredentialsView />
        <PaymentView />
        <ResultView />
      </Carousel>
    )
}

export default WidgetPreview;