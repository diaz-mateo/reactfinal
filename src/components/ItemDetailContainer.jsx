// src/components/ItemDetailContainer.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const ref = doc(db, 'products', itemId);
        const res = await getDoc(ref);

        if (res.exists()) {
          setProduct({ id: res.id, ...res.data() });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Error al cargar producto:', err);
        setError('Hubo un problema al cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  if (loading) return <p className="m-4">🔄 Cargando producto...</p>;
  if (error) return <p className="m-4 text-danger">{error}</p>;
  if (!product) return <p className="m-4 text-warning">⚠️ Producto no encontrado.</p>;

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;