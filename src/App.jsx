import React, { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [task, setTask] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  // Load notes from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("notes");
    if (savedTasks) {
      setTask(JSON.parse(savedTasks));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Save notes whenever task changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !detail.trim()) return;

    setTask([...task, { title, detail }]);

    setTitle("");
    setDetail("");
  };

  const deleteNote = (idx) => {
    const copyTask = [...task];
    copyTask.splice(idx, 1);
    setTask(copyTask);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-500">
        <h1 className="text-2xl md:text-4xl font-bold">Notes App 📝</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg font-semibold bg-pink-600 text-white hover:scale-105 transition"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Form Section */}
        <form
          onSubmit={submitHandler}
          className="w-full lg:w-1/2 p-5 md:p-10 flex flex-col gap-4"
        >
          <h2 className="text-3xl font-bold">Add Notes</h2>

          <input
            type="text"
            placeholder="Enter Note Heading"
            className={`px-4 py-3 rounded-lg border outline-none ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-300"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write Details Here..."
            className={`px-4 py-3 h-40 rounded-lg border outline-none resize-none ${
              darkMode
                ? "bg-gray-800 border-gray-600"
                : "bg-white border-gray-300"
            }`}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />

          <button className="bg-pink-500 hover:bg-pink-600 active:scale-95 transition text-white font-semibold py-3 rounded-lg">
            Add Note
          </button>
        </form>

        {/* Notes Section */}
        <div className="w-full lg:w-1/2 p-5 md:p-10 lg:border-l border-gray-500">
          <h2 className="text-3xl font-bold mb-5">Recent Notes</h2>

          {task.length === 0 ? (
            <p className="text-gray-400">
              No notes available. Add your first note!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {task.map((elem, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-5 flex flex-col justify-between min-h-55 shadow-lg hover:scale-105 transition ${
                    darkMode
                      ? "bg-yellow-200 text-black"
                      : "bg-yellow-100 text-black"
                  }`}
                >
                  <div>
                    <h3 className="font-bold text-lg wrap-break-word">
                      {elem.title}
                    </h3>

                    <p className="mt-3 text-sm text-gray-700 wrap-break-word">
                      {elem.detail}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteNote(idx)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold active:scale-95 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;