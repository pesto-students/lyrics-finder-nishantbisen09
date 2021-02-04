import React from 'react';
import { render, screen } from '@testing-library/react';
import { ResultCard } from '../../../components/resultCard/ResultCard';
import { APP_MESSAGES } from '../../../utility/appConstants';

describe('RESULTCARD', () => {
  describe('Should render passed', () => {
    it('title', () => {
      render(<ResultCard title='Janam Janam' />);
      expect(screen.getByText('Janam Janam')).toBeTruthy();
    });

    it('artist name', () => {
      render(<ResultCard artist={{ name: 'Arijit' }} />);
      expect(screen.getByText('- Arijit')).toBeTruthy();
    });

    it('artist image', () => {
      render(<ResultCard artist={{ picture_small: '/some-random-path' }} />);
      expect(screen.getByAltText('artist-img').getAttribute('src')).toBe(
        '/some-random-path'
      );
    });
  });

  describe('Should render default', () => {
    it('title when title is not passed', () => {
      render(<ResultCard />);
      expect(screen.getByText(APP_MESSAGES.noTitleFound)).toBeTruthy();
    });

    it('artist name when artist name is not passed', () => {
      render(<ResultCard />);
      expect(screen.getByText(APP_MESSAGES.artistNameUnavailable)).toBeTruthy();
    });
  });
});
