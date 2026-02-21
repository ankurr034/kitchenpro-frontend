import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const [image, setImage] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formData
        );
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
    });
    setImage(null);
    setEditingId(null);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );
      fetchProducts();
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
    });
    setEditingId(product._id);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">
        Manage Products
      </h1>

      {/* Product Form */}
      <div className="bg-white p-6 rounded shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="border p-2 rounded md:col-span-2"
          />

          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="md:col-span-2"
          />

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded"
            >
              {editingId ? "Update" : "Add"} Product
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search product..."
        className="border p-2 mb-6 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Product List */}
      <div className="grid md:grid-cols-2 gap-6">
        {products
          .filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-bold text-lg">
                {product.name}
              </h3>

              <p className="text-gray-600">
                {product.description}
              </p>

              <p className="mt-2">
                ₹{product.price}
              </p>

              <p>
                Stock:{" "}
                <span
                  className={
                    product.quantity < 5
                      ? "text-red-500"
                      : "text-green-600"
                  }
                >
                  {product.quantity}
                </span>
              </p>

              {product.image && (
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt=""
                  className="h-24 mt-3 object-cover"
                />
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </AdminLayout>
  );
}

export default AdminProducts;
