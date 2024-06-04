import React, {useState} from 'react';
import {ListItemModel} from "../../types/Types";

interface TabListProps {
  listItems: ListItemModel[]
}

const TabList = ({ listItems }: TabListProps) => {
  const [activeButton, setActiveButton] = useState<ListItemModel>(listItems[0])

  const isActive = (item: ListItemModel) => {
    return item.label === activeButton.label;
  }

  return (
    <div>
      <section className={"flex justify-start items-center gap-2"}>
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
      </section>
      <section className={"mx-2"}>
        {activeButton.tileObject || <small>No tile</small>}
      </section>
    </div>
  );
};

export default TabList;