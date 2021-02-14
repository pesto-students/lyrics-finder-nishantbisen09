import React, { Component } from 'react';
import { LyricDetailViewer } from '../components/lyricDetailViewer/LyricDetailViewer';
import { Spinner } from '../components/spinner/spinner';
import { fetchLyrics } from '../services/lyrics';
import {
  defaultPageSize,
  navigationActions,
  infoToastConfig,
} from '../utility/appConstants';
import { APP_MESSAGES } from '../utility/strings';
import './lyricsApp.css';
import { escapeSlashes, getTotalNoOfPages } from '../utility';
import { toast } from 'react-toastify';
import { LyricsResults } from './LyricsResults';
import playlistImage from '../assets/images/playlist.png';
import lyricsStorageManager from '../utility/LyricsStorageManager';

class FavoriteView extends Component {
  state = {
    isLoading: false,
    currentPage: 1,
    currentLyrics: {},
    isLyricView: false,
  };

  getCurrentPageSuggestions = () => {
    const { favorites } = this.props;
    const { currentPage } = this.state;
    if (currentPage === 1) return favorites.slice(0, defaultPageSize);
    let start = defaultPageSize * (currentPage - 1);
    let end = start + defaultPageSize;
    if (end > favorites.length) end = favorites.length;
    return favorites.slice(start, end);
  };

  onNavigationButtonClick = (action) => {
    const { currentPage } = this.state;
    this.setState({
      currentPage:
        action === navigationActions.prev ? currentPage - 1 : currentPage + 1,
    });
  };

  onLyricCardClick = ({ id, artist, title }) => {
    this.setState({ isLoading: true });
    fetchLyrics({ artist: artist.name, title: escapeSlashes(title) })
      .then((response) => response.json())
      .then(({ lyrics }) => {
        this.setState({
          isLoading: false,
          currentLyrics: { id, lyrics, artist, title },
          isLyricView: true,
        });
      });
  };

  onGoBackFromLyricViewClick = () => {
    this.setState({ isLyricView: false, currentLyrics: {} });
  };

  onFavoriteClick = () => {
    const { currentLyrics } = this.state;
    if (!lyricsStorageManager.isLyricsInfoPresent(currentLyrics.id)) {
      lyricsStorageManager.saveLyricsInfo(currentLyrics);
      toast.info(APP_MESSAGES.lyricsAddedToFavorite);
    } else {
      lyricsStorageManager.deleteLyricsInfo(currentLyrics.id);
      toast.info(APP_MESSAGES.lyricsRemovedFromFavorite);
    }
  };

  render() {
    const { isLoading, currentPage, isLyricView, currentLyrics } = this.state;

    const { favorites, onFavoriteClick } = this.props;

    return (
      <>
        {isLyricView && (
          <LyricDetailViewer
            lyricsData={currentLyrics}
            onBackButtonClick={this.onGoBackFromLyricViewClick}
            onCopyClick={() =>
              toast.info(APP_MESSAGES.lyricsCopied, infoToastConfig)
            }
            onFavoriteClick={() => onFavoriteClick(currentLyrics)}
            isFavorite={lyricsStorageManager.isLyricsInfoPresent(
              currentLyrics.id
            )}
          />
        )}
        {favorites.length !== 0 && !isLyricView && (
          <LyricsResults
            suggestions={this.getCurrentPageSuggestions()}
            currentPage={currentPage}
            totalNoOfPages={getTotalNoOfPages(favorites.length)}
            onLyricCardClick={this.onLyricCardClick}
            onNavigationButtonClick={this.onNavigationButtonClick}
          />
        )}{' '}
        {favorites.length === 0 && !isLyricView && (
          <div className='hint-message'>
            <img src={playlistImage} alt='hint message' />
            <div className='hint-message-text'>
              Your favorite songs will appear here!
            </div>
          </div>
        )}
        <Spinner isLoading={isLoading} />
      </>
    );
  }
}

export default FavoriteView;
