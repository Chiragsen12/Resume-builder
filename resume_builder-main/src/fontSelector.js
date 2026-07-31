import { useState, useEffect } from "react";

const FontSelector = () => {
  const [font, setFont] = useState(localStorage.getItem("selectedFont") || "Arial");

  const handleChange = (e) => {
    const selected = e.target.value;
    setFont(selected);
    localStorage.setItem("selectedFont", selected); // ✅ Save font
  };

  return (
    <select value={font} onChange={handleChange}>
      <option value="Arial">Arial</option>
      <option value="Georgia">Georgia</option>
      <option value="'Courier New'">Courier New</option>
      <option value="Times New Roman">Times New Roman</option>
      <option value="Roboto">Roboto</option>
    </select>
  );
};

export default FontSelector;
