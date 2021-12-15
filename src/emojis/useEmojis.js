import React from 'react';
import { Mention } from 'react-mentions';
// Using emoji-mart-virtualized which is a fork of emoji-mart but with a virtualized list
// https://github.com/missive/emoji-mart/issues/6#issuecomment-865706612
import { emojiIndex } from 'emoji-mart-virtualized';
import { EmojiSuggestionEntry } from './EmojiSuggestionEntry';

const neverMatchingRegex = /($a)/;

export const useEmojis = () => {
    const handleRenderSuggestion = (entry, _search, _highlightedDisplay, _index, _focused) => {
        return <EmojiSuggestionEntry {...entry} />;
    };

    const handleEmojiSearch = (name, callback) => {
        const found = emojiIndex.search(name); //.map((o) => o.native);

        const returned = (found || []).map(e => ({
            display: e.native,
            name: e.name,
            shortname: e.colons,
            unicode: e.unified,
            id: e.id,
        }));

        callback(returned);
    };

    const renderEmojiSuggestions = () => (
        <Mention
            trigger=":"
            markup="__display__"
            regex={neverMatchingRegex}
            renderSuggestion={handleRenderSuggestion}
            data={handleEmojiSearch}
            appendSpaceOnAdd
        />
    );

    return renderEmojiSuggestions;
};


