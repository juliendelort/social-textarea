import React from 'react';

export const EmojiSuggestionEntry = React.memo(({ shortname, display }) => {
    return (
        <>
            <span className="social-text-area__emoji-suggestion">{display}</span>
            {shortname}
        </>
    );
});

EmojiSuggestionEntry.displayName = 'EmojiSuggestionEntry';
