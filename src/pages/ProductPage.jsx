import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../services/api';
import ProductItem from '../components/ProductItem/ProductItem';
import loadingImg from '../icons/loading.png';

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className='loading'>
        <img src={loadingImg} alt="loading" />
      </div>
    )
  }
  if (error) return <div>Ошибка: {error} <Link to="/">На главную</Link></div>;
  if (!product) return <div>Товар не найден <Link to="/">На главную</Link></div>;

  return (
    <>
      <ProductItem product={product}/>
    </>
  )
}

export { ProductPage };