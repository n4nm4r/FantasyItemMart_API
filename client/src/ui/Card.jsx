import { Link } from 'react-router-dom';

export default function Card(props) {
  const apiHost = import.meta.env.VITE_API_HOST;
  const imageUrl = `${apiHost}/images/${props.product.image_filename}`;
  const id= props.product.product_id

  return (
    <div key={props.index} className="card mb-4">
      <div className="card-body">
        <div className="d-flex">
          {props.product.image_filename ? (
            <img src={imageUrl} className="thumbnail" alt={props.product.name} />
          ) : (
            <img src="https://placehold.co/604x272" className="thumbnail" alt="Placeholder" />
          )}
          <div className="product-info">
            <h4 className="card-title">{props.product.name}</h4>
            {/* <p className="card-description">{props.product.description}</p> */}
            <p className="card-cost">{props.product.cost} G</p>
            {/* <p> ${props.product.product_id}</p> */}
            <Link to={`/details/${props.product.product_id}`} className="btn btn-outline-secondary">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}