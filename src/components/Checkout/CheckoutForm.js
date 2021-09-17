import React, { useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import { commerce } from "../../lib/commerce";
import "./Checkout.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const CheckoutForm = ({ checkoutToken, next }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subDivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((option) => ({
    id: option.id,
    label: `${option.description} - (${option.price.formatted_with_symbol})`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    }
  }, [shippingSubdivision]);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  return (
    <div className="container checkoutForm">
      <h3 style={{ marginBottom: "3rem" }}>Customer Details</h3>
      <form
        onSubmit={() => {
          next({
            firstName,
            lastName,
            email,
            address,
            city,
            zip,
            shippingCountry,
            shippingSubdivision,
            shippingOption,
          });
        }}
      >
        <Grid container spacing={3}>
          <Grid Item lg={6}>
            <TextField
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
              name="firstName"
              label="First Name"
            />
          </Grid>
          <Grid Item lg={6}>
            <TextField
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
              name="lastName"
              label="Last Name"
            />
          </Grid>
          <Grid Item lg={6}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              name="email"
              label="Email"
            />
          </Grid>
          <Grid Item lg={6}>
            <TextField
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              name="address"
              label="Address"
            />
          </Grid>
          <Grid Item lg={6}>
            <TextField
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
              name="city"
              label="City"
            />
          </Grid>
          <Grid Item lg={6}>
            <TextField
              onChange={(e) => setZip(e.target.value)}
              value={zip}
              required
              name="zip"
              label="ZIP/Postal Code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={shippingCountry}
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select
              value={shippingSubdivision}
              onChange={(e) => setShippingSubdivision(e.target.value)}
            >
              {subDivisions.map((subDivision) => (
                <MenuItem key={subDivision.id} value={subDivision.id}>
                  {subDivision.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select
              value={shippingOption}
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button component={Link} to="/Products" variant="outined">
            Back
          </Button>
          <Button type="submit" color="primary" variant="contained">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
