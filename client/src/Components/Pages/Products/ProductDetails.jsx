import React, { useEffect } from "react";
import "./ProductDetails.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../../Redux/actions/ProductActions";
import Loading from "../../../Utils/Loading/Loading";

function ProductDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    async function fetchData() {
      await dispatch(productDetails(path));
    }
    fetchData();
  }, [dispatch, path]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <h1>error</h1>
      ) : (
        <>
          {product._id ? (
            <>
              <div className="detail">
                <img src={product.images.url} alt="" />
                <div className="box-detail">
                  <div className="row">
                    <h2>{product.title}</h2>
                    <h6>#id: {product.product_Id}</h6>
                  </div>
                  <span>$ {product.price}</span>
                  <p>{product.description}</p>
                  <p>{product.content}</p>
                  <p>Sold: {product.sold}</p>
                  <Link
                    to="/cart"
                    className="cart"
                    //   onClick={() => addCart(product)}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </>
          ) : null}
        </>
      )}
    </>
  );
}

export default ProductDetails;
