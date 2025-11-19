import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDroplet, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const ColorAdmin = () => {
  const [colors, setColors] = useState([]);
  const [form, setForm] = useState({ name: "", hex: "#E5E7EB" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      const res = await axios.get(`${API_URL}/color/get-colors`);
      setColors(res.data);
    } catch (err) {
      setError("Failed to fetch colors");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/color/update-color/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/color/create-color`, form);
      }
      setForm({ name: "", hex: "#E5E7EB" });
      fetchColors();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save color");
    }
  };

  const handleEdit = (color) => {
    setForm({ name: color.name, hex: color.hex });
    setEditId(color._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/color/delete-color/${id}`);
      fetchColors();
    } catch (err) {
      setError("Failed to delete color");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiDroplet className="w-8 h-8 text-pink-600" />
          Manage Colors
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit" : "Add"} Color
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
              <label className="block text-gray-700">Hex Code</label>
              <input
                type="color"
                value={form.hex}
                onChange={(e) => setForm({ ...form, hex: e.target.value })}
                className="w-16 h-10 border rounded-lg cursor-pointer"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Color
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Colors</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Name</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {colors.map((color) => (
                <tr key={color._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{color._id}</td>
                  <td className="p-2 flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: color.hex }}
                    ></span>
                    {color.name}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(color)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(color._id)}
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

export default ColorAdmin;
