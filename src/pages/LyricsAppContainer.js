import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import { LyricDetailViewer } from '../components/lyricDetailViewer/LyricDetailViewer';
import { PageNavigator } from '../components/pageNavigator/PageNavigator';
import { ResultCard } from '../components/resultCard/ResultCard';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/spinner';
import { fetchLyrics, fetchLyricSuggestions } from '../services/lyrics';
import { debounce } from '../utility';
import {
  defaultPageSize,
  navigationActions,
  searchDebounceTime,
} from '../utility/appConstants';
import './lyricsApp.css';

class LyricsAppContainer extends Component {
  state = {
    searchQuery: '',
    suggestions: [],
    isLoading: false,
    currentPage: 1,
    currentLyrics: {},
    isLyricView: false,
  };

  lyricViewerRef = createRef();

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
          this.setState({
            suggestions: response.data,
            isLoading: false,
            currentPage: 1,
            isLyricView: false,
            currentLyrics: {},
          })
        );
    }
  };

  escapeForwardSlash = (word) => {
    return word.replace(/\//g, '-');
  };

  getTotalNoOfPages = () =>
    Math.ceil(this.state.suggestions.length / defaultPageSize);

  getSuggestionsByPageNo = () => {
    const { currentPage, suggestions } = this.state;
    if (currentPage === 1) return suggestions.slice(0, defaultPageSize);
    let start = defaultPageSize * (currentPage - 1);
    let end = start + defaultPageSize;
    if (end > suggestions.length) end = suggestions.length;
    return suggestions.slice(start, end);
  };

  onSearchQuerySubmit = (event) => {
    event.preventDefault();
    this.fetchLyrics();
  };

  onNavigationButtonClick = (action) => {
    const { currentPage } = this.state;
    this.setState({
      currentPage:
        action === navigationActions.prev ? currentPage - 1 : currentPage + 1,
    });
  };

  onLyricCardClick = ({ artist, title }) => {
    this.setState({ isLoading: true });
    fetchLyrics({ artist: artist.name, title: this.escapeForwardSlash(title) })
      .then((response) => response.json())
      .then(({ lyrics }) => {
        this.setState({
          isLoading: false,
          currentLyrics: { lyrics, artist, title },
          isLyricView: true,
        });
      });
  };

  onGoBackFromLyricViewClick = () => {
    this.setState({ isLyricView: false, currentLyrics: {} });
  };

  onLyricsCopyClick = () => {
    const textArea = React.createElement('textarea', {
      id: 'lyricsText',
      style: { opacity: 0 },
      defaultValue: this.state.currentLyrics.lyrics,
    });
    const textAreaContainer = document.getElementById('copy-textarea');
    ReactDOM.render(textArea, textAreaContainer);
    document.getElementById('lyricsText').select();
    document.execCommand('copy');
    ReactDOM.unmountComponentAtNode(textAreaContainer);
  };

  render() {
    const {
      searchQuery,
      isLoading,
      suggestions,
      currentPage,
      isLyricView,
      currentLyrics,
    } = this.state;
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
          {isLyricView && (
            <LyricDetailViewer
              lyricsData={currentLyrics}
              onBackButtonClick={this.onGoBackFromLyricViewClick}
              onCopyClick={this.onLyricsCopyClick}
            />
          )}
          {!!suggestions.length && !isLyricView && (
            <div className='results-container'>
              <div className='results'>
                {this.getSuggestionsByPageNo().map(({ title, artist, id }) => {
                  return (
                    <div
                      key={id}
                      onClick={() =>
                        this.onLyricCardClick({
                          artist: artist,
                          title,
                        })
                      }
                    >
                      <ResultCard title={title} artist={artist} />
                    </div>
                  );
                })}
                <PageNavigator
                  currentPageNo={currentPage}
                  totalNoOfPages={this.getTotalNoOfPages()}
                  onNavigationButtonClick={this.onNavigationButtonClick}
                />
              </div>
            </div>
          )}
        </div>
        <Spinner isLoading={isLoading} />
      </>
    );
  }
}

export default LyricsAppContainer;
