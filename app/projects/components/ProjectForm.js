// TODO: Students will implement this component
// This is a learning exercise - students should build this form component from scratch
// The tests will guide the implementation requirements

// Component Requirements:
// 1. Create a form component that accepts { onSubmit, onCancel, isOpen } props
// 2. Manage form state for: title, description, imageUrl, projectUrl, githubUrl, technologies
// 3. Implement form validation:
//    - title: required
//    - description: required
//    - technologies: required (at least one)
//    - URLs: validate format if provided
// 4. Handle form submission and loading states
// 5. Display validation errors to user
// 6. Reset form after successful submission
// 7. Only render when isOpen is true
// 8. Include TechnologyInput component for managing technologies

// Learning Objectives:
// - React state management with useState
// - Form validation patterns
// - Conditional rendering
// - Event handling
// - Error state management
// - Component composition

// Hints:
// - Use 'use client' directive for client-side functionality
// - Import TechnologyInput from './TechnologyInput'
// - Use regex for URL validation: /^https?:\/\/.+\..+/
// - Handle async form submission with try/catch
// - Use loading state to prevent double submission

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
    if (!title.trim()) newErrors.title = "Project title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (!technologies.length) newErrors.technologies = "Add at least one technology.";
    if (imageUrl && !urlRegex.test(imageUrl)) newErrors.imageUrl = "Invalid image URL.";
    if (projectUrl && !urlRegex.test(projectUrl)) newErrors.projectUrl = "Invalid live demo URL.";
    if (githubUrl && !urlRegex.test(githubUrl)) newErrors.githubUrl = "Invalid GitHub URL.";
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
      </div>
        await onSubmit({ title, description, projectUrl, githubUrl, technologies });
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
          {loading ? "Creating..." : "Create Project"}
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