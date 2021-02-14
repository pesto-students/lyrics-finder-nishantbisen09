import React from 'react';
import { render } from '@testing-library/react';
import LyricsAppContainer from '../../pages/LyricsAppContainer';
import userEvent from '@testing-library/user-event';
import { suggestions } from '../Fixtures';
import { APP_MESSAGES } from '../../utility/strings';
import { toast } from 'react-toastify';

describe('LYRIC APP CONTAINER', () => {
  let wrapper;
  const placeholder = 'Search by song or artist name';
  const searchText = 'arijit';
  const lyrics = 'Im in love with the';

  const mockSuggestionSuccessResponse = { data: suggestions };
  const mockSuggestionJsonPromise = Promise.resolve(
    mockSuggestionSuccessResponse
  );
  const mockSuggestionsFetchPromise = Promise.resolve({
    json: () => mockSuggestionJsonPromise,
  });

  const mockEmptySuggestionSuccessResponse = { data: [] };
  const mockEmptySuggestionJsonPromise = Promise.resolve(
    mockEmptySuggestionSuccessResponse
  );
  const mockEmptySuggestionsFetchPromise = Promise.resolve({
    json: () => mockEmptySuggestionJsonPromise,
  });

  const mockLyricsSuccessResponse = { lyrics };
  const mockLyricsJsonPromise = Promise.resolve(mockLyricsSuccessResponse);
  const mockLyricsFetchPromise = Promise.resolve({
    json: () => mockLyricsJsonPromise,
  });

  beforeEach(() => {
    wrapper = render(<LyricsAppContainer />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('shows searchbar to search lyrics', () => {
    const { getByPlaceholderText } = wrapper;
    expect(getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('clears the search text when clicked on cross icon', () => {
    const { getByPlaceholderText, getByTestId } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, searchText);
    const clearBtn = getByTestId('clear-icon');
    userEvent.click(clearBtn);
    expect(input.getAttribute('value')).toBe('');
  });

  it('shows warning message when no input is provided', () => {
    toast.error = jest.fn();
    const { getByPlaceholderText } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, `{enter}`);
    expect(toast.error).toHaveBeenCalled();
  });

  it('shows search results when enter button is clicked on input', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockSuggestionsFetchPromise);
    const { getByPlaceholderText, findAllByText } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, `${searchText}{enter}`);
    const resultCard = await findAllByText('Khwabo k naate');
    expect(resultCard.length).toBeGreaterThan(0);
  });
  
  it('shows paginator when the results appear', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockSuggestionsFetchPromise);
    const { getByPlaceholderText, findByTestId } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, `${searchText}{enter}`);
    const prevBtn = await findByTestId('prevBtn');
    const nextBtn = await findByTestId('nextBtn');
    expect(prevBtn).toBeTruthy();
    expect(nextBtn).toBeTruthy();
  });

  it('should go to next page when next navigation button is clicked', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockSuggestionsFetchPromise);
    const { getByPlaceholderText, findAllByText, findByTestId } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, `${searchText}{enter}`);
    const nextBtn = await findByTestId('nextBtn');
    userEvent.click(nextBtn);
    const resultCards = await findAllByText('Khwabo k naate');
    expect(resultCards.length).toBe(1);
  });

  it('should go to previous page when next navigation button is clicked', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockSuggestionsFetchPromise);
    const { getByPlaceholderText, findAllByText, findByTestId } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, `${searchText}{enter}`);
    const nextBtn = await findByTestId('nextBtn');
    userEvent.click(nextBtn);
    const prevBtn = await findByTestId('prevBtn');
    userEvent.click(prevBtn);
    const newResultCards = await findAllByText('Khwabo k naate');
    expect(newResultCards.length).toBe(9);
  });

  it('should show lyric details when clicked on some lyric card', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockSuggestionsFetchPromise);
    const { getByPlaceholderText, findAllByText, findByText } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, `${searchText}{enter}`);
    const resultCard = await findAllByText('Khwabo k naate');
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockLyricsFetchPromise);
    userEvent.click(resultCard[0]);
    const lyricsContainer = await findByText(lyrics);
    expect(lyricsContainer).toBeTruthy();
  });

  it('should go back to results view when back button is clicked', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockSuggestionsFetchPromise);
    const { getByPlaceholderText, findAllByText, findByTitle } = wrapper;
    const input = getByPlaceholderText(placeholder);
    userEvent.type(input, `${searchText}{enter}`);
    const resultCard = await findAllByText('Khwabo k naate');
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockLyricsFetchPromise);
    userEvent.click(resultCard[0]);
    const backBtn = await findByTitle(APP_MESSAGES.goBackToResults);
    userEvent.click(backBtn);
    expect(resultCard[0]).toBeTruthy();
  });
});
