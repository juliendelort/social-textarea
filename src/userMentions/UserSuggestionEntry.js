import Avatar from '@material-ui/core/Avatar';
import React from 'react';

export const UserSuggestionEntry = React.memo(({ name, image }) => {
    return (
        <>
            <Avatar alt={name} src={image} />
            <span>{name}</span>
        </>
    );
});

UserSuggestionEntry.displayName = 'UserSuggestionEntry';
