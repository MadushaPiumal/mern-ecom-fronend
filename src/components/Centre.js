import { Button,  } from "react-bootstrap";
import { Link } from "react-router-dom";

const Centre = ({ centre }) => {
  return (
    <div className='item'>
      <Link to={`/centre/${centre._id}`}>
        <Button variant="warning">{centre.name}</Button>
      </Link>
    </div>
  );
};

export default Centre;
