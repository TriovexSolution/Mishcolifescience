import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiDollarSign, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const CurrencyAdmin = () => {
  const [currencies, setCurrencies] = useState([]);
  const [form, setForm] = useState({ code: "", conversionRateToINR: "" });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get(`${API_URL}/currency/get-currency`);
      setCurrencies(res.data);
    } catch (err) {
      setError("Failed to fetch currencies");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editId) {
        await axios.put(`${API_URL}/currency/update-currency/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/currency/create-currency`, form);
      }
      setForm({ code: "", conversionRateToINR: "" });
      fetchCurrencies();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save currency");
    }
  };

  const handleEdit = (currency) => {
    setForm({
      code: currency.code,
      conversionRateToINR: currency.conversionRateToINR,
    });
    setEditId(currency._id); // ✅ fixed
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${API_URL}/currency/delete-currency/${_id}`);
      fetchCurrencies();
    } catch (err) {
      setError("Failed to delete currency");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiDollarSign className="w-8 h-8 text-teal-600" />
          Manage Currencies
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit" : "Add"} Currency
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Code</label>
              <input
                type="text"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Conversion Rate to INR
              </label>
              <input
                type="number"
                value={form.conversionRateToINR}
                onChange={(e) =>
                  setForm({ ...form, conversionRateToINR: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
                min="0"
                step="0.0001"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Currency
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Currencies
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Code</th>
                <th className="p-2 text-gray-700">Conversion Rate to INR</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr
                  key={currency._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-2">{currency._id}</td>
                  <td className="p-2">{currency.code}</td>
                  <td className="p-2">{currency.conversionRateToINR}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(currency)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(currency._id)}
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

export default CurrencyAdmin;
