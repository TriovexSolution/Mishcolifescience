// src/Admin/pages/ProductAdmin.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiEdit, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { API_URL } from "../components/Variable";

/* -------------------- CONSTANTS -------------------- */
const CARAT_PURITY_MAP = {
  24: 1.0,
  22: 0.916,
  18: 0.75,
  14: 0.595,
  9: 0.39,
};

const emptyForm = {
  name: "",
  description: "",
  weightInGrams: "",
  mt_id: "",
  sc_id: "",
  productColors: [{ color_id: "", images: [], existingImages: [] }],
  productCarats: [
    {
      carat_id: "",
      weight: "",
      makingCharge: "",
      stonePrice: "",
      prices: [
        {
          currency_id: "",
          price: "",
          stoneCharge: "",
          labourCharge: "",
          autoCalculated: true,
          priceBreakdown: null,
        },
      ],
      dynamicPrice: undefined,
      priceBreakdown: undefined,
    },
  ],
  productSizes: [{ s_id: "" }],
};

/* -------------------- UTIL HELPERS -------------------- */
function extractIdFrontend(value) {
  if (!value) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "object") {
    if (value.s_id) return extractIdFrontend(value.s_id);
    if (value._id) return extractIdFrontend(value._id);
    if (value.size_id) return extractIdFrontend(value.size_id);
    if (value.$oid) return extractIdFrontend(value.$oid);
    if (typeof value.toString === "function") {
      const s = value.toString();
      if (s && s !== "[object Object]") return s;
    }
  }
  return "";
}

function normalizeNumber(v) {
  if (v == null || v === "") return 0;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const n = Number(v);
    return isNaN(n) ? 0 : n;
  }
  if (typeof v === "object") {
    if (v.$numberDecimal) return Number(v.$numberDecimal) || 0;
    if (typeof v.toString === "function") {
      const s = v.toString();
      const n = Number(s);
      if (!isNaN(n)) return n;
    }
    return 0;
  }
  return 0;
}

function normalizeCurrencyId(c) {
  if (!c) return "";
  if (typeof c === "string") return c;
  if (typeof c === "object") return c._id || "";
  return "";
}

function normalizeImageObj(img) {
  if (!img) return "";
  if (typeof img === "string") return img;
  if (typeof img === "object") {
    if (img.url) return img.url;
    if (img.urls && img.urls.length) return img.urls[0];
    if (img._doc && (img._doc.url || img._doc.urls)) {
      return img._doc.url || img._doc.urls?.[0] || "";
    }
  }
  return "";
}

/* -------------------- PRICE HELPERS -------------------- */
function getPurityFactor(caratValue) {
  const c = Number(caratValue);
  if (CARAT_PURITY_MAP[c]) return CARAT_PURITY_MAP[c];
  if (c > 0 && c <= 24) return c / 24;
  return 1;
}

