import React, { useEffect, useState } from 'react';
import ProductsList from '../components/ProductsList/ProductsList';
import { getProducts } from '../services/api';
import loadingImg from '../icons/loading.png';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Ошибка загрузки:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return (
      <div className='loading'>
        <img src={loadingImg} alt="loading" />
      </div>
    )
  }
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <ProductsList items={products}/>
    </div>
  )
}

export { ProductsPage };