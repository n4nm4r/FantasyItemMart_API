import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export default function Details() {
  const { id } = useParams();

  
  if (isNaN(Number(id))) {
    return <div>Invalid request id.</div>;
  }

  const [product, setProduct] = useState(null); 
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiUrl = `${apiHost}/api/products/${id}`;

  

  useEffect(() => {
    let ignore = false;

    // Fetch data from API
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (!ignore) {
            setProduct(data);
          }
        } else {
          if (!ignore) {
            setProduct(null);
          }
        }
      } catch (error) {
        if (!ignore) {
          setProduct(null);
        }
      } 
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, [apiUrl]);

  

  if (!product) {
    return <div>No product found.</div>; // Display a message if no product is found
  }
  function addProduct(item){
    console.log(item);
    if(cookies.cart){
        setCookie('cart',cookies.cart +`,`+ item, {maxAge: 7200});
        console.log(cookies.cart);
    }else {
    setCookie('cart', item, {maxAge: 7200});
    
    }
  }

  

  const imageUrl = `${apiHost}/images/${product.image_filename}`;

  return (
    <div >
      
        <div className="d-flex">
          {product.image_filename ? (
            <img src={imageUrl} className="product_image" alt={product.name} />
          ) : (
            <img src="https://placehold.co/604x272" className="thumbnail" alt="Placeholder" />
          )}
          <div className="product-info">
            <h4 className="card-title">{product.name}</h4>
            <p className="card-description">{product.description}</p>
            <p className="card-cost">{product.cost} G</p>
            <div>
            <Link to={`/`} className="btn btn-outline-secondary">Back</Link>&nbsp;
                <button onClick={() => addProduct(product.product_id)} className="btn btn-outline-secondary">Add to Cart</button>
            </div>
          </div>
        </div>
      
    </div>
  );
}
