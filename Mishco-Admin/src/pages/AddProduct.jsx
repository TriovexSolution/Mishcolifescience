// src/pages/AddProduct.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

/**
 * AddProduct.jsx
 * - Tailwind card-based layout (responsive + attractive)
 * - Uses import.meta.env.VITE_REACT_APP_API_URL for backend
 * - Dynamic fields: composition, uses, mechanismOfAction, indications, contraindications
 * - Image preview + file upload (multipart/form-data)
 * - Category dropdown fetched from backend
 *
 * Usage:
 * 1. Ensure .env: VITE_REACT_APP_API_URL=http://localhost:5000
 * 2. Restart Vite dev server after editing .env
 * 3. Place this file under src/pages and import into router/Admin panel
 */

export default function AddProduct() {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "";

  // form state
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    productName: "",
    genericName: "",
    brandName: "",
    strength: "",
    dosageForm: "",
    administrationRoute: "",
    packSize: "",
    mrp: "",
    storage: "",
    prescriptionRequired: true,
    category: "",
    isFeatured: false,
    color: "",
  });

  // arrays / complex fields
  const [composition, setComposition] = useState([{ name: "", strength: "" }]);
  const [uses, setUses] = useState([""]);
  const [mechanismOfAction, setMechanismOfAction] = useState([
    { drug: "", moa: "" },
  ]);
  const [indications, setIndications] = useState([""]);
  const [contraindications, setContraindications] = useState([""]);
  const [productImage, setProductImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // fetch categories on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/api/category/getall`);
        if (mounted) {
          // expecting res.data.categories or res.data (handle both)
          setCategories(res.data?.categories || res.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    })();
    return () => (mounted = false);
  }, [API_URL]);

  // basic change handler
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  // file change & preview
  const handleImage = (e) => {
    const file = e.target.files?.[0] || null;
    setProductImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories/getall`);
        if (mounted) {
          // map categories to { id, name } for dropdown
          const cats = res.data.data.map((c) => ({
            id: c._id,
            name: c.name,
          }));
          setCategories(cats);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    })();
    return () => (mounted = false);
  }, [API_URL]);

  // Generic helpers for array-of-objects fields
  const updateArrayObj = (setter, arr, index, key, value) => {
    const copy = [...arr];
    copy[index] = { ...copy[index], [key]: value };
    setter(copy);
  };

  const addArrayObj = (setter, arr, newObj) => setter([...arr, newObj]);
  const removeArrayObj = (setter, arr, idx) => {
    if (arr.length === 1) return; // keep at least one
    setter(arr.filter((_, i) => i !== idx));
  };

  // Generic helpers for simple string arrays (uses, indications, contraindications)
  const updateStringArray = (setter, arr, idx, value) => {
    const copy = [...arr];
    copy[idx] = value;
    setter(copy);
  };
  const addStringArray = (setter, arr) => setter([...arr, ""]);
  const removeStringArray = (setter, arr, idx) => {
    if (arr.length === 1) return;
    setter(arr.filter((_, i) => i !== idx));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !form.productName.trim() ||
      !form.genericName.trim() ||
      !form.strength.trim()
    ) {
      alert("Please fill required fields: productName, genericName, strength.");
      return;
    }
    if (!form.category) {
      alert("Please select a category.");
      return;
    }
    if (!uses.length || uses.every((u) => !u.trim())) {
      alert("Please add at least one use.");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();

      // primitive fields
      Object.keys(form).forEach((k) => fd.append(k, form[k]));

      // arrays - send as JSON strings (backend expects same)
      fd.append("composition", JSON.stringify(composition));
      fd.append("uses", JSON.stringify(uses));
      fd.append("mechanismOfAction", JSON.stringify(mechanismOfAction));
      fd.append("indications", JSON.stringify(indications));
      fd.append("contraindications", JSON.stringify(contraindications));

      if (productImage) fd.append("productImage", productImage);

      // POST to backend route (matches your routes/productRoutes.js)
      const res = await axios.post(`${API_URL}/api/products/add`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Success handling (you may adapt as needed)
      console.log("Add product response:", res.data);
      alert("Product added successfully!");
      // Optionally reset form to defaults
      resetForm();
    } catch (err) {
      console.error("Error adding product:", err);
      const msg = err?.response?.data?.message || "Failed to add product";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      productName: "",
      genericName: "",
      brandName: "",
      strength: "",
      dosageForm: "",
      administrationRoute: "",
      packSize: "",
      mrp: "",
      storage: "",
      prescriptionRequired: true,
      category: "",
      isFeatured: false,
      color: "",
    });
    setComposition([{ name: "", strength: "" }]);
    setUses([""]);
    setMechanismOfAction([{ drug: "", moa: "" }]);
    setIndications([""]);
    setContraindications([""]);
    setProductImage(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info Card */}
          <section className="bg-white shadow-md rounded-2xl p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-700">
                  Basic Information
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Core details for the product
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <input
                name="productName"
                value={form.productName}
                onChange={handleFormChange}
                placeholder="Product Name *"
                className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
                required
              />
              <input
                name="genericName"
                value={form.genericName}
                onChange={handleFormChange}
                placeholder="Generic Name *"
                className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
                required
              />
              <input
                name="brandName"
                value={form.brandName}
                onChange={handleFormChange}
                placeholder="Brand Name"
                className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
              <input
                name="strength"
                value={form.strength}
                onChange={handleFormChange}
                placeholder="Strength (e.g. 500 mg) *"
                className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
                required
              />
              <select
                name="dosageForm"
                value={form.dosageForm}
                onChange={handleFormChange}
                className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
              >
                <option value="">Dosage Form</option>
                <option>Tablet </option>
                <option>Capsule</option>
                <option>Injection</option>
                <option>Syrup</option>
                <option>Cream</option>
                <option>Ointment</option>
                <option>Powder</option>
              </select>
              <input
                name="administrationRoute"
                value={form.administrationRoute}
                onChange={handleFormChange}
                placeholder="Administration Route (e.g. Oral)"
                className="rounded-lg border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
            </div>
          </section>

          {/* Composition Card */}
          <section className="bg-white shadow-md rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Composition
                </h2>
                <p className="text-sm text-gray-400">
                  Add ingredients and strengths
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setComposition([...composition, { name: "", strength: "" }])
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                + Add
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {composition.map((c, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center"
                >
                  <input
                    value={c.name}
                    onChange={(e) =>
                      updateArrayObj(
                        setComposition,
                        composition,
                        i,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Ingredient name *"
                    className="md:col-span-2 rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <input
                    value={c.strength}
                    onChange={(e) =>
                      updateArrayObj(
                        setComposition,
                        composition,
                        i,
                        "strength",
                        e.target.value
                      )
                    }
                    placeholder="Strength (e.g. 500 mg) *"
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <div className="flex gap-2 md:col-span-2 justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayObj(setComposition, composition, i)
                      }
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Uses Card */}
          <section className="bg-white shadow-md rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Uses</h2>
                <p className="text-sm text-gray-400">
                  Primary uses/indications (at least one)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setUses([...uses, ""])}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                + Add
              </button>
            </div>

            <div className="mt-4 space-y-2">
              {uses.map((u, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={u}
                    onChange={(e) =>
                      updateStringArray(setUses, uses, i, e.target.value)
                    }
                    placeholder="Use"
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeStringArray(setUses, uses, i)}
                    className="px-3 py-2 rounded-lg bg-red-100 text-red-700"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* MOA Card */}
          <section className="bg-white shadow-md rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-700">
                  Mechanism of Action
                </h2>
                <p className="text-sm text-gray-400">
                  Drug-wise MOA (optional)
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setMechanismOfAction([
                    ...mechanismOfAction,
                    { drug: "", moa: "" },
                  ])
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
              >
                + Add
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {mechanismOfAction.map((m, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center"
                >
                  <input
                    value={m.drug}
                    onChange={(e) =>
                      updateArrayObj(
                        setMechanismOfAction,
                        mechanismOfAction,
                        i,
                        "drug",
                        e.target.value
                      )
                    }
                    placeholder="Drug name"
                    className="md:col-span-2 rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <input
                    value={m.moa}
                    onChange={(e) =>
                      updateArrayObj(
                        setMechanismOfAction,
                        mechanismOfAction,
                        i,
                        "moa",
                        e.target.value
                      )
                    }
                    placeholder="Mechanism of action"
                    className="rounded-lg border border-gray-200 px-3 py-2"
                  />
                  <div className="flex gap-2 md:col-span-2 justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        removeArrayObj(
                          setMechanismOfAction,
                          mechanismOfAction,
                          i
                        )
                      }
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Indications & Contraindications */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-md rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Indications
                  </h3>
                  <p className="text-sm text-gray-400">
                    Conditions for which product is used
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIndications([...indications, ""])}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-600 text-white"
                >
                  + Add
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {indications.map((it, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      value={it}
                      onChange={(e) =>
                        updateStringArray(
                          setIndications,
                          indications,
                          i,
                          e.target.value
                        )
                      }
                      placeholder="Indication"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeStringArray(setIndications, indications, i)
                      }
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-700"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Contraindications
                  </h3>
                  <p className="text-sm text-gray-400">
                    Any contraindicated conditions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setContraindications([...contraindications, ""])
                  }
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-600 text-white"
                >
                  + Add
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {contraindications.map((it, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <input
                      value={it}
                      onChange={(e) =>
                        updateStringArray(
                          setContraindications,
                          contraindications,
                          i,
                          e.target.value
                        )
                      }
                      placeholder="Contraindication"
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeStringArray(
                          setContraindications,
                          contraindications,
                          i
                        )
                      }
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-700"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pack / MRP / Storage / Category */}
          <section className="bg-white shadow-md rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="packSize"
                value={form.packSize}
                onChange={handleFormChange}
                placeholder="Pack Size (e.g. 10 tablets)"
                className="rounded-lg border border-gray-200 px-4 py-3"
              />
              <input
                name="mrp"
                type="number"
                value={form.mrp}
                onChange={handleFormChange}
                placeholder="MRP"
                className="rounded-lg border border-gray-200 px-4 py-3"
                min="0"
              />
              <input
                name="storage"
                value={form.storage}
                onChange={handleFormChange}
                placeholder="Storage instructions"
                className="rounded-lg border border-gray-200 px-4 py-3"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <select
                name="category"
                value={form.category}
                onChange={handleFormChange}
                className="rounded-lg border border-gray-200 px-4 py-3"
                required
              >
                <option value="">Select Category *</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-3">
                <input
                  id="presc"
                  name="prescriptionRequired"
                  type="checkbox"
                  checked={form.prescriptionRequired}
                  onChange={handleFormChange}
                  className="h-5 w-5"
                />
                <label htmlFor="presc" className="text-sm text-gray-600">
                  Prescription Required
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="featured"
                  name="isFeatured"
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={handleFormChange}
                  className="h-5 w-5"
                />
                <label htmlFor="featured" className="text-sm text-gray-600">
                  Featured Product
                </label>
              </div>
            </div>

            <div className="mt-4">
              <input
                name="color"
                value={form.color}
                onChange={handleFormChange}
                placeholder="Color (optional)"
                className="rounded-lg border border-gray-200 px-4 py-3"
              />
            </div>
          </section>

          {/* Image Upload Card */}
          <section className="bg-white shadow-md rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-gray-700">
              Product Image
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              Upload a product image (optional)
            </p>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <input
                type="file"
                accept="image/*"
                name="productImage"
                onChange={handleImage}
                className="text-sm"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-36 h-36 object-cover rounded-lg shadow-sm"
                />
              ) : (
                <div className="w-36 h-36 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300 border border-dashed">
                  No Image
                </div>
              )}
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
