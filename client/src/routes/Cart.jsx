import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import CartCard from '../ui/CartCard';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cookies] = useCookies(['cart']);
  const apiHost = import.meta.env.VITE_API_HOST;

  useEffect(() => {
    const fetchProducts = async () => {
      const productIds = cookies.cart ? cookies.cart.split(',') : []; // Get cart items from cookies

      // Fetch product details based on cart product IDs
      const productsData = await Promise.all(
        productIds.map(async (id) => {
          const response = await fetch(`${apiHost}/api/products/${id}`);
          const product = await response.json();
          return product;
        })
      );

      setProducts(productsData);
    };

    fetchProducts();
  }, [cookies.cart, apiHost]);

  if (products.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      <div className="cart-list">
        {products.map((product, index) => (
          <CartCard key={index} product={product} index={index} />
        ))}
      </div>
    </div>
  );
}
