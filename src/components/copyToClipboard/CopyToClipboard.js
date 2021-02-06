import React from 'react';
import ReactDOM from 'react-dom';

export const CopyToClipboard = (props) => {
  const { text, onCopy, children, ...rest } = props;
  const element = React.Children.only(children);

  const getTextAreaData = () => {
    return [
      <textarea
        id='text'
        style={{ opacity: 0 }}
        defaultValue={text}
      ></textarea>,
      document.getElementById('copy-textarea'),
    ];
  };

  const onCopyClick = () => {
    const [textArea, textAreaContainer] = getTextAreaData();
    ReactDOM.render(textArea, textAreaContainer);
    selectAndCopyText();
    ReactDOM.unmountComponentAtNode(textAreaContainer);
    onCopy(text);
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
