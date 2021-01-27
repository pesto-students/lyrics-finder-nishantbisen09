import React, { Component } from 'react';
import { ResultCard } from '../components/resultCard/ResultCard';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/spinner';
import { fetchLyricSuggestions } from '../services/lyrics';
import { debounce } from '../utility';
import { defaultPageSize, searchDebounceTime } from '../utility/appConstants';
import './lyricsApp.css';

class LyricsAppContainer extends Component {
  state = {
    searchQuery: '',
    suggestions: [],
    isLoading: false,
    currentPage: 1,
  };

  constructor(props) {
    super(props);
    this.fetchLyrics = debounce(this.fetchLyrics, searchDebounceTime);
  }

  onSearchQueryChange = ({ target }) => {
    const searchQuery = target.value;
    this.setState({ searchQuery }, this.fetchLyrics);
  };

  fetchLyrics = () => {
    const { searchQuery } = this.state;
    if (searchQuery) {
      this.setState({ isLoading: true });
      fetchLyricSuggestions(searchQuery)
        .then((response) => response.json())
        .then((response) =>
          this.setState({ suggestions: response.data }, () =>
            this.setState({ isLoading: false })
          )
        );
    }
  };

  getNoOfPages = () =>
    Math.ceil(this.state.suggestions.length / defaultPageSize);

  getSuggestionsByPageNo = (pageNo) => {
    if (pageNo === 1)
      return this.state.suggestions.slice(0, defaultPageSize);
    let start = defaultPageSize * (pageNo - 1);
    let end = start + defaultPageSize;
    if (end > this.state.suggestions.length) end = this.state.suggestions.length;
    return this.state.suggestions.slice(start, end);
  };

  onSearchQuerySubmit = (event) => {
    event.preventDefault();
    this.fetchLyrics();
  };

  render() {
    const { searchQuery, isLoading, suggestions } = this.state;
    return (
      <>
        <div className='app-container'>
          <div className='search-panel-container'>
            <SearchBar
              onChange={this.onSearchQueryChange}
              onSubmit={this.onSearchQuerySubmit}
              value={searchQuery}
            />
          </div>
          {!!suggestions.length && (
            <div className='result-container'>
              {suggestions.map(({ title, artist, id }) => {
                return <ResultCard key={id} title={title} artist={artist} />;
              })}
            </div>
          )}
        </div>
        <Spinner isLoading={isLoading} />
      </>
    );
  }
}

export default LyricsAppContainer;
