import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../components/Variable";

const AdminInstagramPosts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ images: [], link: "" });
  const [editPost, setEditPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all Instagram posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/instagram/get-instagram-posts`);
        setPosts(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch posts:", err.response?.data || err.message);
        setError("Failed to load posts");
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Handle form submission for adding new post
  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!newPost.images.length) {
      setError("At least one image is required");
      return;
    }
    try {
      const formData = new FormData();
      newPost.images.forEach((image) => {
        console.log("Appending image:", image.name); // Debug
        formData.append("images", image);
      });
      formData.append("link", newPost.link);

      // Debug FormData
      for (let [key, value] of formData.entries()) {
        console.log("FormData:", key, value);
      }

      const res = await axios.post(`${API_URL}/instagram/admin/instagram-posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPosts([res.data, ...posts]);
      setNewPost({ images: [], link: "" });
      setError("");
      document.getElementById("new-post-images").value = ""; // Reset file input
    } catch (err) {
      console.error("Failed to add post:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
        (err.message === "MulterError: Unexpected field" ? "Invalid file field name. Use 'images'." : "Failed to add post")
      );
    }
  };

  // Handle form submission for editing post
  const handleEditPost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (editPost.images && editPost.images.length > 0) {
        editPost.images.forEach((image) => {
          console.log("Appending edit image:", image.name); // Debug
          formData.append("images", image);
        });
      }
      formData.append("link", editPost.link);

      // Debug FormData
      for (let [key, value] of formData.entries()) {
        console.log("FormData:", key, value);
      }

      const res = await axios.put(`${API_URL}/instagram/admin/instagram-posts/${editPost._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPosts(posts.map((post) => (post._id === editPost._id ? res.data : post)));
      setEditPost(null);
      setError("");
      document.getElementById("edit-post-images").value = ""; // Reset file input
    } catch (err) {
      console.error("Failed to edit post:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
        (err.message === "MulterError: Unexpected field" ? "Invalid file field name. Use 'images'." : "Failed to edit post")
      );
    }
  };

  // Handle delete post
  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/instagram/admin/instagram-posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
      setError("");
    } catch (err) {
      console.error("Failed to delete post:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to delete post");
    }
  };

  // Handle image load error
  const handleImageError = (path) => {
    console.error(`Failed to load image: ${API_URL}/${path}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-[#47012d] mb-8">Manage Instagram Posts</h1>

      {/* Add Post Form */}
      <form onSubmit={handleAddPost} className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Images</label>
          <input
            id="new-post-images"
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            multiple
            onChange={(e) => setNewPost({ ...newPost, images: Array.from(e.target.files) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Instagram Link</label>
          <input
            type="url"
            value={newPost.link}
            onChange={(e) => setNewPost({ ...newPost, link: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="https://www.instagram.com/reel/..."
            required
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button type="submit" className="bg-[#47012d] text-white px-4 py-2 rounded hover:bg-[#5a0139]">
          Add Post
        </button>
      </form>

      {/* Edit Post Form */}
      {editPost && (
        <form onSubmit={handleEditPost} className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Images (optional)</label>
            <input
              id="edit-post-images"
              type="file"
              accept="image/jpeg,image/jpg,image/png"
              multiple
              onChange={(e) => setEditPost({ ...editPost, images: Array.from(e.target.files) })}
              className="w-full p-2 border rounded"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {editPost.imagePaths?.map((path, index) => (
                <img
                  key={index}
                  src={`${API_URL}/Uploads/${path}`}
                  alt={`Current ${index + 1}`}
                  className="w-32 h-32 object-cover rounded"
                  onError={() => handleImageError(path)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Instagram Link</label>
            <input
              type="url"
              value={editPost.link}
              onChange={(e) => setEditPost({ ...editPost, link: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="https://www.instagram.com/reel/..."
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button type="submit" className="bg-[#47012d] text-white px-4 py-2 rounded hover:bg-[#5a0139]">
            Update Post
          </button>
          <button
            type="button"
            onClick={() => setEditPost(null)}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Posts List */}
      <h2 className="text-xl font-semibold mb-4">Existing Posts</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading posts...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post._id} className="border rounded-lg p-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.imagePaths?.map((path, index) => (
                  <img
                    key={index}
                    src={`${API_URL}/Uploads/${path}`}
                    alt={`Post image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded"
                    onError={() => handleImageError(path)}
                  />
                ))}
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on Instagram
              </a>
              <div className="mt-2">
                <button
                  onClick={() => setEditPost({ ...post, images: [] })}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(post._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminInstagramPosts;