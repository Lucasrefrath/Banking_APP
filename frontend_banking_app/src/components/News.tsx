import React, {useMemo, useState} from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";

interface NewsProps {

}

const News = ({}: NewsProps) => {
  const [expanded, setExpanded] = useState(false);
  const list: string[] = [
    "News 1",
    "News 2",
    "News 3",
    "News 4",
    "News 5",
    "News 6",
  ]
  const lengthLimit: number = useMemo(() => !expanded ? 4 : list.length, [ expanded, list ])


  return (
    <div>
      {/*TODO*/}
      <span className={"grid grid-cols-4 gap-2"}>
        {list.slice(0, lengthLimit).map((item) => (
          <div className={"pill-gray cursor-pointer"}>
            {item}
          </div>
        ))}
      </span>
      <span className={"justify-center flex items-center"}>
        <button className={"type-see-more"} onClick={() => setExpanded(!expanded)}>
          see {expanded ? "less" : "more" }
          {expanded ? (
            <ChevronUpIcon className={"icon-small"} />
          ) : (
            <ChevronDownIcon className={"icon-small"} />
          )}
        </button>
      </span>
    </div>
  );
};

export default News;