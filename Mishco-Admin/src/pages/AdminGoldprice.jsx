"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../components/Variable";
import { toast } from "react-hot-toast";
import { DollarSign } from "lucide-react";

const CARAT_RATES = [
  { carat: 24, multiplier: 1 },
  { carat: 18, multiplier: 0.76 },
  { carat: 14, multiplier: 0.595 },
  { carat: 9, multiplier: 0.39 },
];

const AdminGoldPrice = () => {
  const [basePrice, setBasePrice] = useState(""); // 24K price input
  const [goldPrices, setGoldPrices] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");

  // Fetch all gold prices from backend
  const fetchGoldPrices = async () => {
    try {
      const res = await axios.get(`${API_URL}/gold-price`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success && res.data.goldPrices) {
        const gold24 = res.data.goldPrices.find((g) => g.baseCarat === 24);
        const price24 = gold24 ? gold24.pricePerGram : 0;
        setBasePrice(price24);

        const prices = CARAT_RATES.map((c) => ({
          carat: c.carat,
          price: (price24 * c.multiplier).toFixed(2),
        }));
        setGoldPrices(prices);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch gold prices");
    }
  };

  useEffect(() => {
    fetchGoldPrices();
  }, []);

  // Update 24K price → backend + recalc
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!basePrice) return;
    setLoading(true);

    try {
      // Check if 24K exists
      const resAll = await axios.get(`${API_URL}/gold-price`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const exists = resAll.data.goldPrices.some((g) => g.baseCarat === 24);

      if (exists) {
        // Update 24K
        await axios.put(
          `${API_URL}/gold-price/update/24`,
          { pricePerGram: Number(basePrice) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Create 24K
        await axios.post(
          `${API_URL}/gold-price/create`,
          { baseCarat: 24, pricePerGram: Number(basePrice) },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Auto-update 18K, 14K, 9K in frontend (optional: save them in DB if you want)
      toast.success("✅ 24K Gold Price updated!");
      fetchGoldPrices();
    } catch (err) {
      console.error(err);
      toast.error("Error updating price");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Add/Update 24K */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-yellow-100 p-3 rounded-full">
            <DollarSign className="text-yellow-600 w-6 h-6" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Set 24K Gold Price</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-5 focus:ring-2 focus:ring-yellow-400 outline-none"
            placeholder="Enter 24K price"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full font-semibold"
          >
            {loading ? "Saving..." : "Save Price"}
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl rounded-xl p-4 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Gold Prices by Carat</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Carat</th>
                <th className="border px-4 py-2">Price per gram (INR)</th>
              </tr>
            </thead>
            <tbody>
              {goldPrices.map((g) => (
                <tr key={g.carat} className="border-b">
                  <td className="border px-4 py-2">{g.carat}K</td>
                  <td className="border px-4 py-2">{g.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGoldPrice;
