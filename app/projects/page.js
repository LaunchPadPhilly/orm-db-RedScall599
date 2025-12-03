"use client";
import Link from "next/link";
import ProjectForm from "./components/ProjectForm";
import { useState, useEffect } from "react";

export default function Projects() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create a new project
  const handleCreateProject = async (formData) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create project");

      await fetchProjects();
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete project");
        return;
      }

      // 🔥 REFRESH UI after deleting
      await fetchProjects();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <h1 className="text-5xl font-bold">My Projects</h1>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add New Project"}
          </button>
        </div>

        {/* Slide-down form */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            showForm ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ProjectForm
            isOpen={showForm}
            onSubmit={handleCreateProject}
            onCancel={() => setShowForm(false)}
          />
        </div>

        {/* States: loading, error, projects */}
        {loading ? (
          <div className="text-center py-12">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {(project.technologies || []).slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-sm bg-gray-200 px-3 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="text-sm text-gray-500 px-3 py-1">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 mb-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      View Details
                    </Link>

                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteProject(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // No projects state
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No projects yet</h2>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="font-bold text-blue-900 mb-2">🚀 Getting Started:</h3>
              <ol className="text-blue-800 list-decimal list-inside">
                <li>Create your first project</li>
              </ol>
            </div>
          </div>
        )}

        {/* Ideas */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-yellow-900 mb-2">💡 Project Ideas:</h3>
          <ul className="text-yellow-800 space-y-1">
            <li>• Past school projects</li>
            <li>• Personal coding projects</li>
            <li>• Creative/Design work</li>
            <li>• Future project plans</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
