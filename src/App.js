import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products/Products";
import Footer from "./components/Footer/Footer";
import { commerce } from "./lib/commerce";
import ProductPage from "./components/ProductPage/ProductPage";
import Checkout from "./components/Checkout/Checkout";
import Home from "./components/Home/Home";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [inventory, setInventory] = useState(0);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchResult = (searchResult) => {
    setSearchResult(searchResult);
  };

  const fetchProducts = async () => {
    const { data } = await commerce.products.list({
      limit: "200",
    });

    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
  };

  const addToCart = async (productId, quantity, variants) => {
    const { cart } = await commerce.cart.add(productId, quantity, variants);

    setCart(cart);
  };

  const updateCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const removeFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const checkInventory = (inv) => {
    setInventory(inv);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("Cart >>>", cart);
  console.log("Products >>>", products);

  return (
    <Router>
      <div className="app">
        <Header
          totalItems={cart.total_items}
          cart={cart}
          updateCart={updateCart}
          removeFromCart={removeFromCart}
          emptyCart={emptyCart}
          inventory={inventory}
          searchResult={searchResult}
          handleSearchResult={handleSearchResult}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Products">
            <Products products={products} searchResult={searchResult} />
          </Route>
          <Route path="/ProductPage/:id">
            <ProductPage
              cart={cart}
              addToCart={addToCart}
              checkInventory={checkInventory}
            />
          </Route>
          <Route path="/Checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
