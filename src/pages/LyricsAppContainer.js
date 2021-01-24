import React, { Component } from 'react';
import { Search } from '../components/search/Search';
import './lyricsApp.scss';

export class LyricsAppContainer extends Component {
  render() {
    return (
      <div className='app-container'>
        <div className='search-panel-container'>
          <Search />
        </div>
      </div>
    );
  }
}
