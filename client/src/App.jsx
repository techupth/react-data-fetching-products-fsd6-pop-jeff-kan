import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [loadingData, setLoadingData] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductFormation();
  }, []);

  const handleClickDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newResult = product.filter((item) => {
      return item.id !== id;
    });
    setProduct(newResult);
  };

  const getProductFormation = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProduct(result.data.data);
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {product.map((item) => {
        return (
          <div className="product-list" key={item.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price} Baht</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => handleClickDelete(item.id)}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
