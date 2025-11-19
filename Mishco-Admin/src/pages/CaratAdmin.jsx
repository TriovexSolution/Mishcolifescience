import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiStar, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const CaratAdmin = () => {
  const [carats, setCarats] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [form, setForm] = useState({ value: "", multiplier: "", mt_id: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCarats();
    fetchMetalTypes();
  }, []);

  const fetchCarats = async () => {
    try {
      const res = await axios.get(`${API_URL}/carat/get-carats`);
      setCarats(res.data);
    } catch (err) {
      setError("Failed to fetch carats");
    }
  };

  const fetchMetalTypes = async () => {
    try {
      const res = await axios.get(`${API_URL}/metaltype/metal-types`);
      setMetalTypes(res.data);
    } catch (err) {
      setError("Failed to fetch metal types");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/carat/update-carat/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/carat/create-carat`, form);
      }
      setForm({ value: "", multiplier: "", mt_id: "" });
      fetchCarats();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save carat");
    }
  };

  const handleEdit = (carat) => {
    setForm({
      value: carat.value,
      multiplier: carat.multiplier,
      mt_id: carat.mt_id?._id || "",
    });
    setEditId(carat._id); // ✅ use _id
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/carat/delete-carat/${id}`);
      fetchCarats();
    } catch (err) {
      setError("Failed to delete carat");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiStar className="w-8 h-8 text-purple-600" />
          Manage Carats
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit" : "Add"} Carat
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Value</label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-gray-700">Multiplier</label>
              <input
                type="number"
                value={form.multiplier}
                onChange={(e) =>
                  setForm({ ...form, multiplier: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-gray-700">Metal Type</label>
              <select
                value={form.mt_id}
                onChange={(e) => setForm({ ...form, mt_id: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Metal Type</option>
                {metalTypes.map((mt) => (
                  <option key={mt._id} value={mt._id}>
                    {mt.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Carat
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Carats</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Value</th>
                <th className="p-2 text-gray-700">Multiplier</th>
                <th className="p-2 text-gray-700">Metal Type</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {carats?.map((carat) => (
                <tr key={carat._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{carat._id}</td>
                  <td className="p-2">{carat.value}</td>
                  <td className="p-2">{carat.multiplier}</td>
                  <td className="p-2">{carat.mt_id?.name || "N/A"}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(carat)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(carat._id)}
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

export default CaratAdmin;
