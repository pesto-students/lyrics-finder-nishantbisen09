import { render, screen } from './testUtils';
import LyricsAppContainer from '../pages/LyricsAppContainer';

describe('LyricsAppContainer', () => {
  render(<LyricsAppContainer />);
  it('Should have an input element with predefined placeholder text', () => {
    const inputElement = screen.getByPlaceholderText(
      /Search by song or artist name/i
    );
    expect(inputElement).toBeInTheDocument();
  });
});
