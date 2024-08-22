"use client"
import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product.id !== id));
      } else {
        console.error('Error deleting product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        const data = await response.json();
        setProducts([...products, data]);
      } else {
        console.error('Error adding product:', response.status);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">STT</th>
            <th className="px-4 py-2">Tên sản phẩm</th>
            <th className="px-4 py-2">Hình ảnh</th>
            <th className="px-4 py-2">Giá</th>
            <th className="px-4 py-2">Số lượng</th>
            <th className="px-4 py-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2">{product.id}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain"
                />
              </td>
              <td className="px-4 py-2">{product.price} VND</td>
              <td className="px-4 py-2">{product.quantity}</td>
              <td className="px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    // Implement edit functionality
                    console.log('Edit product:', product);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Thêm mới sản phẩm</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const newProduct: Product = {
              id: products.length + 1,
              name: formData.get('name')?.toString() || '',
              price: parseInt(formData.get('price')?.toString() || '0'),
              quantity: parseInt(formData.get('quantity')?.toString() || '0'),
              image: formData.get('image')?.toString() || '',
            };
            handleAddProduct(newProduct);
          }}
        >
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Tên
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Hình ảnh
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
              Giá
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
              Số lượng
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductList;
