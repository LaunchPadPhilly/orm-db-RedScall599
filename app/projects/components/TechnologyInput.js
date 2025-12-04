// TODO: Students will implement this component
// This is an advanced component building exercise

// Component Requirements:
// 1. Create a component that accepts { technologies, onChange, error } props
// 2. Allow users to type in a technology name and add it to the list
// 3. Provide quick-add buttons for common technologies
// 4. Display selected technologies as removable tags
// 5. Prevent duplicate technologies
// 6. Support both keyboard (Enter) and button (Add) interactions
// 7. Handle error states with visual feedback

// Learning Objectives:
// - Advanced React state management
// - Array manipulation patterns
// - User input handling
// - Conditional styling
// - Accessibility considerations
// - Component prop patterns

// Suggested Technologies for Quick-Add:
// ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
//  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
//  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
//  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop']

// Implementation Hints:
// - Use 'use client' directive
// - Manage local input state with useState
// - Use filter() to remove technologies
// - Use includes() to check for duplicates
// - Handle keyPress event for Enter key
// - Style error states with conditional classes

"use client";
import { useState } from "react";

const QUICK_TECHS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Express',
  'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap', 'Python', 'Java',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Prisma', 'GraphQL', 'REST API',
  'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Photoshop'
];

export default function TechnologyInput({ technologies = [], onChange, error }) {
  const [input, setInput] = useState("");

  const addTech = (tech) => {
    const trimmed = tech.trim();
    if (!trimmed || technologies.includes(trimmed)) return;
    onChange([...technologies, trimmed]);
    setInput("");
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTech(input);
    }
  };

  const handleAddClick = () => addTech(input);

  const handleRemove = (tech) => {
    onChange(technologies.filter(t => t !== tech));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {technologies.map((tech) => (
          <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2">
            {tech}
            <button
              type="button"
              className="ml-1 text-xs text-red-500 hover:text-red-700"
              onClick={() => handleRemove(tech)}
              aria-label={`Remove ${tech}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          className={`border px-3 py-2 rounded w-48 ${error ? "border-red-500" : "border-gray-300"}`}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a technology and press enter"
        />
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {QUICK_TECHS.map((tech) => (
          <button
            key={tech}
            type="button"
            className={`bg-gray-200 hover:bg-blue-200 text-gray-800 px-3 py-1 rounded-full text-sm ${technologies.includes(tech) ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => addTech(tech)}
            disabled={technologies.includes(tech)}
          >
            {tech}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
