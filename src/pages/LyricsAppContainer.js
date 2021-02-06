import React, { Component } from 'react';
import { LyricDetailViewer } from '../components/lyricDetailViewer/LyricDetailViewer';
import { PageNavigator } from '../components/pageNavigator/PageNavigator';
import { ResultCard } from '../components/resultCard/ResultCard';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/spinner';
import { fetchLyrics, fetchLyricSuggestions } from '../services/lyrics';
import {
  defaultPageSize,
  navigationActions,
  infoToastConfig,
} from '../utility/appConstants';
import { APP_MESSAGES } from '../utility/strings';
import './lyricsApp.css';
import { escapeForwardSlash, getTotalNoOfPages } from '../utility';
import { toast } from 'react-toastify';

class LyricsAppContainer extends Component {
  state = {
    searchQuery: '',
    suggestions: [],
    isLoading: false,
    currentPage: 1,
    currentLyrics: {},
    isLyricView: false,
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
    fetchLyrics({ artist: artist.name, title: escapeForwardSlash(title) })
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
              onChange={(event) =>
                this.setState({ searchQuery: event.target.value })
              }
              onSubmit={this.onSearchQuerySubmit}
              value={searchQuery}
              placeholder={'Search by song or artist name'}
            />
          </div>
          {isLyricView && (
            <LyricDetailViewer
              lyricsData={currentLyrics}
              onBackButtonClick={this.onGoBackFromLyricViewClick}
              onCopyClick={() =>
                toast.info(APP_MESSAGES.lyricsCopied, infoToastConfig)
              }
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
              </div>
              <PageNavigator
                currentPageNo={currentPage}
                totalNoOfPages={getTotalNoOfPages(suggestions.length)}
                onNavigationButtonClick={this.onNavigationButtonClick}
              />
            </div>
          )}
        </div>
        <Spinner isLoading={isLoading} />
      </>
    );
  }
}

export default LyricsAppContainer;
