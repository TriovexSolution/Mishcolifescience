import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiHexagon, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const ProductCaratAdmin = () => {
  const [productCarats, setProductCarats] = useState([]);
  const [products, setProducts] = useState([]);
  const [carats, setCarats] = useState([]);
  const [form, setForm] = useState({ p_id: "", carat_id: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProductCarats();
    fetchProducts();
    fetchCarats();
  }, []);

  const fetchProductCarats = async () => {
    try {
      const res = await axios.get("${API_URL}/product-carats");
      setProductCarats(res.data);
    } catch (err) {
      setError("Failed to fetch product carats");
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

  const fetchCarats = async () => {
    try {
      const res = await axios.get("${API_URL}/carats");
      setCarats(res.data);
    } catch (err) {
      setError("Failed to fetch carats");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/product-carats/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post("${API_URL}/product-carats", form);
      }
      setForm({ p_id: "", carat_id: "" });
      fetchProductCarats();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save product carat");
    }
  };

  const handleEdit = (productCarat) => {
    setForm({ p_id: productCarat.p_id, carat_id: productCarat.carat_id });
    setEditId(productCarat.pc_id);
  };

  const handleDelete = async (pc_id) => {
    try {
      await axios.delete(`${API_URL}/product-carats/${pc_id}`);
      fetchProductCarats();
    } catch (err) {
      setError("Failed to delete product carat");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiHexagon className="w-8 h-8 text-orange-600" />
          Manage Product Carats
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{editId ? "Edit" : "Add"} Product Carat</h2>
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
              <label className="block text-gray-700">Carat</label>
              <select
                value={form.carat_id}
                onChange={(e) => setForm({ ...form, carat_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Carat</option>
                {carats.map((c) => (
                  <option key={c.carat_id} value={c.carat_id}>{c.value}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Product Carat
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Carats</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Product</th>
                <th className="p-2 text-gray-700">Carat</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productCarats.map((pc) => (
                <tr key={pc.pc_id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{pc.pc_id}</td>
                  <td className="p-2">{pc.Product?.name || "N/A"}</td>
                  <td className="p-2">{pc.Carat?.value || "N/A"}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(pc)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(pc.pc_id)}
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

export default ProductCaratAdmin;