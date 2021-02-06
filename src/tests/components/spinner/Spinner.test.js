import { render } from '@testing-library/react';
import { Spinner } from '../../../components/spinner/spinner';

const defaultProps = {
  isLoading: true,
};

describe('SPINNER COMPONENT', () => {
  it('Should render with a `spinner` class when the isLoading prop is true', () => {
    const { getByLabelText } = render(<Spinner {...defaultProps} />);
    const spinner = getByLabelText('spinner');
    expect(spinner).toBeTruthy();
  });
});
