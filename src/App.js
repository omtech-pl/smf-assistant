import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { localization } from './localization';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('CS');

  document.body.classList.add('dark:bg-gray-800', 'dark:border-gray-600', 'dark:text-white');

  const getTranslation = (plText) => {
    const translation = localization.find(item => item.PL === plText);
    return translation ? translation[selectedLanguage] : null;
  };

  const handleSubmit = () => {
    try {
      const json = JSON.parse(inputValue);
      const steps = json.steps.map(step => {
        const translation = getTranslation(step.intro);
        return {
          ...step,
          intro: translation || step.intro,
        };
      });

      setOutputValue(JSON.stringify({ steps }, null, 2));
    } catch (error) {
      console.error('Invalid JSON', error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputValue)
      .then(() => {
        console.log('Result copied to clipboard successfully!');
        setInputValue('');
        setOutputValue('');
      })
      .catch(err => {
        console.error('Failed to copy result to clipboard: ', err);
      });
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <label htmlFor="input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your JSON</label>
      <textarea
        id="input"
        rows="10"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={`{
          "steps": [
              {
                  "element": "#form-dataAccountEdit",
                  "intro": "W zakładce mamy możlwiość edycji naszych danych osobowych.",
                  "position": "bottom"
              },
              {
                  "element": "#form-companyAccountEdit",
                  "intro": "W zakładce mamy możliwość podglądu informacji o naszym profilu.",
                  "position": "bottom"
              },
              {
                  "element": "a[data-target=\\"#form-atlasEdit\\"]",
                  "intro": "Formularz umożliwiający ustalenie hasła na potrzeby integracji aplikacji z systemami zewnętrznymi opartymi o protokół Atlas (głównie giełdami transportowymi).",
                  "position": "bottom"
              }
          ]
      }`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <br />

      <label htmlFor="language" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Language</label>
      <select
        id="language"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="CS">Czech (CS)</option>
        <option value="SK">Slovak (SK)</option>
      </select>

      <br />

      <button
        onClick={handleSubmit}
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Submit
      </button>

      <br />
      <br />

      <label htmlFor="output" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Result</label>
      <textarea
        id="output"
        rows="12"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder=""
        value={outputValue}
        readOnly
      />

      <br />

      <button
        onClick={handleCopy}
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
      >
        Copy
      </button>
    </main>
  );
};

export default App;
