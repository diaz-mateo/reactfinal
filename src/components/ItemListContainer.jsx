// src/components/ItemListContainer.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const productsRef = collection(db, 'products');
    const q = categoryId
      ? query(productsRef, where('category', '==', categoryId))
      : productsRef;

    getDocs(q)
      .then((res) => {
        const items = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(items);
      })
      .catch((err) => console.error('Error al obtener productos:', err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
        {categoryId ? `Categoría: ${categoryId}` : 'Catálogo completo'}
      </h2>

      {loading && <p>Cargando productos...</p>}
      {!loading && products.length === 0 && <p>No hay productos disponibles.</p>}

      <div className="d-flex flex-wrap justify-content-start">
        {products.map(p => <Item key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default ItemListContainer;