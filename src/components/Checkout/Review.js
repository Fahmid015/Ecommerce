import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
  console.log(checkoutToken);
  return (
    <div>
      <h3 style={{ marginBottom: "3rem" }}>Review</h3>
      <List disablePadding>
        {checkoutToken.live.line_items.map((product) => (
          <ListItem style={{ padding: "10px 20px" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary="Shipping Cost" />
          <Typography variant="body2">
            {checkoutToken.live.shipping.price.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 20px" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: "700" }}>
            {checkoutToken.live.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default Review;
