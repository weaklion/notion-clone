import React, { useState, useEffect} from "react";
import { matchSorter } from "match-sorter";


const MENU_HEIGHT = 150;
const allowedTags = [
  {
    id: "page-title",
    tag: "h1",
    label: "Heading 1",
    desc : "Big section heading."
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading 2",
    desc : "Medium section heading"
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Heading 3",
    desc : "Small section heading"
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph",
    desc : "paragraph"
  }
]; // '/' 클릭시 html

const SelectMenu = (props) => {

  const X = props.position.x;
  const Y = props.position.y - MENU_HEIGHT ;
  const positionAttributes = { top : Y, left : X };

  const [command, setCommand] = useState("");
  const [items,  setItems] = useState(allowedTags);
  const [selectedItem, setSelectedItem] = useState(0);


  useEffect(() => {
    function keyDownHandler(e) {
      switch(e.key) {
        case "Enter" :
          e.preventDefault();
          props.onSelect(items[selectedItem].tag);
          break;
        case "Backspace" :
          if (!command) props.close();
          setCommand( command.substring(0, command.length -1));
          break;
        case "ArrowUp" :
          e.preventDefault();
          const prevSelected = selectedItem === 0 ? items.length -1 : selectedItem - 1;
          setSelectedItem(prevSelected);
          break;
        case "ArrowDown" :
        case "Tab" :
          e.preventDefault();
          const nextSelected = selectedItem === items.length - 1 ? 0 : selectedItem + 1;
          setSelectedItem(nextSelected);
          break;
        default : 
          setCommand(command + e.key);
          break;
      }
    }

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  useEffect(() => {
    const items = matchSorter(allowedTags, command, { keys : ["tag"]});
    setItems(items);
  },[command])
  
  return (
    <div className="SelectMenu" style={positionAttributes}>
      <div className="Items">
        {items.map((item, key) => {
          const isSelected = items.indexOf(item) === selectedItem;
          return (
            <div
              className={isSelected ? "Selected" : null}
              key={key}
              role="button"
              tabIndex="0"
              onClick={() => props.onSelect(item.tag)}
            >
              <p class="Label">
                {item.label}
              </p>
              {item.desc}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectMenu;