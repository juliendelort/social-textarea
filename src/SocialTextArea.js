import React from 'react';
import { useUserMentions } from './userMentions/useUserMentions';
import { useEmojis } from './emojis/useEmojis';
import { MentionsInput } from 'react-mentions';
import { useLinks } from './links/useLinks';
import { SocialTextAreaContext } from './context';
import { EmojiPicker } from './emojis/EmojiPicker';
import { LinkPreview } from './links/LinkPreview';

fas;


const SocialTextArea = ({ children, value, onValueChange, className = '', placeholder = '', onFetchLinkPreview = null, onSearchUsers }) => {

    const currentValue = React.useRef(value);
    currentValue.current = value?.rawValue || '';

    const { currentLink, linkPreviewData, isLoadingLinkPreview, getNewValueWithLinks, renderLinkMention } = useLinks(value, onFetchLinkPreview);
    const renderUserMentions = useUserMentions(onSearchUsers);
    const renderEmojiSuggestions = useEmojis();

    const contextValue = React.useMemo(() => ({
        value,
        triggerValueChange: (newValue, newPlainTextValue, mentions) => {
            onValueChange({
                rawValue: newValue,
                plainText: newPlainTextValue,
                mentions: mentions,
            });
        },
        currentLink,
        linkPreviewData,
        isLoadingLinkPreview
    }), [value, onValueChange, currentLink, linkPreviewData, isLoadingLinkPreview]);



    const handleChange = (event, newValue, newPlainTextValue, mentions) => {
        const newValueWithLinks = getNewValueWithLinks(currentValue.current, newValue);
        contextValue.triggerValueChange(newValueWithLinks, newPlainTextValue, mentions);
    };

    return <SocialTextAreaContext.Provider value={contextValue}>
        <div className={`social-text-area ${className ?? ''}`}>
            <div className='editor'>
                <MentionsInput
                    value={value?.rawValue ?? ''}
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

export default SocialTextArea;
