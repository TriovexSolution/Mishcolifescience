import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiBox, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const ProductVariantAdmin = () => {
  const [productVariants, setProductVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [productCarats, setProductCarats] = useState([]);
  const [form, setForm] = useState({ p_id: "", s_id: "", pcolor_id: "", pc_id: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductVariants();
    fetchProducts();
    fetchSizes();
    fetchProductColors();
    fetchProductCarats();
  }, []);

  const fetchProductVariants = async () => {
    try {
      const res = await axios.get("${API_URL}/product-variants");
      setProductVariants(res.data);
    } catch (err) {
      setError("Failed to fetch product variants");
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

  const fetchSizes = async () => {
    try {
      const res = await axios.get("${API_URL}/sizes");
      setSizes(res.data);
    } catch (err) {
      setError("Failed to fetch sizes");
    }
  };

  const fetchProductColors = async () => {
    try {
      const res = await axios.get("${API_URL}/product-colors");
      setProductColors(res.data);
    } catch (err) {
      setError("Failed to fetch product colors");
    }
  };

  const fetchProductCarats = async () => {
    try {
      const res = await axios.get("${API_URL}/product-carats");
      setProductCarats(res.data);
    } catch (err) {
      setError("Failed to fetch product carats");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/product-variants/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post("${API_URL}/product-variants", form);
      }
      setForm({ p_id: "", s_id: "", pcolor_id: "", pc_id: "" });
      fetchProductVariants();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save product variant");
    }
  };

  const handleEdit = (variant) => {
    setForm({ p_id: variant.p_id, s_id: variant.s_id, pcolor_id: variant.pcolor_id, pc_id: variant.pc_id });
    setEditId(variant.pv_id);
  };

  const handleDelete = async (pv_id) => {
    try {
      await axios.delete(`${API_URL}/product-variants/${pv_id}`);
      fetchProductVariants();
    } catch (err) {
      setError("Failed to delete product variant");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiBox className="w-8 h-8 text-green-600" />
          Manage Product Variants
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{editId ? "Edit" : "Add"} Product Variant</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Product</label>
              <select
                value={form.p_id}
                onChange={(e) => setForm({ ...form, p_id: e.target.value, pcolor_id: "", pc_id: "" })}
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
              <label className="block text-gray-700">Size</label>
              <select
                value={form.s_id}
                onChange={(e) => setForm({ ...form, s_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Size</option>
                {sizes.map((s) => (
                  <option key={s.s_id} value={s.s_id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Product Color</label>
              <select
                value={form.pcolor_id}
                onChange={(e) => setForm({ ...form, pcolor_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Product Color</option>
                {productColors
                  .filter((pc) => pc.p_id === Number(form.p_id))
                  .map((pc) => (
                    <option key={pc.pcolor_id} value={pc.pcolor_id}>
                      {pc.Color?.name || "N/A"}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Product Carat</label>
              <select
                value={form.pc_id}
                onChange={(e) => setForm({ ...form, pc_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Product Carat</option>
                {productCarats
                  .filter((pc) => pc.p_id === Number(form.p_id))
                  .map((pc) => (
                    <option key={pc.pc_id} value={pc.pc_id}>
                      {pc.Carat?.value || "N/A"}
                    </option>
                  ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Product Variant
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Variants</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Product</th>
                <th className="p-2 text-gray-700">Size</th>
                <th className="p-2 text-gray-700">Color</th>
                <th className="p-2 text-gray-700">Carat</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productVariants.map((variant) => (
                <tr key={variant.pv_id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{variant.pv_id}</td>
                  <td className="p-2">{variant.Product?.name || "N/A"}</td>
                  <td className="p-2">{variant.Size?.name || "N/A"}</td>
                  <td className="p-2">{variant.ProductColor?.Color?.name || "N/A"}</td>
                  <td className="p-2">{variant.ProductCarat?.Carat?.value || "N/A"}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(variant)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(variant.pv_id)}
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

export default ProductVariantAdmin;