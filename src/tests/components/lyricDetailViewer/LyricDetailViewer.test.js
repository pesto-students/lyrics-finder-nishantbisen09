import React from 'react';
import { render, screen } from '@testing-library/react';
import { APP_MESSAGES } from '../../../utility/strings';
import { LyricDetailViewer } from '../../../components/lyricDetailViewer/LyricDetailViewer';
import userEvent from '@testing-library/user-event';

describe('LYRIC DETAIL VIEWER', () => {
  const artistName = 'Arijit';
  const title = 'Janam Janam';
  const lyrics = 'Hello buddy';
  const picture_small = '/some-random-path';
  describe('Should render passed', () => {
    it('title', () => {
      render(<LyricDetailViewer lyricsData={{ title }} />);
      expect(screen.getByText(title)).toBeTruthy();
    });

    it('artist name', () => {
      render(
        <LyricDetailViewer lyricsData={{ artist: { name: artistName } }} />
      );
      expect(screen.getByText(`- ${artistName}`)).toBeTruthy();
    });

    it('lyrics', () => {
      render(<LyricDetailViewer lyricsData={{ lyrics }} />);
      expect(screen.getByText(lyrics)).toBeTruthy();
    });

    it('artist image', () => {
      render(<LyricDetailViewer lyricsData={{ artist: { picture_small } }} />);
      expect(screen.getByAltText('artist-img').getAttribute('src')).toBe(
        picture_small
      );
    });
  });

  describe('Should render default', () => {
    it('title when title is not passed', () => {
      render(<LyricDetailViewer lyricsData={{}} />);
      expect(screen.getByText(APP_MESSAGES.noTitleFound)).toBeTruthy();
    });

    it('artist name when artist name is not passed', () => {
      render(<LyricDetailViewer lyricsData={{}} />);
      expect(screen.getByText(APP_MESSAGES.artistNameUnavailable)).toBeTruthy();
    });

    it('message when no lyrics is found', () => {
      render(<LyricDetailViewer lyricsData={{}} />);
      expect(screen.getByText(APP_MESSAGES.lyricsNotFound)).toBeTruthy();
    });
  });

  describe('Behaviors', () => {
    it('Should call onCopyClick when copy icon is clicked', () => {
      const onCopyClick = jest.fn();
      render(
        <LyricDetailViewer lyricsData={{ lyrics }} onCopyClick={onCopyClick} />
      );
      const copyBtn = screen.getByTitle(APP_MESSAGES.copyLyrics);
      userEvent.click(copyBtn);
      expect(onCopyClick).toHaveBeenCalled();
    });
    it('Should call onBackButtonClick when back icon is clicked', () => {
      const onBackButtonClick = jest.fn();
      render(
        <LyricDetailViewer
          lyricsData={{ lyrics }}
          onBackButtonClick={onBackButtonClick}
        />
      );
      const backBtn = screen.getByTitle(APP_MESSAGES.goBackToResults);
      userEvent.click(backBtn);
      expect(onBackButtonClick).toHaveBeenCalled();
    });
  });
});
