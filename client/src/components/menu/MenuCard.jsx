import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const FALLBACK_DISH_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';

const MenuCard = ({ item }) => {
  return (
    <article className="menu-card" data-category={item.category}>
      <div className="menu-card-img-wrapper">
        <img
          src={item.image}
          alt={item.name}
          className="menu-card-img"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_DISH_IMAGE) {
              e.currentTarget.src = FALLBACK_DISH_IMAGE;
            }
          }}
        />
        {item.tag && <span className="menu-card-badge">{item.tag}</span>}
        <span className="menu-card-category-pill">{item.category}</span>
      </div>

      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-title">{item.name}</h3>
          <span className="menu-card-price">£{item.price.toFixed(2)}</span>
        </div>

        <p className="menu-card-description">{item.description}</p>

        <div className="menu-card-footer">
          <span className="menu-dietary-tag">
            <FiCheckCircle size={14} />
            {item.dietary || 'Signature'}
          </span>
          {item.calories && <span className="menu-calories">{item.calories}</span>}
        </div>
      </div>
    </article>
  );
};

export default MenuCard;
