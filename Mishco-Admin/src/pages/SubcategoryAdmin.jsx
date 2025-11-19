import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiTag, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const SubcategoryAdmin = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", c_id: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/subcategory/get-subcategories`);
      setSubcategories(res.data);
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.error || "Failed to fetch subcategories");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/category/get-categories`);
      setCategories(res.data);
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.error || "Failed to fetch categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        // ✅ Update existing subcategory
        await axios.put(`${API_URL}/subcategory/update-subcategory/${editId}`, form);
        setEditId(null);
      } else {
        // ✅ Create new subcategory
        await axios.post(`${API_URL}/subcategory/create-subcategory`, form);
      }
      setForm({ name: "", c_id: "" });
      fetchSubcategories();
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.error || "Failed to save subcategory");
    }
  };

  const handleEdit = (subcategory) => {
    setForm({
      name: subcategory.name,
      c_id: subcategory.category?.c_id || subcategory.category?._id || "",
    });
    setEditId(subcategory.sc_id); // ✅ use sc_id from backend
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/subcategory/delete-subcategory/${id}`);
      fetchSubcategories();
    } catch (err) {
      console.error(err.response || err);
      setError(err.response?.data?.error || "Failed to delete subcategory");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiTag className="w-8 h-8 text-orange-600" />
          Manage Subcategories
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit" : "Add"} Subcategory
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Category</label>
              <select
                value={form.c_id}
                onChange={(e) => setForm({ ...form, c_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Subcategory
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Subcategories</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Name</th>
                <th className="p-2 text-gray-700">Category</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory) => (
                <tr key={subcategory.sc_id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{subcategory.sc_id}</td>
                  <td className="p-2">{subcategory.name}</td>
                  <td className="p-2">
                    {subcategory.category?.name || "N/A"}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(subcategory)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(subcategory.sc_id)} // ✅ use sc_id
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {subcategories.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-4 text-gray-500 text-center">
                    No subcategories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryAdmin;
