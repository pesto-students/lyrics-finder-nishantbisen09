import { mount } from 'enzyme';
import LyricsAppContainer from '../../pages/LyricsAppContainer';
import lodash, { wrap } from 'lodash';
import { navigationActions } from '../../utility/appConstants';

describe('LyricsAppContainer', () => {
  it('onSearchQueryChange should update the passed state', () => {
    const wrapper = mount(<LyricsAppContainer />);
    wrapper.instance().onSearchQueryChange({ target: { value: 'hello' } });
    expect(wrapper.instance().state.searchQuery).toBe('hello');
  });

  it('fetchLyrics should call fetchLyricSuggestions with provided input', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    );
    lodash.debounce = (fn) => fn;
    const wrapper = mount(<LyricsAppContainer />);
    wrapper
      .instance()
      .setState({ ...wrapper.instance().state, searchQuery: 'hello' });
    wrapper.instance().fetchLyrics();
    expect(global.fetch).toHaveBeenCalled();
  });

  it('getSuggestionsByPageNo should return correct suggestions', () => {
    const wrapper = mount(<LyricsAppContainer />);
    wrapper.instance().setState({
      ...wrapper.instance().state,
      suggestions: [
        { id: 1, title: 'song1' },
        { id: 2, title: 'song1' },
        { id: 3, title: 'song1' },
        { id: 4, title: 'song1' },
        { id: 5, title: 'song1' },
        { id: 6, title: 'song1' },
        { id: 7, title: 'song1' },
        { id: 8, title: 'song1' },
        { id: 9, title: 'song1' },
        { id: 10, title: 'song1' },
      ],
      currentPage: 2,
    });
    expect(wrapper.instance().getSuggestionsByPageNo().length).toBe(1);
    wrapper.instance().setState({
      ...wrapper.instance().state,
      currentPage: 1,
    });
    expect(wrapper.instance().getSuggestionsByPageNo().length).toBe(9);
  });

  it('Should call fetchLyrics when onSearchQuerySubmit  is called', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    );
    lodash.debounce = (fn) => fn;
    const wrapper = mount(<LyricsAppContainer />);
    wrapper.instance().fetchLyrics = jest.fn();
    wrapper.instance().onSearchQuerySubmit({
      preventDefault() {
        return;
      },
    });
    expect(wrapper.instance().fetchLyrics).toHaveBeenCalled();
  });

  it('Should set the correct page no when onNavigationButtonClick is called', () => {
    const wrapper = mount(<LyricsAppContainer />);
    wrapper.instance().onNavigationButtonClick(navigationActions.next);
    expect(wrapper.instance().state.currentPage).toBe(2);
    wrapper.instance().onNavigationButtonClick(navigationActions.prev);
    expect(wrapper.instance().state.currentPage).toBe(1);
  });

  it('Should show lyric detail view when onLyricCardClick is called', () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [] }),
      })
    );
    const wrapper = mount(<LyricsAppContainer />);
    wrapper
      .instance()
      .onLyricCardClick({ artist: { name: 'stephen' }, title: 'love me' });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Should close the lyric detail view when onGoBackFromLyricViewClick is called', () => {
    const wrapper = mount(<LyricsAppContainer />);
    wrapper.instance().onGoBackFromLyricViewClick();
    expect(wrapper.instance().state.isLyricView).toBe(false);
  });
});
