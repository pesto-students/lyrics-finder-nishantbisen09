import { mount } from 'enzyme';
import { LyricDetailViewer } from '../../components/lyricDetailViewer/LyricDetailViewer';
import { SearchBar } from '../../components/searchBar/SearchBar';
import LyricsAppContainer from '../../pages/LyricsAppContainer';

describe('LyricsAppContainer', () => {
  it('Should have a SearchBar by default', () => {
    const component = mount(<LyricsAppContainer />);
    expect(component.find(SearchBar).exists()).toBeTruthy();
  });

  xit('Should show a LyricDetailViewer component when isLyricView  is true', () => {
    const component = mount(<LyricsAppContainer />);
    component.instance().state = {
      isLyricView: true,
      currentLyrics: {
        lyrics: 'hello',
        artist: { name: 'arijit', picture_small: 'path' },
      },
    };
   expect( component.find(LyricDetailViewer).length).toBe(1)
  });
});
