import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context/AppContext"; // Adjust the path as needed
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const { id } = useParams();
  // const url = "http://localhost:1000/api";
  const url = "https://techspot-zf30.onrender.com/api";

  const { addToCart } = useContext(AppContext); // Get addToCart from context

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.product);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <div
        className="container text-center my-5 p-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt=""
            style={{
              width: "350px",
              height: "350px",
              borderRadius: "10px",
              border: "2px solid yellow",
            }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p
            style={{
              fontSize: "20px",
              color: "white",
              lineHeight: "1.5",
              marginTop: "35px",
              marginBottom: "35px",
              marginLeft: "35px",
            }}
          >
            {product?.description}
          </p>

          <h1>₹ {product?.price}</h1>
          <div className="my-5">
            <Link
              className="btn btn-danger mx-3"
              to={"/cart"}
              style={{ fontWeight: "bold" }}
              onClick={() =>
                addToCart(
                  product._id,
                  product.title,
                  product.price,
                  1,
                  product.imgSrc
                )
              }
            >
              Buy Now
            </Link>
            <button
              className="btn btn-warning"
              onClick={() =>
                addToCart(
                  product._id,
                  product.title,
                  product.price,
                  1,
                  product.imgSrc
                )
              }
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
