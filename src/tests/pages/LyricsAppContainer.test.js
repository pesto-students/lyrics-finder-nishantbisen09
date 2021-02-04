import { mount } from 'enzyme';
import { LyricDetailViewer } from '../../components/lyricDetailViewer/LyricDetailViewer';
import { SearchBar } from '../../components/searchBar/SearchBar';
import LyricsAppContainer from '../../pages/LyricsAppContainer';

describe('LyricsAppContainer', () => {
  it('Should have a SearchBar by default', () => {
    const component = mount(<LyricsAppContainer />);
    expect(component.find(SearchBar).exists()).toBeTruthy();
  });
});
