import React from 'react';
import { navigationActions } from '../../utility/appConstants';
import './pageNavigator.css';

export const PageNavigator = ({
  totalNoOfPages,
  currentPageNo,
  onNavigationButtonClick,
}) => {
  return (
    <div className='page-navigator-container'>
      <div className='previous-btn'>
        <i
          data-testid='prevBtn'
          className={`fas fa-arrow-circle-left ${
            currentPageNo === 1 && 'disabled'
          }`}
          onClick={() =>
            currentPageNo !== 1 &&
            onNavigationButtonClick(navigationActions.prev)
          }
        ></i>
      </div>
      <div className='next-btn'>
        <i
          data-testid='nextBtn'
          className={`fas fa-arrow-circle-right ${
            currentPageNo === totalNoOfPages && 'disabled'
          }`}
          onClick={() =>
            currentPageNo !== totalNoOfPages &&
            onNavigationButtonClick(navigationActions.next)
          }
        ></i>
      </div>
    </div>
  );
};
