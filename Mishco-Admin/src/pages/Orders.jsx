import React, { useEffect, useState, useMemo } from "react";
import {
  FaTrash,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
} from "react-icons/fa";
import axios from "axios";
import { API_URL, userToken } from "../components/Variable";
import { toast } from "react-hot-toast";

// ─── Status Options ───
const statusOptions = [
  { value: 1, label: "Pending", color: "bg-blue-500" },
  { value: 2, label: "Processing", color: "bg-indigo-500" },
  { value: 3, label: "Shipped", color: "bg-purple-500" },
  { value: 4, label: "Delivered", color: "bg-green-500" },
  { value: 5, label: "Cancelled", color: "bg-red-500" },
];

// ─── Helpers ───
const normalizeImage = (url) => {
  if (!url) return "/placeholder.svg";
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_URL}/${url.replace(/^\/+/, "")}`;
};

// ─── Component ───
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState(""); // New search state

  const userData = userToken();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/order/getallorders`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      setOrders(data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${API_URL}/order/updatestatus/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Order status updated!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API_URL}/order/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      toast.success("Order deleted!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  const toggleExpand = (id) =>
    setExpandedOrder(expandedOrder === id ? null : id);

  // ─── SEARCH + FILTER LOGIC ───
  const filteredOrders = useMemo(() => {
    if (!searchTerm.trim()) return orders;

    const lowerSearch = searchTerm.toLowerCase();
    return orders.filter((order) => {
      const statusLabel =
        statusOptions.find((s) => s.value === order.status)?.label || "";
      return (
        order.orderId.toLowerCase().includes(lowerSearch) ||
        `${order.firstName} ${order.lastName}`.toLowerCase().includes(lowerSearch) ||
        order.email?.toLowerCase().includes(lowerSearch) ||
        order.phone?.toLowerCase().includes(lowerSearch) ||
        statusLabel.toLowerCase().includes(lowerSearch)
      );
    });
  }, [orders, searchTerm]);

  // ─── PAGINATION ON FILTERED DATA ───
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading orders...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ─── Header with Search ─── */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by Order ID, Name, Email, Phone, Status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* ─── Results Count ─── */}
      <p className="text-sm text-gray-600 mb-4">
        Showing {currentOrders.length} of {filteredOrders.length} orders
        {searchTerm && ` for "${searchTerm}"`}
      </p>

      {/* ─── Orders List ─── */}
      {currentOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <>
          {currentOrders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white rounded-lg shadow-md mb-6 overflow-hidden"
            >
              {/* Order Header */}
              <div
                className="p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(order.orderId)}
              >
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="font-semibold text-sm">Order ID</p>
                    <p className="text-gray-700 font-mono">{order.orderId}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Customer</p>
                    <p className="text-gray-700">
                      {order.firstName} {order.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Amount</p>
                    <p className="text-green-600 font-bold">₹{order.grandTotal}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Status</p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs text-white font-medium ${
                        statusOptions.find((s) => s.value === order.status)?.color ||
                        "bg-gray-400"
                      }`}
                    >
                      {
                        statusOptions.find((s) => s.value === order.status)?.label ||
                        "Unknown"
                      }
                    </span>
                  </div>
                  <div className="flex justify-end">
                    {expandedOrder === order.orderId ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded View */}
              {expandedOrder === order.orderId && (
                <div className="p-4 bg-gray-50 space-y-6">
                  <h3 className="font-semibold text-lg">Order Items</h3>

                  {order.orderItems?.length ? (
                    order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 border-b pb-4 mb-4 last:mb-0 last:border-0"
                      >
                        <img
                          src={normalizeImage(item.productImage)}
                          alt={item.productName}
                          className="w-16 h-16 rounded object-cover border"
                          onError={(e) => (e.target.src = "/placeholder.svg")}
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            {item.productName}
                          </h4>
                          {item.size && (
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          )}
                          {item.caratValue && (
                            <p className="text-sm text-gray-600">
                              Carat: {item.caratValue}
                            </p>
                          )}
                          {item.weightGrams && (
                            <p className="text-sm text-gray-600">
                              Weight: {item.weightGrams} g
                            </p>
                          )}
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity} × ₹{item.unitPrice} = ₹
                            {item.totalPrice}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No items found.</p>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <label className="font-medium">Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, Number(e.target.value))
                        }
                        className="border px-3 py-1.5 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                      >
                        {statusOptions.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOrder(order.orderId);
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete Order"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.info("More details coming soon");
                        }}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View Details"
                      >
                        <FaInfoCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* ─── Pagination ─── */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1.5 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminOrders;