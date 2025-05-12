import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../data/products';
import ItemList from './ItemList';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    getProducts(categoryId)
      .then(res => setProducts(res))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {categoryId ? `Categoría: ${categoryId}` : 'Catálogo completo'}
      </h2>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;