import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    getProducts();
  },[count]);

  const getProducts = async () => {
    try {
      const productData = await axios.get("http://localhost:4001/products");
      console.log(productData.data.data);
      setProduct(productData.data.data);
    } catch (error) {
      console.error("Fail to fetch data...");
    }
  };

  const handleDelete = async (index,item) => {
    setProduct(product.toSpliced(index,1));
    
    try {
      await axios.delete(`http://localhost:4001/products/${item}`)
      // getProducts();
      setCount(count+1);

    }
    catch (error) {
      console.error("Fail to delete");
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {product.map((item) => {
          return (
            <div className="product" key={item.id}>
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

              <button className="delete-button" onClick={()=>{handleDelete(item,item.id)}}>
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
