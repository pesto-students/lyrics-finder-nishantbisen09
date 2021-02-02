import React from 'react';
import ReactDOM from 'react-dom';
import { debounce } from 'lodash';
import { copyBtnDebounceTime } from '../../utility/appConstants';

export const CopyToClipboard = (props) => {
  const { text, onCopy, children, ...rest } = props;
  const element = React.Children.only(children);
  const debouncedOnCopy = debounce(onCopy, copyBtnDebounceTime);

  const getTextAreaData = () => {
    return [
      React.createElement('textarea', {
        id: 'text',
        style: { opacity: 0 },
        defaultValue: text,
      }),
      document.getElementById('copy-textarea'),
    ];
  };

  const onCopyClick = () => {
    const [textArea, textAreaContainer] = getTextAreaData();
    ReactDOM.render(textArea, textAreaContainer);
    selectAndCopyText();
    ReactDOM.unmountComponentAtNode(textAreaContainer);
    debouncedOnCopy(text);
  };

  const selectAndCopyText = () => {
    document.getElementById('text').select();
    document.execCommand('copy');
  };

  return (
    <>
      <div id='copy-textarea' />
      {React.cloneElement(element, { ...rest, onClick: onCopyClick })}
    </>
  );
};
