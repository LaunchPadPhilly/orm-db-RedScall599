"use client";
import { useState } from "react";
import TechnologyInput from "./TechnologyInput";

const urlRegex = /^https?:\/\/.+\..+/;

export default function ProjectForm({ onSubmit, onCancel, isOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [technologies, setTechnologies] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!technologies.length) newErrors.technologies = "At least one technology is required";
    if (imageUrl && !urlRegex.test(imageUrl)) newErrors.imageUrl = "Please enter a valid URL";
    if (projectUrl && !urlRegex.test(projectUrl)) newErrors.projectUrl = "Please enter a valid URL";
    if (githubUrl && !urlRegex.test(githubUrl)) newErrors.githubUrl = "Please enter a valid URL";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    setLoading(true);
    try {
      await onSubmit({ title, description, imageUrl, projectUrl, githubUrl, technologies });
      setTitle("");
      setDescription("");
      setImageUrl("");
      setProjectUrl("");
      setGithubUrl("");
      setTechnologies([]);
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.message || "Failed to create project." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="bg-white rounded-lg shadow-lg p-8 mb-8 animate-slideDown" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Add New Project</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Project Title *</label>
        <input
          type="text"
          className={`w-full border px-3 py-2 rounded ${errors.title ? "border-red-500" : "border-gray-300"}`}
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={loading}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Description *</label>
        <textarea
          className={`w-full border px-3 py-2 rounded ${errors.description ? "border-red-500" : "border-gray-300"}`}
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={loading}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Technologies Used *</label>
        <TechnologyInput
          technologies={technologies}
          onChange={setTechnologies}
          error={errors.technologies}
        />
        {errors.technologies && <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Image URL</label>
        <input
          type="text"
          className={`w-full border px-3 py-2 rounded ${errors.imageUrl ? "border-red-500" : "border-gray-300"}`}
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          disabled={loading}
        />
        {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Live Demo URL</label>
        <input
          type="text"
          className={`w-full border px-3 py-2 rounded ${errors.projectUrl ? "border-red-500" : "border-gray-300"}`}
          value={projectUrl}
          onChange={e => setProjectUrl(e.target.value)}
          disabled={loading}
        />
        {errors.projectUrl && <p className="text-red-500 text-sm mt-1">{errors.projectUrl}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">GitHub URL</label>
        <input
          type="text"
          className={`w-full border px-3 py-2 rounded ${errors.githubUrl ? "border-red-500" : "border-gray-300"}`}
          value={githubUrl}
          onChange={e => setGithubUrl(e.target.value)}
          disabled={loading}
        />
        {errors.githubUrl && <p className="text-red-500 text-sm mt-1">{errors.githubUrl}</p>}
      </div>
      {errors.submit && <p className="text-red-500 text-sm mb-2">{errors.submit}</p>}
      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow transition-all disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating Project..." : "Create Project"}
        </button>
        <button
          type="button"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded shadow transition-all"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}