import { Link } from 'react-router-dom';

export default function Card(props) {
  const apiHost = import.meta.env.VITE_API_HOST;
  const imageUrl = `${apiHost}/images/${props.product.image_filename}`;
  const id = props.product.product_id;
  const total= props.product.cost*props.product.quantity

  return (
    <div key={props.index} className="card">
      <div className="card-body">
        <div className="d-flex">
          {props.product.image_filename ? (
            <img src={imageUrl} className="thumbnail" alt={props.product.name} />
          ) : (
            <img src="https://placehold.co/604x272" className="thumbnail" alt="Placeholder" />
          )}
          <div>
          <h4 className="card-title">{props.product.name}</h4>
          <p className="card-quantity">Quantity: {props.product.quantity} </p> 
          <p className="card-cost">{props.product.cost} G</p>
          <p classNAme="card-total"> Total: {total} </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
