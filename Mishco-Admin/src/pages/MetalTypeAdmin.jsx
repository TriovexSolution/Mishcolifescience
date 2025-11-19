import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiLayers, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const MetalTypeAdmin = () => {
  const [metalTypes, setMetalTypes] = useState([]);
  const [form, setForm] = useState({ name: "", baseRatePerGram: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMetalTypes();
  }, []);

  // Fetch all metal types
  const fetchMetalTypes = async () => {
    try {
      const res = await axios.get(`${API_URL}/metaltype/metal-types`);
      setMetalTypes(res.data);
    } catch {
      setError("Failed to fetch metal types");
    }
  };

  // Handle form submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        baseRatePerGram: Number(form.baseRatePerGram),
      };

      if (!payload.name || isNaN(payload.baseRatePerGram)) {
        return setError("Please provide valid name and base rate");
      }

      if (editId) {
        await axios.put(`${API_URL}/metaltype/metal-types/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/metaltype/create`, payload);
      }

      setForm({ name: "", baseRatePerGram: "" });
      fetchMetalTypes();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save metal type");
    }
  };

  // Edit button
  const handleEdit = (metalType) => {
    setForm({
      name: metalType.name,
      baseRatePerGram: metalType.baseRatePerGram,
    });
    setEditId(metalType._id);
  };

  // Delete button
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${API_URL}/metaltype/metal-types/${_id}`);
      fetchMetalTypes();
    } catch {
      setError("Failed to delete metal type");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiLayers className="w-8 h-8 text-indigo-600" />
          Manage Metal Types
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit" : "Add"} Metal Type
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
              <label className="block text-gray-700">Base Rate Per Gram</label>
              <input
                type="number"
                value={form.baseRatePerGram}
                onChange={(e) =>
                  setForm({ ...form, baseRatePerGram: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
                min="0"
                step="0.01"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Metal Type
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Metal Types
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Name</th>
                <th className="p-2 text-gray-700">Base Rate Per Gram</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {metalTypes.map((metalType) => (
                <tr key={metalType._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{metalType._id}</td>
                  <td className="p-2">{metalType.name}</td>
                  <td className="p-2">{metalType.baseRatePerGram}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(metalType)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(metalType._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {metalTypes.length === 0 && (
            <p className="text-gray-500 mt-4">No metal types found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetalTypeAdmin;
