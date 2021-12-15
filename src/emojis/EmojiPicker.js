import { Picker } from 'emoji-mart-virtualized';
import React from 'react';
import { SocialTextAreaContext } from '../context';
import Popover from '@mui/material/Popover';

export const EmojiPicker = ({ className }) => {
    const { value, triggerValueChange } = React.useContext(SocialTextAreaContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [arrowEl, setArrowEl] = React.useState(null);

    const handleClick = e => {
        e.persist();
        setAnchorEl(anchorEl => (anchorEl ? null : e.target));
    };

    const handleArrowRef = e => {
        setArrowEl(e);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelect = (emoji) => {
        triggerValueChange(
            (value?.rawValue ?? '') + emoji.native,
            (value?.plainText ?? '') + emoji.native,
            value.current?.mentions ?? []
        );
    };

    // type="button" to avoid submitting the form
    return (
        <>
            <button
                id="emoji-picker-button"
                type="button"
                className={`social-text-area__emoji-button ${className ?? ''}`}
                onClick={handleClick}
                aria-label="Pick an emoji"
            >
                <span role="img" aria-labelledby="emoji-picker-button">
                    🙂
                </span>
            </button>
            <Popover
                open={!!anchorEl}
                anchorEl={anchorEl}
                className="social-text-area__emoji-popper"
                onClose={handleClose}
                modifiers={{
                    flip: {
                        enabled: true,
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: 'scrollParent',
                    },
                    ...(!!arrowEl && {
                        arrow: {
                            enabled: !!arrowEl,
                            element: arrowEl,
                        },
                    }),
                }}
            >
                <div className="social-text-area__emoji-popper-arrow" ref={handleArrowRef}></div>
                <Picker
                    native={true}
                    emojiSize={20}
                    theme='light'
                    onSelect={handleSelect}
                    title=""
                    emoji=""
                />
            </Popover>
        </>
    );
};
