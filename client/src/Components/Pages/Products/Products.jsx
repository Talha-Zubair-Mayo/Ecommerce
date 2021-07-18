import React, { useEffect } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { ListProducts } from "../../../Redux/actions/ProductActions";
import ProductItem from "../../../Utils/ProductItem/ProductItem";
import Loading from "../../../Utils/Loading/Loading";



function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(ListProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
       <Loading/>
      ) : error ? (
        <h1>error</h1>
      ) : (
        <div className="products">
          {products.map((product) => (
            <ProductItem product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default Products;
