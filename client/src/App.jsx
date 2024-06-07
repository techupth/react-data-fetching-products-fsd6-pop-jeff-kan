import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // const [count, setCount] = useState(0);
  const dataProduct = async () => {
    try {
      setLoading(true);
      const datas = await axios.get("http://localhost:4001/products");
      setProducts(datas.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    dataProduct();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {loading[0] ? (
          <div className="app-wrapper">
            <h1 className="app-title">Loading</h1>
          </div>
        ) : (
          products.map((product, index) => {
            return (
              <div className="product" key={product.id}>
                <div className="product-preview">
                  <img
                    src={product.image}
                    alt="some product"
                    width="350"
                    height="350"
                  />
                </div>
                <div className="product-detail">
                  <h1>Product name: {product.name}</h1>
                  <h2>Product price: {product.price} Baht</h2>
                  <p>Product description: {product.description}</p>
                </div>
                <button
                  className="delete-button"
                  onClick={async () => {
                    await axios.delete(
                      "http://localhost:4001/products/" + product.id
                    );
                    dataProduct();
                    // setCount(count + 1);
                    // return setProducts(products.toSpliced(index, 1));
                  }}
                >
                  x
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;
