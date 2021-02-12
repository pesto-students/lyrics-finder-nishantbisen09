import React, { Component } from 'react';
import { LyricDetailViewer } from '../components/lyricDetailViewer/LyricDetailViewer';
import { SearchBar } from '../components/searchBar/SearchBar';
import { Spinner } from '../components/spinner/spinner';
import { fetchLyrics, fetchLyricSuggestions } from '../services/lyrics';
import {
  defaultPageSize,
  navigationActions,
  infoToastConfig,
  appViews,
} from '../utility/appConstants';
import { APP_MESSAGES } from '../utility/strings';
import './lyricsApp.css';
import { escapeSlashes, getTotalNoOfPages } from '../utility';
import { toast } from 'react-toastify';
import { AppControlPanel } from './AppControlPanel';
import { LyricsResults } from './LyricsResults';

class LyricsAppContainer extends Component {
  state = {
    searchQuery: '',
    suggestions: [],
    isLoading: false,
    currentPage: 1,
    currentLyrics: {},
    currentView: appViews.searchResults,
    isLyricView: false,
  };

  fetchLyrics = () => {
    const { searchQuery } = this.state;
    if (searchQuery.trim()) {
      this.setState({ isLoading: true });
      fetchLyricSuggestions(escapeSlashes(searchQuery))
        .then((response) => response.json())
        .then((response) =>
          this.setState(
            {
              suggestions: response.data,
              isLoading: false,
              currentPage: 1,
              isLyricView: false,
              currentLyrics: {},
            },
            () =>
              !this.state.suggestions.length &&
              toast.info(APP_MESSAGES.resultsNotFound, infoToastConfig)
          )
        );
    } else {
      toast.info(APP_MESSAGES.searchQueryEmpty, infoToastConfig);
    }
  };

  getCurrentPageSuggestions = () => {
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
    fetchLyrics({ artist: artist.name, title: escapeSlashes(title) })
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

  onControlPanelItemClick = (panelName) => {
    this.setState({ currentView: panelName });
  };

  render() {
    const {
      searchQuery,
      isLoading,
      suggestions,
      currentPage,
      isLyricView,
      currentLyrics,
      currentView,
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
              onClear={() => this.setState({ searchQuery: '' })}
            />
          </div>
          <div className='control-panel-container'>
            <AppControlPanel
              currentView={currentView}
              onControlPanelItemClick={this.onControlPanelItemClick}
            />
          </div>
          <div
            className={`result-view ${
              currentView === appViews.searchResults
                ? 'display-block'
                : 'display-none'
            }`}
          >
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
              <LyricsResults
                suggestions={this.getCurrentPageSuggestions()}
                currentPage={currentPage}
                totalNoOfPages={getTotalNoOfPages(suggestions.length)}
                onLyricCardClick={this.onLyricCardClick}
                onNavigationButtonClick={this.onNavigationButtonClick}
              />
            )}
          </div>
          <div
            className={`playlist-view ${
              currentView === appViews.playlist
                ? 'display-block'
                : 'display-none'
            }`}
          >
            Greetings from the developer, playlist is currently under
            construction, Come back later!
          </div>
        </div>
        <Spinner isLoading={isLoading} />
      </>
    );
  }
}

export default LyricsAppContainer;
