import React from 'react';
import { appViews } from '../utility/appConstants';

export const AppControlPanel = ({ currentView, onControlPanelItemClick }) => {
  return (
    <div className='control-panel'>
      <div
        className={`panel-item ${
          currentView === appViews.searchResults
            ? 'left-shadow'
            : 'inactive-panel'
        }`}
        onClick={() => onControlPanelItemClick(appViews.searchResults)}
      >
        Search Results
      </div>
      <div
        className={`panel-item ${
          currentView === appViews.playlist ? 'right-shadow' : 'inactive-panel'
        }`}
        onClick={() => onControlPanelItemClick(appViews.playlist)}
      >
        Playlist
      </div>
    </div>
  );
};
