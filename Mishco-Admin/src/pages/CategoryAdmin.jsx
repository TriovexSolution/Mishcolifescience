import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiGrid, FiEdit2, FiTrash2 } from "react-icons/fi";
import { API_URL } from "../components/Variable";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", image: null });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/category/get-categories`);
      setCategories(res.data);
    } catch (err) {
      setError("Failed to fetch categories");
    }
  };

  // ✅ Handle create / update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editId) {
        await axios.put(`${API_URL}/category/update-category/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/category/createcategory`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ name: "", image: null });
      document.getElementById("imageInput").value = "";
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save category");
    }
  };

  // ✅ Edit category
  const handleEdit = (category) => {
    setForm({ name: category.name, image: null });
    setEditId(category._id);
  };

  // ✅ Delete category
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/category/delete-category/${id}`);
      fetchCategories();
    } catch (err) {
      setError("Failed to delete category");
    }
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-8">
          <FiGrid className="w-8 h-8 text-green-600" />
          Manage Categories
        </h1>

        {/* Form */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editId ? "Edit" : "Add"} Category
          </h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
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
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required={!editId} // only required when adding
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              {editId ? "Update" : "Add"} Category
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-gray-700">ID</th>
                <th className="p-2 text-gray-700">Name</th>
                <th className="p-2 text-gray-700">Image</th>
                <th className="p-2 text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{category._id}</td>
                  <td className="p-2">{category.name}</td>
                  <td className="p-2">
                    {category.image ? (
                      <img
                        src={`${API_URL}/uploads/${category.image}`} // ✅ fixed path
                        alt={category.name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
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

export default CategoryAdmin;
