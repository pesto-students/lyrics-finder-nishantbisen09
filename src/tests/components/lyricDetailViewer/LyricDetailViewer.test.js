import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { APP_MESSAGES } from '../../../utility/appConstants';
import { LyricDetailViewer } from '../../../components/lyricDetailViewer/LyricDetailViewer';

describe('RESULT DETAIL VIEWER', () => {
  describe('Should render passed', () => {
    it('title', () => {
      render(<LyricDetailViewer lyricsData={{ title: 'Janam Janam' }} />);
      expect(screen.getByText('Janam Janam')).toBeTruthy();
    });

    it('artist name', () => {
      render(<LyricDetailViewer lyricsData={{ artist: { name: 'Arijit' } }} />);
      expect(screen.getByText('- Arijit')).toBeTruthy();
    });

    it('lyrics', () => {
      render(<LyricDetailViewer lyricsData={{ lyrics: 'Hello buddy' }} />);
      expect(screen.getByText('Hello buddy')).toBeTruthy();
    });

    it('artist image', () => {
      render(
        <LyricDetailViewer
          lyricsData={{ artist: { picture_small: '/some-random-path' } }}
        />
      );
      expect(screen.getByAltText('artist-img').getAttribute('src')).toBe(
        '/some-random-path'
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
      document.execCommand = jest.fn();
      render(
        <LyricDetailViewer
          lyricsData={{ lyrics: 'Hello buddy' }}
          onCopyClick={onCopyClick}
        />
      );
      const copyBtn = screen.getByTitle(APP_MESSAGES.copyLyrics);
      fireEvent.click(copyBtn);
      expect(onCopyClick).toHaveBeenCalled();
    });
    it('Should call onBackButtonClick when back icon is clicked', () => {
      const onBackButtonClick = jest.fn();
      render(
        <LyricDetailViewer
          lyricsData={{ lyrics: 'Hello buddy' }}
          onBackButtonClick={onBackButtonClick}
        />
      );
      const backBtn = screen.getByTitle(APP_MESSAGES.goBackToResults);
      fireEvent.click(backBtn);
      expect(onBackButtonClick).toHaveBeenCalled();
    });
  });
});
