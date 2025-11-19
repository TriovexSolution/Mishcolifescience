import React, { useState, useEffect } from "react";
import axios from "axios";
import { Ruler, Edit, Trash } from "lucide-react";
import { API_URL } from "../components/Variable";

const SizeAdmin = () => {
  const [sizes, setSizes] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSizes();
  }, []);

  const fetchSizes = async () => {
    try {
      const res = await axios.get(`${API_URL}/size/get-sizes`);
      setSizes(res.data);
    } catch (err) {
      setError("Failed to fetch sizes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/size/update-size/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/size/create-size`, form);
      }
      setForm({ name: "" });
      fetchSizes();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save size");
    }
  };

  const handleEdit = (size) => {
    setForm({ name: size.name });
    setEditId(size.s_id); // ✅ using s_id from backend
  };

  const handleDelete = async (s_id) => {
    try {
      await axios.delete(`${API_URL}/size/delete-size/${s_id}`);
      fetchSizes();
    } catch (err) {
      setError("Failed to delete size");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <Ruler className="w-8 h-8 text-blue-600" />
          Manage Sizes
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit" : "Add"} Size
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
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Size
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sizes</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Name</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size) => (
                <tr key={size.s_id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{size.s_id}</td>
                  <td className="p-2">{size.name}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(size)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(size.s_id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
              {sizes.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-gray-500 text-center">
                    No sizes yet.
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

export default SizeAdmin;
