import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { PageNavigator } from '../../../components/pageNavigator/PageNavigator';
import { navigationActions } from '../../../utility/appConstants';

describe('PAGE NAVIGATOR', () => {
  describe('Should render', () => {
    it('previous button in enabled mode when page no is greater than one and there are more than 1 pages', () => {
      render(<PageNavigator totalNoOfPages={2} currentPageNo={2} />);
      expect(
        screen.getByTestId('prevBtn').getAttribute('class').includes('disabled')
      ).toBeFalsy();
    });
    it('next button in enabled mode when page no is 1 and there are more than 1 pages', () => {
      render(<PageNavigator totalNoOfPages={2} currentPageNo={1} />);
      expect(
        screen.getByTestId('nextBtn').getAttribute('class').includes('disabled')
      ).toBeFalsy();
    });

    it('previous button in disabled mode when page no is 1 and current page is also 1', () => {
      render(<PageNavigator totalNoOfPages={1} currentPageNo={1} />);
      expect(
        screen.getByTestId('prevBtn').getAttribute('class').includes('disabled')
      ).toBeTruthy();
    });
    it('next button in disabled mode when page no is equal to current page', () => {
      render(<PageNavigator totalNoOfPages={2} currentPageNo={2} />);
      expect(
        screen.getByTestId('nextBtn').getAttribute('class').includes('disabled')
      ).toBeTruthy();
    });
  });

  describe('Behaviours', () => {
    it('Should call onNavigationButtonClick when navigation buttons are clicked', () => {
      const onNavigationButtonClick = jest.fn();
      render(
        <PageNavigator
          totalNoOfPages={5}
          currentPageNo={2}
          onNavigationButtonClick={onNavigationButtonClick}
        />
      );
      const nextBtn = screen.getByTestId('nextBtn');
      const prevBtn = screen.getByTestId('prevBtn');
      fireEvent.click(nextBtn);

      expect(onNavigationButtonClick).toHaveBeenCalledWith(
        navigationActions.next
      );
      fireEvent.click(prevBtn);
      expect(onNavigationButtonClick).toHaveBeenCalledWith(
        navigationActions.prev
      );
    });
  });
});
