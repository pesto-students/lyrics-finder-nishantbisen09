import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../../../components/searchBar/SearchBar';
import '@testing-library/jest-dom/extend-expect';

describe('SEARCHBAR COMPONENT', () => {
  const defaultProps = {
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    value: 'hello',
    placeholder: 'hi, testing placeholder',
  };
  it('Should call the onChange function when some input is provided', () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'hello');
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('Should call onSubmit on enter button click', () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByTestId('search-input');
    fireEvent.submit(input);
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it('Should have default passed value', () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('hello');
  });

  it('Should have the passed placeholder', () => {
    render(<SearchBar {...defaultProps} />);
    const input = screen.getByTestId('search-input');
    expect(input.getAttribute('placeholder')).toBe(defaultProps.placeholder);
  });

  it('Should render a search icon by default', () => {
    render(<SearchBar {...defaultProps} />);
    const searchIcon = screen.getByTestId('search-icon');
    expect(searchIcon).toBeTruthy();
  });
});
