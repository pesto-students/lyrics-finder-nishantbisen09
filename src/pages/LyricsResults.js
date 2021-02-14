import React from 'react';
import { PageNavigator } from '../components/pageNavigator/PageNavigator';
import { ResultCard } from '../components/resultCard/ResultCard';

export const LyricsResults = ({
  suggestions,
  onLyricCardClick,
  currentPage,
  totalNoOfPages,
  onNavigationButtonClick,
}) => {
  return (
    <div className='results-container'>
      <div className='results scroller'>
        {suggestions.map(({ title, artist, id }) => {
          return (
            <div
              key={id}
              onClick={() =>
                onLyricCardClick({
                  id,
                  artist: artist,
                  title,
                })
              }
              onKeyUp={(event) => {
                if (event.keyCode === 13)
                  onLyricCardClick({
                    artist: artist,
                    title,
                  });
              }}
              tabIndex={0}
            >
              <ResultCard title={title} artist={artist} />
            </div>
          );
        })}
      </div>
      <PageNavigator
        currentPageNo={currentPage}
        totalNoOfPages={totalNoOfPages}
        onNavigationButtonClick={onNavigationButtonClick}
      />
    </div>
  );
};
