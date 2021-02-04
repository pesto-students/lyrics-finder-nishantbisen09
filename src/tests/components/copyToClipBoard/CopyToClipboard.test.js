import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CopyToClipboard } from '../../../components/copyToClipboard/CopyToClipboard';

describe('COPY TO CLIPBOARD', () => {
  it('should render the passed children', () => {
    render(
      <CopyToClipboard text={'copy me'}>
        <h1>hello</h1>
      </CopyToClipboard>
    );
    expect(screen.getByText('hello')).toBeTruthy();
  });

  it('Should bind the passed onCopy as onClick to the passed child', () => {
    const onCopy = jest.fn();
    document.execCommand = jest.fn();
    render(
      <CopyToClipboard text={'copy me'} onCopy={onCopy}>
        <h1>hello</h1>
      </CopyToClipboard>
    );
    fireEvent.click(screen.getByText('hello'));
    expect(onCopy).toHaveBeenCalled();
  });
});
