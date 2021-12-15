import React from 'react';
import { Mention } from 'react-mentions';
import { UserSuggestionEntry } from './UserSuggestionEntry';


export const useUserMentions = (onSearchUsers) => {

    const handleSearchUsers = async (name, callback) => {
        if (!onSearchUsers) {
            callback([]);
            return;
        }
        const result = await onSearchUsers(name);

        callback(result?.map(user => ({
            id: user.id ?? user.name,
            name: user.name,
            image: user.image,
            display: user.name,
        }) ?? []));
    };

    const handleRenderSuggestion = (entry, _search, _highlightedDisplay, _index, _focused) => (
        <UserSuggestionEntry {...entry} />
    );

    const renderUserMentions = () => (
        <Mention
            trigger="@"
            markup="[[__id__|__display__]]"
            data={handleSearchUsers}
            className='social-text-area__mention'
            renderSuggestion={handleRenderSuggestion}
            appendSpaceOnAdd
            allowSpaceInQuery
        />
    );

    return renderUserMentions;
};
