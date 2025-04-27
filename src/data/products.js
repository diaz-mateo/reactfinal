const products = [
    { id: '1', name: 'Laptop', price: 1200, category: 'electronica', description: 'Laptop de alta gama' },
    { id: '2', name: 'Camisa', price: 40, category: 'ropa', description: 'Camisa elegante' },
    { id: '3', name: 'Libro de React', price: 30, category: 'libros', description: 'Aprende React desde cero' },
    { id: '4', name: 'Auriculares', price: 200, category: 'electronica', description: 'Auriculares con cancelación de ruido' },
  ];
  
  export const getProducts = (categoryId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (categoryId) {
          resolve(products.filter(p => p.category === categoryId));
        } else {
          resolve(products);
        }
      }, 500);
    });
  };
  
  export const getProductById = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.find(p => p.id === id));
      }, 500);
    });
  };  