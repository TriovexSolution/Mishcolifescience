// src/components/SingleProduct.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Alert, Badge, ListGroup } from "react-bootstrap";
import { Api } from "../api";
// import App from "../App";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const productId = sessionStorage.getItem("currentProductId");

    if (!productId) {
      setError("No product selected. Please go back and choose a product.");
      setLoading(false);
      return;
    }

    fetch(`${Api}/api/products/getbyid/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3 fs-4">Loading product...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <Container>
        <div
          className="bg-white rounded-4 shadow-lg p-4 p-md-5"
          style={{ borderRadius: "24px" }}
        >
          <Row className="g-5">
            {/* Product Image */}
            <Col lg={5} className="text-center">
              <img
                src={
                  product.productImage?.[0] ||
                  "https://via.placeholder.com/500x600.png?text=Product+Image"
                }
                alt={product.productName}
                className="img-fluid rounded-3 shadow"
                style={{ maxHeight: "600px", objectFit: "contain" }}
              />
            </Col>

            {/* Product Details */}
            <Col lg={7}>
              <h1 className="display-5 fw-bold text-primary mb-3">
                {product.productName}
              </h1>
              <p className="lead text-muted mb-2">{product.genericName}</p>
              <p className="text-secondary mb-4">By {product.brandName}</p>

              <div className="fs-3 fw-bold text-danger mb-4">
                ₹{product.mrp}
              </div>

              <Row className="g-3 mb-5">
                <Col md={6}>
                  <div className="p-3 bg-light rounded-3 border-start border-primary border-5">
                    <strong>Strength</strong>
                    <p className="mb-0 mt-1">{product.strength}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded-3 border-start border-success border-5">
                    <strong>Dosage Form</strong>
                    <p className="mb-0 mt-1">{product.dosageForm}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded-3 border-start border-warning border-5">
                    <strong>Pack Size</strong>
                    <p className="mb-0 mt-1">{product.packSize}</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="p-3 bg-light rounded-3 border-start border-5"
                       style={{
                         borderColor: product.prescriptionRequired ? "#d32f2f" : "#2e7d32",
                       }}>
                    <strong>Prescription</strong>
                    <p className="mb-0 mt-1">
                      <Badge bg={product.prescriptionRequired ? "danger" : "success"}>
                        {product.prescriptionRequired ? "Required" : "Not Required"}
                      </Badge>
                    </p>
                  </div>
                </Col>
              </Row>

              {/* Composition */}
              <div className="mb-5">
                <h3 className="text-primary mb-3 border-bottom border-primary d-inline-block pb-2">
                  Composition
                </h3>
                <ListGroup variant="flush">
                  {product.composition.map((item, i) => (
                    <ListGroup.Item key={i} className="border-0 px-0">
                      <strong>{item.name}</strong> – {item.strength}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              {/* Uses */}
              <div className="mb-4">
                <h3 className="text-primary mb-3 border-bottom border-primary d-inline-block pb-2">
                  Uses
                </h3>
                <ListGroup variant="flush">
                  {product.uses.map((use, i) => (
                    <ListGroup.Item key={i} className="border-0 px-0">
                      {use}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <a
                href="/products"
                className="btn btn-lg btn-outline-primary rounded-pill px-5"
              >
                Back to Products
              </a>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SingleProduct;