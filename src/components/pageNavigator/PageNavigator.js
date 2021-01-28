import React from 'react';
import { navigationActions } from '../../utility/appConstants';
import './pageNavigator.css';

export const PageNavigator = ({
  totalNoOfPages,
  currentPageNo,
  onNavigationButtonClick,
}) => {
  const isNextButtonDisabled = () => currentPageNo === totalNoOfPages;
  const isPreviousButtonDisabled = () => currentPageNo === 1;

  return (
    <div className='page-navigator-container'>
      <div className='previous-btn'>
        <i
          className={`fas fa-arrow-circle-left ${
            isPreviousButtonDisabled() && 'disabled'
          }`}
          onClick={() =>
            !isPreviousButtonDisabled() &&
            onNavigationButtonClick(navigationActions.prev)
          }
        ></i>
      </div>
      <div className='next-btn'>
        <i
          className={`fas fa-arrow-circle-right ${
            isNextButtonDisabled() && 'disabled'
          }`}
          onClick={() =>
            !isNextButtonDisabled() &&
            onNavigationButtonClick(navigationActions.next)
          }
        ></i>
      </div>
    </div>
  );
};
