import './Card.css';

const Card = ({ children, className = '', hover = true, onClick }) => {
  const cardClass = `card ${hover ? 'card-hover' : ''} ${className}`;
  
  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
