import React, { Component } from 'react';
import { Search } from '../components/search/Search';
import './lyricsApp.scss';
import { connect } from 'react-redux';
import { getLyricSuggestions } from '../redux/actions/lyrics';

class LyricsAppContainer extends Component {
  state = { searchQuery: '' };

  onSearchQueryChange = ({ target }) => {
    const searchQuery = target.value;
    this.setState({ searchQuery });
    this.props.getLyricSuggestions({ searchQuery });
  };

  render() {
    return (
      <div className='app-container'>
        <div className='search-panel-container'>
          <Search
            onChange={this.onSearchQueryChange}
            value={this.state.searchQuery}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ lyricsReducer }) => ({
  suggestions: lyricsReducer.suggestions,
});

export default connect(mapStateToProps, { getLyricSuggestions })(
  LyricsAppContainer
);
