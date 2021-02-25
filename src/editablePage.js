import React from "react";
import uid from "./utils/uid";
import { setCaretToEnd } from "./utils/caretHelpers"
import EditableBlock from "./editableBlock";

const initialBlock = { id : uid(), html: "", tag: "p"} ;

class EditablePage extends React.Component {

  constructor(props) {
    super(props);
    this.state =  { blocks : [initialBlock] };
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addBlockHandler = this.addBlockHandler.bind(this);
    this.deleteBlockHandler = this.deleteBlockHandler.bind(this);
  }

  updatePageHandler(updatedBlock) {
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(updatedBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag : updatedBlock.tag,
      html : updatedBlock.html
    };
    this.setState({ blocks : updatedBlocks});
  }

  addBlockHandler(currentBlock) {
    const newBlock = { id : uid(), html: "", tag: "p"};
    const blocks = this.state.blocks;
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock); //추가
    this.setState({ blocks : updatedBlocks}, () => {
      currentBlock.ref.nextElementSibling.focus(); //다음 요소에 focus
    })
  }

  deleteBlockHandler(currentBlock) {
    const previousBlock = currentBlock.ref.previousElementSibling; //이전 요소
    if(previousBlock) {
      const blocks = this.state.blocks;
      const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index, 1) ; // 제거
      this.setState({ blocks : updatedBlocks}, () => {
        setCaretToEnd(previousBlock);
        previousBlock.focus();
      })
    }
  }

  render() {
    return (
      <div className="Page">
        {
          this.state.blocks.map((block, key) => {
            return (
              <EditableBlock
                key={key}
                id={block.id}
                tag={block.tag}
                html={block.html}
                updatePage={this.updatePageHandler}
                addBlock={this.addBlockHandler}
                deleteBlock={this.deleteBlockHandler}
              />
            )
          })
        }
      </div>
    )
  }
}

export default EditablePage;