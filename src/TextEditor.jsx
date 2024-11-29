import React, { useEffect, useRef, useState } from 'react';
import { FaSave, FaFileExport, FaSun, FaMoon } from 'react-icons/fa';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';

const TextEditor = () => {
  const [content, setContent] = useState('');
  const [theme, setTheme] = useState('light'); // Light or dark theme
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  // Initialize Quill Editor
  useEffect(() => {
    quillRef.current = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          ['blockquote', 'code-block'],
        ],
      },
    });

    // Load from localStorage
    const savedContent = localStorage.getItem('editor-content');
    if (savedContent) {
      quillRef.current.root.innerHTML = savedContent;
    }

    quillRef.current.on('text-change', () => {
      const currentContent = quillRef.current.root.innerHTML;
      setContent(currentContent);
      calculateCounts(currentContent);
      localStorage.setItem('editor-content', currentContent); // Autosave
    });

    return () => {
      quillRef.current = null;
    };
  }, []);

  // Calculate Word and Character Counts
  const calculateCounts = (text) => {
    const plainText = quillRef.current.getText();
    setWordCount(plainText.trim().split(/\s+/).filter(Boolean).length);
    setCharCount(plainText.length);
  };

  // Save content as a file
  const handleSave = (type) => {
    let blob;
    if (type === 'html') {
      blob = new Blob([content], { type: 'text/html' });
    } else if (type === 'text') {
      const plainText = quillRef.current.getText();
      blob = new Blob([plainText], { type: 'text/plain' });
    }
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `document.${type}`;
    link.click();
  };

  // Toggle Light/Dark Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Enhanced Text Editor</h1>
        <button
          onClick={toggleTheme}
          className="text-xl text-yellow-500 dark:text-yellow-300 hover:text-yellow-600"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>

      {/* Editor Container */}
      <div ref={editorRef} className="border rounded-md bg-gray-50 dark:bg-gray-700 p-4 min-h-[200px]"></div>

      {/* Stats and Actions */}
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p>Word Count: <strong>{wordCount}</strong></p>
          <p>Character Count: <strong>{charCount}</strong></p>
        </div>
        <div className="space-x-2 mt-2 md:mt-0">
          <button
            onClick={() => handleSave('html')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-blue-700"
          >
            <FaFileExport className="mr-2" /> Export HTML
          </button>
          <button
            onClick={() => handleSave('text')}
            className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center hover:bg-green-700"
          >
            <FaFileExport className="mr-2" /> Export Text
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
