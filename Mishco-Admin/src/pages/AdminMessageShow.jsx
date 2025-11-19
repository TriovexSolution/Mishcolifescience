import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, userToken } from "../components/Variable";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Pencil, Trash2, User, Search, Calendar } from "lucide-react";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const userData = userToken();
  const token = userData?.token;

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_URL}/contact/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.data || []);
      setLoading(false);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to load messages";
      setError(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete message
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API_URL}/contact/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Message deleted");
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Contact Messages
        </h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {filteredMessages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No messages found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent On
                  </th>
                  {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMessages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* User */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {msg.name}
                          </p>
                          <p className="text-xs text-gray-500">{msg.number}</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {msg.email}
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <p className="truncate">{msg.subject}</p>
                    </td>

                    {/* Sent On (Date & Time) */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex items-center text-xs">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {format(new Date(msg.createdAt), "dd MMM yyyy, HH:mm")}
                      </div>
                    </td>

                    {/* Status */}
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td> */}

                    {/* Actions */}
                    {/* <td className="px-6 py-4 text-center text-sm font-medium">
                      <div className="flex justify-center items-center space-x-3">
                        <button className="text-blue-600 hover:text-blue-800 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;