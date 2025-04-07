import React, { useEffect, useState } from 'react';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';
import { getSizes } from '../../services/api';

const ProductItem = ({product}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [allSizes, setAllSizes] = useState([]);

  useEffect(() => {
    const loadSizes = async () => {
      try {
        const sizesData = await getSizes();
        setAllSizes(sizesData);
      } catch (err) {
        console.error('Ошибка загрузки размеров:', err);
      }
    };

    loadSizes();
  }, []);

  useEffect(() => {
    setSelectedSize(null);
    setCurrentImageIndex(0);
  }, [selectedColor]);

  const availableSizes = selectedColor 
    ? allSizes.filter(size => selectedColor.sizes.includes(size.id))
    : [];

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      (prev + 1) % selectedColor.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      (prev - 1 + selectedColor.images.length) % selectedColor.images.length
    );
  };

  return (
    <div className={styles.product}>
      <Link to="/" className={styles.product__back}>Вернуться к товарам</Link>

      <div className={styles.product__wrap}>
        {selectedColor && (
          <div className={styles.product__images}>
            <div className={styles.product__imagesPhoto}>
              <img 
                src={selectedColor.images[currentImageIndex]} 
                alt={`${product.name} ${selectedColor.name}`}
              />
            </div>
            <div className={styles.product__imagesBtns}>
              <button 
                onClick={prevImage} 
                className={styles.product__imagesBtn}
              >
                ←
              </button>
              <button 
                onClick={nextImage} 
                className={styles.product__imagesBtn}
              >
                →
              </button>
            </div>
          </div>
        )}
        <div className={styles.product__info}>
          <h1 className={styles.product__title}>{product.name}</h1>
          <div className={styles.product__color}>
            <h3 className={styles.product__color__title}><span>Цвет:</span> {selectedColor.name}</h3>
            <div className={styles.product__colorOptions}>
              {product.colors.map(color => (
                <div 
                  key={color.id} 
                  className={`${styles.product__colorImage} ${selectedColor?.id === color.id ? styles.active : ''}`}
                  onClick={() => setSelectedColor(color)}  
                >
                  <img 
                    src={color.images[0]} 
                    alt={`${product.name} ${color.name}`}
                  />
                </div>
              ))}
            </div>
          </div>
          {selectedColor && (
            <div className={styles.product__size}>
              <h3 className={styles.product__sizeTitle}>Размер:</h3>
              <div className={styles.product__sizeOptions}>
                {allSizes.map(size => {
                  const isAvailable = availableSizes.some(s => s.id === size.id);
                  return (
                    <button
                      key={size.id}
                      className={`${styles.product__sizeOption} ${selectedSize === size.id ? styles.selected : ''} ${!isAvailable ? styles.disabled : ''}`}
                      onClick={() => isAvailable && setSelectedSize(size.id)}
                      disabled={!isAvailable}
                    >
                      {size.label} ({size.number})
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <p className={styles.product__price}>{selectedColor?.price} ₽</p>
          <button className={styles.product__btn} disabled={!selectedSize}>Добавить в корзину</button>
          <div className={styles.product__descr}>
            <h3 className={styles.product__descrLabel}>Описание:</h3>
            <p>{selectedColor?.description || 'Нет описания'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;