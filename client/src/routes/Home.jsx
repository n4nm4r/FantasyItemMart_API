import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Card from '../ui/Card.jsx';

export default function Home(){
    const [product, setProduct] = useState([]);
    const apiHost = import.meta.env.VITE_API_HOST;
    const apiUrl= apiHost + '/api/products/all'

    useEffect(() => {
        // Fetch data from API
        async function fetchData() {      
          const response = await fetch(apiUrl);
          if(response.ok){ 
            const data = await response.json();
            console.log(data)
            if (!ignore) {
              setProduct(data);
            }
          } else {
            setProduct(null);
          }
        }
    
        let ignore = false;
        fetchData();
        return () => {
           ignore = true;
        }
      }, []);

      




    return(
        <>
        <div className="d-flex justify-content-center">
        <h1>Home Page</h1>
        </div>
        <div className="d-flex justify-content-center">
        
        </div>
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-wrap">
        {product.length > 0 ?
            
            product
            .map((product,index) =>(
                <Card key={index} product={product} showLinks={true}/>
                
            )):
            <div>No Products.</div>
        }
        </div>
        </div>

        </>
        

    )
}