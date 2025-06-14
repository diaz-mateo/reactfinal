// src/components/ItemListContainer.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ItemList from './ItemList';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const productsRef = collection(db, 'products');
        const q = categoryId
          ? query(productsRef, where('category', '==', categoryId))
          : productsRef;

        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setProducts(items);
      } catch (err) {
        console.error('Error al obtener productos:', err);
        setError('Hubo un error al cargar los productos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">
  {categoryId
    ? `Categoría: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}`
    : 'Catálogo completo'}
</h2>

      {loading && <p className="text-muted">🔄 Cargando productos...</p>}
      {error && <p className="text-danger">❌ {error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className="text-warning">⚠️ No hay productos disponibles en esta categoría.</p>
      )}
      {!loading && !error && products.length > 0 && (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;