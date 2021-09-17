import {
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import "./Checkout.css";
import CheckoutForm from "./CheckoutForm";
import PaymentForm from "./PaymentForm";

const steps = ["Checkout Form", "Payment Details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const backStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  let Confirmation = () =>
    order.customer ? (
      <div style={{ margin: "2rem" }}>
        <div style={{ margin: "2rem" }}>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider />
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/Products" type="button">
          Back to Shopping
        </Button>
      </div>
    ) : (
      <div>
        <CircularProgress />
      </div>
    );

  if (error) {
    <div>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button component={Link} to="/Products" type="button">
        Back to Shopping
      </Button>
    </div>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <CheckoutForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );

  return (
    <div className="container checkout">
      <Paper>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <Confirmation />
        ) : (
          checkoutToken && <Form />
        )}
      </Paper>
    </div>
  );
};

export default Checkout;
