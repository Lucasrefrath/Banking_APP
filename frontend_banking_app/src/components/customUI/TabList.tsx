import React, {useState} from 'react';
import {ListItemModel} from "../../types/Types";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

interface TabListProps {
  listItems: ListItemModel[],
  reloadAction?: () => void
}

const TabList = ({ listItems, reloadAction}: TabListProps) => {
  const [activeButton, setActiveButton] = useState<ListItemModel>(listItems[0])

  const isActive = (item: ListItemModel) => {
    return item.label === activeButton.label;
  }

  return (
    <div>
      <section className={"flex justify-between items-center"}>
        <div className={"flex justify-start items-center gap-2"}>
          {listItems.map((item) => {
            return <button
              className={`rounded-xl px-3 py-1 ${isActive(item) ? "bg-gray-200" : "hover:bg-gray-100"}`}
              id={item.label}
              onClick={() => setActiveButton(item)}
              key={item.label}
            >
              {item.label}
            </button>}
          )}
        </div>
        <button
          className={`rounded-full px-2 py-1 hover:bg-gray-100`}
          onClick={reloadAction}
        >
          <ArrowPathIcon className={"icon"}/>
          <small>reload</small>
        </button>

      </section>
      <section className={"mx-2"}>
        {activeButton.tileObject || <small>No tile</small>}
      </section>
    </div>
  );
};

export default TabList;