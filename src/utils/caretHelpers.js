export const setCaretToEnd = (element) => {
  const range = document.createRange(); // range == 노드와 텍스트 노드를 포함한 문서의 fragment (문서의 특정 부분)
  const selection = window.getSelection(); // selection == 마우스를 통해 드래그 & 클릭하거나 키보드를 통해 선택한 텍스트 범위.
  range.selectNodeContents(element); // 요소의 하위 컨텐츠 선택
  range.collapse(false); // 끝점
  selection.removeAllRanges();
  selection.addRange(range);
  element.focus();
};

export const getCaretCoordinates = () => {
  let x, y;
  const selection = window.getSelection();
  if (selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(false);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top;
    }
  }
  return { x, y };
};

//selection과 range에 대한 이해 : http://ezcode.kr/study/view/224