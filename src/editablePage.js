import React from "react";
import uid from "./utils/uid"
;

const initialBlock = { id : uid(), html: "", tag: "p"} ;

class EditablePage extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { blocks : [initialBlock] };
  }

  render() {
    return (
      <div className="Page">
        {
          this.state.blocks.map((block, key) => {
            return (
              <div key={key} id={block.id}>
                Tag : {block.tag}, Content : {block.html}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default EditablePage;