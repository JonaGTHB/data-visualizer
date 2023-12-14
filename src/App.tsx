import React, { useState } from 'react';
import './App.css';

interface ParsedItem {
  count: number;
  type: string;
  url: string;
}

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>(''); // State to store textarea value
  const [parsedArray, setParsedArray] = useState<ParsedItem[]>([]);

  const parseText = (text: string): ParsedItem[] => {
    const lines = text.trim().split('\n');
    const resultArray: ParsedItem[] = [];

    for (const line of lines) {
      const [count, type, url] = line.split(/\s+/);

      resultArray.push({
        count: parseInt(count, 10),
        type: type,
        url: url,
      });
    }

    return resultArray;
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    setParsedArray(parseText(event.target.value));
  };

  return (
    <div>
      <textarea
        value={inputText}
        onChange={handleTextareaChange}
        placeholder="Paste your text here..."
        rows={10}
        cols={50}
      />
      <div className="image-grid">
        {parsedArray.map((item, index) => (
          <div key={index} className={(item.type === 'product_data_sheet' ? 'grid-item-marked' : 'grid-item')}>
            <img src={item.url} alt={`Image ${index}`} className="grid-image" />
            <p>Count: {item.count}</p>
            <p>Type: {item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

