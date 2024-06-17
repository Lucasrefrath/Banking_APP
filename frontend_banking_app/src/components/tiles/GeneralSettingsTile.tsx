import React from 'react';

const GeneralSettingsTile = () => {

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  }

  return (
    <div>
      <span>
        <label>Visual Options</label>
        <div>
          <button className={"type-secondary-outline"} onClick={toggleDarkMode}>Toggle Visual Mode</button>
        </div>
      </span>
      <span>
        <small className={"dark:bg-gray-300"}>Mode</small>
      </span>
    </div>
  );
};

export default GeneralSettingsTile;