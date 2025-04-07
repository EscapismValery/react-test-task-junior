import React from 'react';
import styles from './ProductsList.module.scss';
import { Link } from 'react-router-dom';

const ProductsList = ({items}) => {
  return (
    <ul className={styles.products}>
      {items.map(item => (
        <li key={item.id} className={styles.product}>
          <Link to={`/${item.id}`} className={styles.product__link}>
            <div className={styles.product__image}>
              <img src={item.colors[0].images[0]} alt={item.colors[0].name} width="100" />
            </div>
            <h2 className={styles.product__label}>{item.name}</h2>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default ProductsList;