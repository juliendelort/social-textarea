import React from 'react';
import { useUserMentions } from './userMentions/useUserMentions';
import { useEmojis } from './emojis/useEmojis';
import { MentionsInput } from 'react-mentions';
import { useLinks } from './links/useLinks';
import { SocialTextAreaContext } from './context';
import { EmojiPicker } from './emojis/EmojiPicker';
import { LinkPreview } from './links/LinkPreview';

export const SocialTextArea = ({ children, value: valueProp = null, defaultValue, onValueChange, className = '', placeholder = '', onFetchLinkPreview = null, onSearchUsers }) => {
    // If uncontrolled
    const [currentValue, setCurrentValue] = React.useState(defaultValue);

    const previousValue = React.useRef(valueProp);
    previousValue.current = valueProp?.rawValue || '';

    const { currentLink, linkPreviewData, isLoadingLinkPreview, getNewValueWithLinks, renderLinkMention } = useLinks(valueProp, onFetchLinkPreview);
    const renderUserMentions = useUserMentions(onSearchUsers);
    const renderEmojiSuggestions = useEmojis();

    const contextValue = React.useMemo(() => ({
        value: valueProp ?? currentValue,
        triggerValueChange: (newRawValue, newPlainTextValue, mentions) => {

            const newValue = {
                rawValue: newRawValue,
                plainText: newPlainTextValue,
                mentions: mentions,
            };
            onValueChange(newValue);
            if (valueProp === null) {
                // uncontrolled : update state
                setCurrentValue(newValue);
            }
        },
        currentLink,
        linkPreviewData,
        isLoadingLinkPreview
    }), [valueProp, onValueChange, currentLink, linkPreviewData, isLoadingLinkPreview]);



    const handleChange = (event, newValue, newPlainTextValue, mentions) => {
        const newValueWithLinks = getNewValueWithLinks(previousValue.current, newValue);
        contextValue.triggerValueChange(newValueWithLinks, newPlainTextValue, mentions);
    };

    return <SocialTextAreaContext.Provider value={contextValue}>
        <div className={`social-text-area ${className ?? ''}`}>
            <div className='editor'>
                <MentionsInput
                    value={valueProp?.rawValue ?? currentValue?.rawValue ?? ''}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className='mentionInputRoot'
                >
                    {renderUserMentions()}
                    {renderEmojiSuggestions()}
                    {renderLinkMention()}
                </MentionsInput>
            </div>
            {children}
        </div >
    </SocialTextAreaContext.Provider>;
};

SocialTextArea.EmojiPicker = EmojiPicker;
SocialTextArea.LinkPreview = LinkPreview;
