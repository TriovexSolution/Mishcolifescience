import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiScissors, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const ProductColorAdmin = () => {
  const [productColors, setProductColors] = useState([]);
  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);
  const [form, setForm] = useState({ p_id: "", color_id: "", images: [""] });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductColors();
    fetchProducts();
    fetchColors();
  }, []);

  const fetchProductColors = async () => {
    try {
      const res = await axios.get("${API_URL}/product-colors");
      setProductColors(res.data);
    } catch (err) {
      setError("Failed to fetch product colors");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("${API_URL}/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  const fetchColors = async () => {
    try {
      const res = await axios.get("${API_URL}/colors");
      setColors(res.data);
    } catch (err) {
      setError("Failed to fetch colors");
    }
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm({ ...form, images: newImages });
  };

  const addImageField = () => {
    setForm({ ...form, images: [...form.images, ""] });
  };

  const removeImageField = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/product-colors/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post("${API_URL}/product-colors", form);
      }
      setForm({ p_id: "", color_id: "", images: [""] });
      fetchProductColors();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save product color");
    }
  };

  const handleEdit = (productColor) => {
    setForm({ p_id: productColor.p_id, color_id: productColor.color_id, images: productColor.ProductImages.map(img => img.url) });
    setEditId(productColor.pcolor_id);
  };

  const handleDelete = async (pcolor_id) => {
    try {
      await axios.delete(`${API_URL}/product-colors/${pcolor_id}`);
      fetchProductColors();
    } catch (err) {
      setError("Failed to delete product color");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiScissors className="w-8 h-8 text-purple-600" />
          Manage Product Colors
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{editId ? "Edit" : "Add"} Product Color</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Product</label>
              <select
                value={form.p_id}
                onChange={(e) => setForm({ ...form, p_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.p_id} value={p.p_id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Color</label>
              <select
                value={form.color_id}
                onChange={(e) => setForm({ ...form, color_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Color</option>
                {colors.map((c) => (
                  <option key={c.color_id} value={c.color_id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Images</label>
              {form.images.map((image, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                  {form.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageField(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Add Image
              </button>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Product Color
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Colors</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Product</th>
                <th className="p-2 text-gray-700">Color</th>
                <th className="p-2 text-gray-700">Images</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productColors.map((pc) => (
                <tr key={pc.pcolor_id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{pc.pcolor_id}</td>
                  <td className="p-2">{pc.Product?.name || "N/A"}</td>
                  <td className="p-2">{pc.Color?.name || "N/A"}</td>
                  <td className="p-2">{pc.ProductImages?.length || 0}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(pc)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(pc.pcolor_id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductColorAdmin;