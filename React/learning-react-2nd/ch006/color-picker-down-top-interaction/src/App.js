import React, {useState} from "react";
import colorData from './color-data.json';
import ColorList from './ColorList.js';

export default function App() {
  const [colors, setColors] = useState(colorData);
  return <ColorList
    colors={colors}
    onRemeveColor={id => {
      const newColors = colors.filter(color => color.id !== id);
      setColors(newColors);
    }}
    onRateColor={(id, rating) => {
      const newColors = colors.map(color =>
        color.id === id ? { ...color, rating } : color
      );
      setColors(newColors);
    }}
  />
};
