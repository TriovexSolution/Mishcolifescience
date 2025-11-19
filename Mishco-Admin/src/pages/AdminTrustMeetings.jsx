// src/Admin/pages/AdminTrustMeetings.jsx
import React, { useEffect, useState, useMemo } from "react";
import {
  FaTrash,
  FaInfoCircle,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import axios from "axios";
import { API_URL, userToken } from "../components/Variable";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

const AdminTrustMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMeeting, setExpandedMeeting] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const userData = userToken();

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/trust/admin`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      setMeetings(data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch trust meetings");
    } finally {
      setLoading(false);
    }
  };

  const deleteMeeting = async (id) => {
    if (!window.confirm("Delete this meeting request?")) return;
    try {
      await axios.delete(`${API_URL}/trust/delete/${id}`, {
        headers: { Authorization: `Bearer ${userData?.token}` },
      });
      toast.success("Meeting deleted!");
      fetchMeetings();
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  const toggleExpand = (id) => setExpandedMeeting(expandedMeeting === id ? null : id);

  // ─── SEARCH + FILTER LOGIC ───
  const filteredMeetings = useMemo(() => {
    if (!searchTerm.trim()) return meetings;

    const lowerSearch = searchTerm.toLowerCase();
    return meetings.filter((m) => {
      return (
        m.fullName.toLowerCase().includes(lowerSearch) ||
        m.emailAddress.toLowerCase().includes(lowerSearch) ||
        m.contactNumber.includes(lowerSearch) ||
        format(new Date(m.date), "dd MMM yyyy").toLowerCase().includes(lowerSearch) ||
        m.timeSlots.some(slot => slot.includes(lowerSearch))
      );
    });
  }, [meetings, searchTerm]);

  // ─── PAGINATION ───
  const totalPages = Math.ceil(filteredMeetings.length / itemsPerPage);
  const currentMeetings = filteredMeetings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading meetings...</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Trust Meeting Requests</h1>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by Name, Email, Phone, Date, Time..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 mb-4">
        Showing {currentMeetings.length} of {filteredMeetings.length} requests
        {searchTerm && ` for "${searchTerm}"`}
      </p>

      {/* Meetings List */}
      {currentMeetings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500">No meeting requests found.</p>
        </div>
      ) : (
        <>
          {currentMeetings.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-lg shadow-md mb-6 overflow-hidden"
            >
              {/* Header */}
              <div
                className="p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(m._id)}
              >
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="font-semibold text-sm">Name</p>
                    <p className="text-gray-700 font-medium">{m.fullName}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Contact</p>
                    <p className="text-gray-700">{m.contactNumber}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-gray-700 truncate max-w-xs">{m.emailAddress}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Date</p>
                    <p className="text-gray-700 flex items-center gap-1">
                      <FaCalendarAlt className="h-3 w-3" />
                      {format(new Date(m.date), "dd MMM yyyy")}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {expandedMeeting === m._id ? (
                      <FaChevronUp className="text-gray-500" />
                    ) : (
                      <FaChevronDown className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded View */}
              {expandedMeeting === m._id && (
                <div className="p-4 bg-gray-50 space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FaClock className="text-blue-600" /> Preferred Time Slots
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {m.timeSlots.map((slot, idx) => (
                      <div
                        key={idx}
                        className="bg-white px-3 py-2 rounded-lg border text-center text-sm font-medium text-gray-700"
                      >
                        {slot}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMeeting(m._id);
                      }}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Request"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info("Contact user via email or phone");
                      }}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Contact User"
                    >
                      <FaInfoCircle className="h-5 w-5" />
                    </button> */}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Pagination */}
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

export default AdminTrustMeetings;