/* -------------------- MAIN COMPONENT -------------------- */
export default function ProductAdmin() {
  /* -------------------- STATE -------------------- */
  const [products, setProducts] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [carats, setCarats] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [goldRates, setGoldRates] = useState({});
  const [loading, setLoading] = useState(true);

  // Debounce for carat selection save
  const caratSelectTimer = useRef(null);

  useEffect(() => {
    fetchAll();
    fetchGoldRates();
    return () => {
      if (caratSelectTimer.current) clearTimeout(caratSelectTimer.current);
    };
  }, []);

  /* -------------------- FETCH ALL DATA -------------------- */
  async function fetchAll() {
    setLoading(true);
    await Promise.allSettled([
      fetchProducts(),
      fetchMetalTypes(),
      fetchSubcategories(),
      fetchColors(),
      fetchSizes(),
      fetchCurrencies(),
    ]);
    setLoading(false);
  }

  /* ------------------ FETCH GOLD RATES ------------------ */
  const fetchGoldRates = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/gold-rates`);
      const data = res.data || {};
      const ratesObj = {};
      if (Array.isArray(data.goldRates)) {
        data.goldRates.forEach((r) => {
          ratesObj[r.carat] = r.pricePerGram;
          ratesObj[`p_${r.carat}`] = r.purityFactor ?? null;
        });
      }
      ratesObj.base24k = data.baseRate?.pricePerGram ?? ratesObj[24] ?? 0;
      if (!ratesObj.base24k && data.baseRate?.pricePerGram) {
        ratesObj.base24k = data.baseRate.pricePerGram;
      }
      setGoldRates(ratesObj);
    } catch (err) {
      console.error("Failed fetching gold rates:", err);
      try {
        const fallback = await axios.get(`${API_URL}/product/gold-price`);
        const p24 = (fallback.data?.goldPrices || []).find(
          (p) => p.baseCarat == 24
        );
        if (p24?.pricePerGram) {
          setGoldRates({ base24k: p24.pricePerGram, 24: p24.pricePerGram });
        }
      } catch (e) {
        console.error("Fallback gold price failed:", e);
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/get-products`);
      const raw = res.data || [];

      console.log("Raw products from API:", raw);

      const toId = (v) => {
        if (v?.$oid) return v.$oid;
        if (v?._id?.$oid) return v._id.$oid;
        if (v?._id) return v._id;
        return v ? String(v) : "";
      };

      // Get base 24k rate (fallback to 7500 if not available)
      const base24k = goldRates.base24k > 0 ? goldRates.base24k : 7500;

      const data = raw.map((prod) => {
        const _id = toId(prod._id);
        const weight = Number(prod.weightInGrams) || 0;

        const p = {
          _id,
          name: prod.name || "",
          description: prod.description || "",
          weightInGrams: weight,
          mt_id: toId(prod.mt_id),
          sc_id: toId(prod.sc_id),
          metalType: { name: prod.metalTypeName || "—" },
          subcategory: { name: prod.subcategoryName || "—" },
          images: (prod.images || []).map((img) => ({
            url: img.url || "",
            pcolor_id: toId(img.pcolor_id),
          })),
          sizes: (prod.sizes || []).map((s) => ({
            s_id: toId(s.s_id || s),
            name: s.name || "",
          })),
          // CALCULATE PRICE FOR EACH CARAT
          carats: (prod.caratValues || [24]).map((value, i) => {
            const caratValue = Number(value) || 24;
            const purity = getPurityFactor(caratValue);
            const goldValue = weight * base24k * purity;
            const makingCharge = 0; // You can store per-carat later
            const stonePrice = 0;
            const totalExclGST = goldValue + makingCharge + stonePrice;
            const gst = totalExclGST * 0.03;
            const total = totalExclGST + gst;

            return {
              _id: `${_id}-carat-${i}`,
              carat_id: null,
              carat: { value: caratValue },
              weight,
              makingCharge,
              stonePrice,
              goldValue: Math.round(goldValue * 100) / 100,
              totalExclGST: Math.round(totalExclGST * 100) / 100,
              gst: Math.round(gst * 100) / 100,
              total: Math.round(total * 100) / 100,
              prices: [],
            };
          }),
          colors: (prod.images || [])
            .filter((img) => img.pcolor_id)
            .map((img, i) => ({
              _id: toId(img.pcolor_id),
              color_id: toId(img.pcolor_id),
              name: `Color ${i + 1}`,
              images: [img.url],
            })),
        };

        return p;
      });

      setProducts(data);
    } catch (err) {
      console.error("Fetch Products Error:", err);
      setError("Failed to fetch products");
    }
  };

  const fetchMetalTypes = async () => {
    try {
      const res = await axios.get(`${API_URL}/metaltype/metal-types`);
      setMetalTypes(res.data || []);
    } catch (err) {
      console.error("Fetch Metal Types Error:", err);
      setError("Failed to fetch metal types");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/subcategory/get-subcategories`);
      const normalized = (res.data || [])
        .map((sc) => {
          const id = sc._id || sc.sc_id || (sc.sc_id && sc.sc_id._id) || null;
          const name =
            sc.name || sc.sc_name || (sc.sc_id && sc.sc_id.name) || "";
          return { _id: id ? String(id) : null, name };
        })
        .filter((s) => s._id);
      setSubcategories(normalized);
    } catch (err) {
      console.error("Fetch Subcategories Error:", err);
      setError("Failed to fetch subcategories");
    }
  };

  const fetchColors = async () => {
    try {
      const res = await axios.get(`${API_URL}/color/get-colors`);
      setColors(res.data || []);
    } catch (err) {
      console.error("Fetch Colors Error:", err);
      setError("Failed to fetch colors");
    }
  };

  const fetchCarats = async (mt_id = null) => {
    if (!mt_id) {
      setCarats([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/carat/get-carats-bymetal`, {
        params: { mt_id },
      });
      setCarats(res.data || []);
    } catch (err) {
      console.error("Fetch Carats Error:", err);
      setCarats([]);
    }
  };

  const fetchSizes = async () => {
    try {
      const res = await axios.get(`${API_URL}/size/get-sizes`);
      setSizes(res.data || []);
    } catch (err) {
      console.error("Fetch Sizes Error:", err);
      setError("Failed to fetch sizes");
    }
  };

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get(`${API_URL}/currency/get-currency`);
      setCurrencies(res.data || []);
    } catch (err) {
      console.error("Fetch Currencies Error:", err);
      setError("Failed to fetch currencies");
    }
  };

  /* ------------------ PERSIST CARAT SELECTION ------------------ */
  const persistSelectedCarat = async (carat_id, caratIndex) => {
    if (!carat_id || !form.mt_id) return;

    try {
      await axios.post(`${API_URL}/product/select-carat`, {
        product_id: editId || null,
        carat_id,
        carat_index: caratIndex,
        mt_id: form.mt_id,
      });
    } catch (err) {
      console.warn("Failed to persist carat selection:", err);
    }
  };

  /* ------------------ PRICE CALCULATION ------------------ */
  const calculatePrice = (caratId, currencyId, overrides = {}) => {
    const caratObj = carats.find((c) => String(c._id) === String(caratId));
    const metalType = metalTypes.find(
      (m) => String(m._id) === String(form.mt_id)
    );
    const currency = currencies.find(
      (c) => String(c._id) === String(currencyId)
    );
    const baseCurrency = currencies.find((c) => c.code === "INR") ||
      currencies[0] || { conversionRateToINR: 1 };

    const weight =
      Number(overrides.weight ?? caratObj?.weight ?? form.weightInGrams) || 0;
    const base24k =
      goldRates.base24k > 0
        ? goldRates.base24k
        : Number(metalType?.baseRatePerGram || 0);
    const caratValue =
      Number(overrides.caratValue ?? caratObj?.value ?? 24) || 24;
    const purityFactor = getPurityFactor(caratValue);
    const makingCharge =
      Number(overrides.makingCharge ?? caratObj?.makingCharge ?? 0) || 0;
    const stonePrice =
      Number(overrides.stonePrice ?? caratObj?.stonePrice ?? 0) || 0;
    const labourCharge = Number(overrides.labourCharge ?? 0) || 0;

    const goldValueINR = weight * base24k * purityFactor;
    const totalINR = goldValueINR + makingCharge + stonePrice + labourCharge;
    const conversionFactor =
      Number(currency?.conversionRateToINR || 1) /
        Number(baseCurrency.conversionRateToINR || 1) || 1;
    const converted = totalINR * conversionFactor;

    const rounded = (n) => Math.round(Number(n || 0) * 100) / 100;

    return {
      price: rounded(converted),
      stoneCharge: rounded(stonePrice * conversionFactor),
      labourCharge: rounded(labourCharge * conversionFactor),
      breakdown: {
        caratValue,
        purityFactor,
        purityPercentage: (purityFactor * 100).toFixed(1),
        weight,
        goldRate24k: base24k,
        goldValueINR: rounded(goldValueINR),
        makingChargeINR: rounded(makingCharge),
        stonePriceINR: rounded(stonePrice),
        labourChargeINR: rounded(labourCharge),
        totalINR: rounded(totalINR),
        totalConverted: rounded(converted),
        currency: currency?.code || baseCurrency.code || "INR",
      },
    };
  };

  /* ------------------ FORM HANDLERS ------------------ */
  const handleProductChange = (e) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setForm((prev) => {
      const next = { ...prev, [name]: newValue };

      if (name === "mt_id") {
        next.productCarats = [
          {
            carat_id: "",
            weight: "",
            makingCharge: "",
            stonePrice: "",
            prices: [
              {
                currency_id: "",
                price: "",
                stoneCharge: "",
                labourCharge: "",
                autoCalculated: true,
                priceBreakdown: null,
              },
            ],
            dynamicPrice: undefined,
            priceBreakdown: undefined,
          },
        ];
        fetchCarats(newValue);
      }

      if (name === "weightInGrams" || name === "mt_id") {
        next.productCarats = next.productCarats.map((pc) => {
          const prices = pc.prices.map((p) => {
            if (p.autoCalculated) {
              const calc = calculatePrice(pc.carat_id, p.currency_id, {
                weight: newValue,
              });
              return {
                ...p,
                price: calc.price,
                stoneCharge: calc.stoneCharge,
                labourCharge: calc.labourCharge,
                priceBreakdown: calc.breakdown,
              };
            }
            return p;
          });
          const dynamic = prices[0]?.autoCalculated
            ? calculatePrice(pc.carat_id, prices[0].currency_id, {
                weight: newValue,
              })
            : null;
          return {
            ...pc,
            weight: pc.weight || newValue,
            prices,
            dynamicPrice: dynamic?.price ?? pc.dynamicPrice,
            priceBreakdown: dynamic?.breakdown ?? pc.priceBreakdown,
          };
        });
      }

      return next;
    });
  };

  const handleColorChange = (index, field, value) => {
    setForm((prev) => {
      const pc = [...prev.productColors];
      const color = { ...pc[index] };
      if (field === "color_id") color.color_id = value;
      if (field === "images") color.images = value;
      pc[index] = color;
      return { ...prev, productColors: pc };
    });
  };

  const addColor = () =>
    setForm((p) => ({
      ...p,
      productColors: [
        ...p.productColors,
        { color_id: "", images: [], existingImages: [] },
      ],
    }));

  const removeColor = (i) =>
    setForm((p) => ({
      ...p,
      productColors: p.productColors.filter((_, idx) => idx !== i),
    }));

  const handleCaratChange = (index, field, value) => {
    setForm((prev) => {
      const pcs = [...prev.productCarats];
      const pc = { ...pcs[index] };

      if (field === "carat_id") {
        pc.carat_id = value;

        // SAVE SELECTION TO DB
        if (caratSelectTimer.current) clearTimeout(caratSelectTimer.current);
        caratSelectTimer.current = setTimeout(() => {
          persistSelectedCarat(value, index);
        }, 400);

        pc.prices = pc.prices.map((p) => {
          if (p.autoCalculated) {
            const calc = calculatePrice(value, p.currency_id, {
              weight: pc.weight || prev.weightInGrams,
            });
            return {
              ...p,
              price: calc.price,
              stoneCharge: calc.stoneCharge,
              labourCharge: calc.labourCharge,
              priceBreakdown: calc.breakdown,
            };
          }
          return p;
        });
      } else if (["weight", "makingCharge", "stonePrice"].includes(field)) {
        pc[field] = value;
        pc.prices = pc.prices.map((p) => {
          if (p.autoCalculated) {
            const calc = calculatePrice(pc.carat_id, p.currency_id, {
              weight: pc.weight || prev.weightInGrams,
              makingCharge: pc.makingCharge,
              stonePrice: pc.stonePrice,
            });
            return {
              ...p,
              price: calc.price,
              stoneCharge: calc.stoneCharge,
              labourCharge: calc.labourCharge,
              priceBreakdown: calc.breakdown,
            };
          }
          return p;
        });
      }

      const first = pc.prices[0];
      if (first?.autoCalculated) {
        const dynamic = calculatePrice(pc.carat_id, first.currency_id, {
          weight: pc.weight || prev.weightInGrams,
          makingCharge: pc.makingCharge,
          stonePrice: pc.stonePrice,
        });
        pc.dynamicPrice = dynamic.price;
        pc.priceBreakdown = dynamic.breakdown;
      }

      pcs[index] = pc;
      return { ...prev, productCarats: pcs };
    });
  };

  const handlePriceChange = (caratIndex, priceIndex, field, value) => {
    setForm((prev) => {
      const pcs = [...prev.productCarats];
      const pc = { ...pcs[caratIndex] };
      const prices = [...pc.prices];
      const price = { ...prices[priceIndex] };

      if (field === "currency_id") {
        price.currency_id = value;
        if (price.autoCalculated) {
          const calc = calculatePrice(pc.carat_id, value, {
            weight: pc.weight || prev.weightInGrams,
            makingCharge: pc.makingCharge,
            stonePrice: pc.stonePrice,
          });
          Object.assign(price, {
            price: calc.price,
            stoneCharge: calc.stoneCharge,
            labourCharge: calc.labourCharge,
            priceBreakdown: calc.breakdown,
          });
        }
      } else if (field === "autoCalculated") {
        price.autoCalculated = !!value;
        if (value) {
          const calc = calculatePrice(pc.carat_id, price.currency_id, {
            weight: pc.weight || prev.weightInGrams,
            makingCharge: pc.makingCharge,
            stonePrice: pc.stonePrice,
          });
          Object.assign(price, {
            price: calc.price,
            stoneCharge: calc.stoneCharge,
            labourCharge: calc.labourCharge,
            priceBreakdown: calc.breakdown,
          });
        }
      } else {
        price[field] = value;
        if (["price", "stoneCharge", "labourCharge"].includes(field)) {
          price.autoCalculated = false;
        }
      }

      prices[priceIndex] = price;
      pc.prices = prices;

      const first = prices[0];
      if (first?.autoCalculated) {
        const dynamic = calculatePrice(pc.carat_id, first.currency_id, {
          weight: pc.weight || prev.weightInGrams,
          makingCharge: pc.makingCharge,
          stonePrice: pc.stonePrice,
        });
        pc.dynamicPrice = dynamic.price;
        pc.priceBreakdown = dynamic.breakdown;
      }

      pcs[caratIndex] = pc;
      return { ...prev, productCarats: pcs };
    });
  };

  const addCarat = () =>
    setForm((p) => ({
      ...p,
      productCarats: [
        ...p.productCarats,
        {
          carat_id: "",
          weight: "",
          makingCharge: "",
          stonePrice: "",
          prices: [
            {
              currency_id: "",
              price: "",
              stoneCharge: "",
              labourCharge: "",
              autoCalculated: true,
              priceBreakdown: null,
            },
          ],
          dynamicPrice: undefined,
          priceBreakdown: undefined,
        },
      ],
    }));

  const removeCarat = (i) =>
    setForm((p) => ({
      ...p,
      productCarats: p.productCarats.filter((_, idx) => idx !== i),
    }));

  const addPrice = (caratIndex) =>
    setForm((prev) => {
      const pcs = [...prev.productCarats];
      pcs[caratIndex].prices.push({
        currency_id: "",
        price: "",
        stoneCharge: "",
        labourCharge: "",
        autoCalculated: true,
        priceBreakdown: null,
      });
      return { ...prev, productCarats: pcs };
    });

  const removePrice = (caratIndex, priceIndex) =>
    setForm((p) => {
      const pcs = [...p.productCarats];
      pcs[caratIndex].prices = pcs[caratIndex].prices.filter(
        (_, i) => i !== priceIndex
      );
      return { ...p, productCarats: pcs };
    });

  const handleSizeChange = (index, value) => {
    setForm((p) => {
      const ps = [...p.productSizes];
      ps[index] = { s_id: value };
      return { ...p, productSizes: ps };
    });
  };

  const addSize = () =>
    setForm((p) => ({
      ...p,
      productSizes: [...p.productSizes, { s_id: "" }],
    }));

  const removeSize = (i) =>
    setForm((p) => ({
      ...p,
      productSizes: p.productSizes.filter((_, idx) => idx !== i),
    }));

  /* ------------------ SUBMIT ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.mt_id || !form.sc_id) {
      setError("Please fill Name, Metal Type and Subcategory.");
      return;
    }

    try {
      const formData = new FormData();

      // === BASIC INFO ===
      formData.append("name", form.name);
      formData.append("description", form.description || "");
      formData.append("weightInGrams", String(form.weightInGrams));

      // === SEND METAL TYPE & SUBCATEGORY WITH NAMES ===
      const selectedMetal = metalTypes.find(
        (m) => String(m._id) === String(form.mt_id)
      );
      const selectedSubcat = subcategories.find(
        (s) => String(s._id) === String(form.sc_id)
      );

      formData.append("mt_id", form.mt_id);
      formData.append("metalTypeName", selectedMetal?.name || "");

      formData.append("sc_id", form.sc_id);
      formData.append("subcategoryName", selectedSubcat?.name || "");

      // === COLORS ===
      const colorsMeta = form.productColors.map((c) => ({
        color_id: c.color_id,
      }));
      formData.append("productColors", JSON.stringify(colorsMeta));
      form.productColors.forEach((c, idx) => {
        c.images.forEach((file) => formData.append(`images_${idx}`, file));
      });

      // === CARATS – SEND VALUE & NAME ===
      const caratsMeta = form.productCarats.map((pc) => {
        const caratObj =
          carats.find((c) => String(c._id) === String(pc.carat_id)) || {};
        const prices = pc.prices.map((p) => {
          const computed = p.autoCalculated
            ? calculatePrice(pc.carat_id, p.currency_id, {
                weight: pc.weight || form.weightInGrams,
                makingCharge: pc.makingCharge,
                stonePrice: pc.stonePrice,
              })
            : null;
          return {
            currency_id: p.currency_id,
            price: p.price || computed?.price || 0,
            stoneCharge: p.stoneCharge || computed?.stoneCharge || 0,
            labourCharge: p.labourCharge || computed?.labourCharge || 0,
            autoCalculated: !!p.autoCalculated,
            priceBreakdown: p.priceBreakdown || computed?.breakdown || null,
          };
        });

        return {
          carat_id: pc.carat_id,
          caratValue: Number(caratObj.value) || 24, // <--- SEND VALUE
          caratName: `${caratObj.value} KT`, // <--- SEND NAME
          weight: pc.weight || form.weightInGrams,
          makingCharge: pc.makingCharge || 0,
          stonePrice: pc.stonePrice || 0,
          prices,
        };
      });
      formData.append("productCarats", JSON.stringify(caratsMeta));

      // === SIZES ===
      const sizesToSend = form.productSizes
        .map((s) => {
          const sizeObj =
            sizes.find((sz) => String(sz._id) === String(s.s_id)) || {};
          return {
            s_id: extractIdFrontend(s.s_id),
            name: sizeObj.name || "Unknown",
          };
        })
        .filter((s) => s.s_id);
      formData.append("productSizes", JSON.stringify(sizesToSend));

      const url = editId
        ? `${API_URL}/product/update-product/${editId}`
        : `${API_URL}/product/create-product`;
      const method = editId ? axios.put : axios.post;
      await method(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchProducts();
      setForm(emptyForm);
      setEditId(null);
    } catch (err) {
      const serverErr =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.response?.data;
      setError(
        typeof serverErr === "string" ? serverErr : JSON.stringify(serverErr)
      );
    }
  };

  /* ------------------ EDIT / DELETE ------------------ */
  const handleEdit = (product) => {
    const nf = {
      name: product.name || "",
      description: product.description || "",
      weightInGrams: product.weightInGrams ?? "",
      mt_id: product.mt_id?._id || product.mt_id || "",
      sc_id: product.sc_id?._id || product.sc_id || "",
      productColors: (product.colors || []).map((c) => ({
        color_id: c.color_id || c._id || "",
        images: [],
        existingImages: (c.images || []).map(normalizeImageObj).filter(Boolean),
      })),
      productCarats: (product.carats || []).map((c) => ({
        carat_id: c.carat_id || c._id || "",
        weight: c.weight || "",
        makingCharge: c.makingCharge || "",
        stonePrice: c.stonePrice || "",
        prices: (c.prices || []).map((p) => ({
          currency_id: normalizeCurrencyId(p.currency_id),
          price: normalizeNumber(p.price),
          stoneCharge: normalizeNumber(p.stoneCharge),
          labourCharge: normalizeNumber(p.labourCharge),
          autoCalculated: !!p.autoCalculated,
          priceBreakdown: p.priceBreakdown || null,
        })),
        dynamicPrice: c.dynamicPrice,
        priceBreakdown: c.priceBreakdown,
      })),
      productSizes: (product.sizes || []).map((s) => ({
        s_id: extractIdFrontend(s.s_id ?? s._id ?? s.size_id ?? s),
      })),
    };
    setForm(nf);
    setEditId(product._id);
    if (nf.mt_id) fetchCarats(nf.mt_id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/product/delete-product/${id}`);
      await fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Admin</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        {/* === BASIC INFO === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleProductChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleProductChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Weight (grams)</label>
            <input
              name="weightInGrams"
              type="number"
              value={form.weightInGrams}
              onChange={handleProductChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Metal Type</label>
            <select
              name="mt_id"
              value={form.mt_id}
              onChange={handleProductChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Metal Type</option>
              {metalTypes.map((m) => (
                <option key={m._id} value={m._id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Subcategory</label>
            <select
              name="sc_id"
              value={form.sc_id}
              onChange={handleProductChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Subcategory</option>
              {subcategories.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* === COLORS === */}
        <div>
          <h3 className="font-semibold">Colors</h3>
          {(form.productColors || []).map((c, idx) => (
            <div key={idx} className="flex gap-2 items-center mt-2">
              <select
                value={c.color_id}
                onChange={(e) =>
                  handleColorChange(idx, "color_id", e.target.value)
                }
                className="border p-2 rounded"
              >
                <option value="">Select Color</option>
                {colors.map((col) => (
                  <option key={col._id} value={col._id}>
                    {col.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  handleColorChange(idx, "images", Array.from(e.target.files))
                }
                className="border p-2 rounded"
              />
              <div className="flex gap-1">
                {c.images?.map((file, i) => {
                  const url = URL.createObjectURL(file);
                  return (
                    <div key={`new-${i}`} className="relative">
                      <img
                        src={url}
                        className="w-12 h-12 object-cover"
                        alt=""
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setForm((prev) => {
                            const copy = [...prev.productColors];
                            copy[idx].images = copy[idx].images.filter(
                              (_, j) => j !== i
                            );
                            return { ...prev, productColors: copy };
                          });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
                {c.existingImages?.map((img, i) => (
                  <div key={`old-${i}`} className="relative">
                    <img
                      src={`${API_URL}/${img}`}
                      className="w-12 h-12 object-cover"
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setForm((prev) => {
                          const copy = [...prev.productColors];
                          copy[idx].existingImages = copy[
                            idx
                          ].existingImages.filter((_, j) => j !== i);
                          return { ...prev, productColors: copy };
                        });
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => removeColor(idx)}
                className="text-red-500"
              >
                <FiMinus />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addColor}
            className="mt-2 text-blue-600 inline-flex items-center gap-1"
          >
            <FiPlus /> Add Color
          </button>
        </div>

        {/* === CARATS === */}
        <div>
          <h3 className="font-semibold">Carats</h3>
          {(form.productCarats || []).map((pc, idx) => (
            <div key={idx} className="border p-3 rounded mt-2">
              <div className="flex gap-2 items-center">
                <select
                  value={pc.carat_id}
                  onChange={(e) =>
                    handleCaratChange(idx, "carat_id", e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option value="">Select Carat</option>
                  {carats.map((cr) => (
                    <option key={cr._id} value={cr._id}>
                      {cr.value} KT
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={pc.weight || form.weightInGrams}
                  placeholder="Weight (g)"
                  onChange={(e) =>
                    handleCaratChange(idx, "weight", e.target.value)
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  value={pc.makingCharge || ""}
                  placeholder="Making Charge (INR)"
                  onChange={(e) =>
                    handleCaratChange(idx, "makingCharge", e.target.value)
                  }
                  className="border p-2 rounded"
                />
                <input
                  type="number"
                  value={pc.stonePrice || ""}
                  placeholder="Stone Price (INR)"
                  onChange={(e) =>
                    handleCaratChange(idx, "stonePrice", e.target.value)
                  }
                  className="border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeCarat(idx)}
                  className="text-red-500"
                >
                  <FiMinus />
                </button>
              </div>

              <div className="mt-2">
                <h4 className="text-sm">Prices</h4>
                {(pc.prices || []).map((pr, pIdx) => (
                  <div key={pIdx} className="flex gap-2 items-center mt-2">
                    <select
                      value={pr.currency_id}
                      onChange={(e) =>
                        handlePriceChange(
                          idx,
                          pIdx,
                          "currency_id",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded"
                    >
                      <option value="">Currency</option>
                      {currencies.map((cu) => (
                        <option key={cu._id} value={cu._id}>
                          {cu.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={pr.price}
                      onChange={(e) =>
                        handlePriceChange(idx, pIdx, "price", e.target.value)
                      }
                      placeholder="Price"
                      className="border p-2 rounded"
                    />
                    <input
                      type="number"
                      value={pr.stoneCharge}
                      onChange={(e) =>
                        handlePriceChange(
                          idx,
                          pIdx,
                          "stoneCharge",
                          e.target.value
                        )
                      }
                      placeholder="Stone"
                      className="border p-2 rounded"
                    />
                    <input
                      type="number"
                      value={pr.labourCharge}
                      onChange={(e) =>
                        handlePriceChange(
                          idx,
                          pIdx,
                          "labourCharge",
                          e.target.value
                        )
                      }
                      placeholder="Labour"
                      className="border p-2 rounded"
                    />
                    <label className="flex items-center gap-1 text-xs">
                      <input
                        type="checkbox"
                        checked={!!pr.autoCalculated}
                        onChange={(e) =>
                          handlePriceChange(
                            idx,
                            pIdx,
                            "autoCalculated",
                            e.target.checked
                          )
                        }
                      />
                      Auto
                    </label>
                    <button
                      type="button"
                      onClick={() => removePrice(idx, pIdx)}
                      className="text-red-500"
                    >
                      <FiMinus />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addPrice(idx)}
                  className="mt-2 text-blue-600 inline-flex items-center gap-1"
                >
                  <FiPlus /> Add Price
                </button>
              </div>

              <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                <strong>Dynamic:</strong>{" "}
                {pc.dynamicPrice != null
                  ? `${pc.dynamicPrice} (${pc.priceBreakdown?.currency || ""})`
                  : "—"}
                {pc.priceBreakdown && (
                  <div className="text-xs mt-1">
                    {pc.priceBreakdown.weight}g •{" "}
                    {pc.priceBreakdown.purityPercentage}% • ₹
                    {pc.priceBreakdown.goldValueINR} (INR)
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addCarat}
            className="mt-2 text-blue-600 inline-flex items-center gap-1"
          >
            <FiPlus /> Add Carat
          </button>
        </div>

        {/* === SIZES === */}
        <div>
          <h3 className="font-semibold">Sizes</h3>
          {(form.productSizes || []).map((s, idx) => (
            <div key={idx} className="flex gap-2 items-center mt-2">
              <select className="border p-2 rounded ">
                {sizes.map((size) => (
                  <option key={size._id} value={size._id}>
                    {size.name} {/* 21.4 mm */}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeSize(idx)}
                className="text-red-500"
              >
                <FiMinus />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="mt-2 text-blue-600 inline-flex items-center gap-1"
          >
            <FiPlus /> Add Size
          </button>
        </div>

        {/* === SUBMIT === */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setEditId(null);
              setError("");
            }}
            className="ml-2 px-4 py-2 rounded border"
          >
            Reset
          </button>
        </div>
      </form>

      {/* === PRODUCTS TABLE === */}
      <div className="mt-12">
        <h2 className="text-lg font-bold mb-3">All Products</h2>
        {loading ? (
          <p className="text-gray-600">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left">ID</th>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Desc</th>
                  <th className="px-3 py-2 text-center">Weight</th>
                  <th className="px-3 py-2 text-left">Metal</th>
                  <th className="px-3 py-2 text-left">Subcategory</th>
                  <th className="px-3 py-2 text-left">Sizes</th>
                  <th className="px-3 py-2 text-left">Colors / Images</th>
                  <th className="px-3 py-2 text-left">Carats / Pricing</th>
                  <th className="px-3 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((p) => {
                  const renderList = (arr, key) =>
                    arr?.length ? arr.map((i) => i[key] ?? i).join(", ") : "—";
                  const renderImages = () =>
                    p.images?.length ? (
                      p.images.map((img, i) => (
                        <img
                          key={i}
                          src={`${API_URL}/${img.url}`}
                          alt=""
                          className="inline-block w-10 h-10 object-cover rounded mr-1"
                        />
                      ))
                    ) : (
                      <span className="text-gray-400">—</span>
                    );
                  const renderCarats = () => {
                    return p.carats?.length ? (
                      <div className="text-xs space-y-2">
                        {p.carats.map((c, i) => (
                          <div
                            key={i}
                            className="p-2 bg-gradient-to-r from-amber-50 to-yellow-50 rounded border border-amber-200"
                          >
                            <div className="font-bold text-amber-800">
                              {c.carat.value} KT
                            </div>
                            <div className="text-gray-700">
                              <div>
                                Weight: <strong>{c.weight}g</strong>
                              </div>
                              <div>
                                Gold Value:{" "}
                                <strong>₹{c.goldValue.toFixed(2)}</strong>
                              </div>
                              {c.makingCharge > 0 && (
                                <div>
                                  Making:{" "}
                                  <strong>₹{c.makingCharge.toFixed(2)}</strong>
                                </div>
                              )}
                              {c.stonePrice > 0 && (
                                <div>
                                  Stone:{" "}
                                  <strong>₹{c.stonePrice.toFixed(2)}</strong>
                                </div>
                              )}
                              <div className="border-t border-amber-300 mt-1 pt-1">
                                <div>
                                  GST (3%): <strong>₹{c.gst.toFixed(2)}</strong>
                                </div>
                                <div className="font-bold text-green-700 text-sm">
                                  Total: ₹{c.total.toFixed(2)} INR
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    );
                  };

                  return (
                    <tr key={p._id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border">{p._id.slice(-6)}</td>
                      <td className="px-3 py-2 border font-medium">{p.name}</td>
                      <td
                        className="px-3 py-2 border max-w-xs truncate"
                        title={p.description}
                      >
                        {p.description || "—"}
                      </td>
                      <td className="px-3 py-2 border text-center">
                        {p.weightInGrams}
                      </td>
                      <td className="px-3 py-2 border">
                        {p.metalType?.name || "—"}
                        {p.metalType?.baseRatePerGram > 0 && (
                          <span className="text-xs text-gray-500 ml-1">
                            (₹{p.metalType.baseRatePerGram}/g)
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 border">
                        {p.subcategory?.name || "—"}
                      </td>
                      <td className="px-3 py-2 border">
                        {renderList(p.sizes, "name")}
                      </td>
                      <td className="px-3 py-2 border">
                        <div className="flex flex-wrap gap-1">
                          {renderImages()}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {p.colors
                            ?.map((c) => c.name)
                            .filter(Boolean)
                            .join(", ") || "—"}
                        </div>
                      </td>
                      <td className="px-3 py-2 border">{renderCarats()}</td>
                      <td className="px-3 py-2 border text-center">
                        <button
                          onClick={() => handleEdit(p)}
                          className="text-indigo-600 hover:text-indigo-800 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
