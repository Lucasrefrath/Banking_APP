import React from 'react';

const GeneralSettingsTile = () => {

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  }

  return (
    <div>
      <section>
        <label>Visual Options</label>
        <div>
          <button className={"type-secondary-outline"} onClick={toggleDarkMode}>Toggle Visual Mode</button>
        </div>
      </section>

      <section>
        <label>Security Options</label>
        <div>
          <small>2-Factor-Auth is disabled</small>
          <button className={"type-see-more"}>Activate 2-Factor-Auth</button>
        </div>
      </section>

      <section>
        <small className={"dark:bg-gray-300"}>Mode</small>
      </section>
    </div>
  );
};

export default GeneralSettingsTile;