import React from "react";
import { Button, Carousel, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Container>
        <Carousel fade interval={5000}>
          <Carousel.Item>
            <img className="d-block w-100" src="./Banner1.jpg" alt="" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src="./Banner2.jpg" alt="" />
          </Carousel.Item>
        </Carousel>
        <div className="belowBanner">
          <h4>
            Visit our store of the latest trend of fashionable streetwear!
          </h4>
          <Link to="/Products">
            <Button
              variant="success"
              size="lg"
              style={{ width: "40%", marginTop: "2rem" }}
            >
              {" "}
              Shop Now!
            </Button>
          </Link>
        </div>
        <div
          className="product row"
          style={{
            paddingBottom: "2rem",
            margin: "2rem 0",
            borderBottom: "3px solid lightskyblue",
          }}
        >
          <div className="col-sm-6">
            <img src="./Product1.jpg" width="300" height="500" alt="" />
          </div>
          <div className="col-md-6">
            <h4>Checkout our latest Joggers just for you!</h4>
            <b>
              Shop with freedom and checkout our comfortable pairs of joggers
              available in different sizes at astonishing satisfying prices
            </b>
          </div>
        </div>
        <div className="product row" style={{ margin: "2rem 0" }}>
          <div className="col-md-6">
            <h4>Dashing jackets only in The Street Store</h4>
            <b>What are you waiting for? Go grab yours now!</b>
          </div>
          <div className="col-sm-6">
            <img src="./Product2.jpg" width="400" height="500" alt="" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
