import React from 'react';
import debounce from 'lodash/debounce';
import { Mention } from 'react-mentions';


export const useLinks = (initialValue, onFetchLinkPreview) => {
    const [currentLinkForPreview, setCurrentLinkForPreview] = React.useState(() => {
        // If there are links in the initial value, use the last one.
        const links = matchAll(initialValue?.plainText || '', linkRegex);
        if (links.length) {
            return links[links.length - 1];
        }

        return '';
    });

    const [isLoadingLinkPreview, setIsLoadingLinkPreview] = React.useState(false);
    const [linkPreviewData, setLinkPreviewData] = React.useState(null);

    const fetchLinkPreviewDebounced = React.useMemo(() => onFetchLinkPreview ? debounce(async (url) => {
        setIsLoadingLinkPreview(true);
        try {
            setLinkPreviewData(await onFetchLinkPreview(url));
        } finally {
            setIsLoadingLinkPreview(false);
        }
    }, 500) : null, [onFetchLinkPreview]);

    // When currentLink changes, fetch preview (debounced)
    React.useEffect(() => {
        if (!currentLinkForPreview || !fetchLinkPreviewDebounced) {
            return;
        }
        fetchLinkPreviewDebounced(currentLinkForPreview);
    }, [currentLinkForPreview, fetchLinkPreviewDebounced]);

    // Takes all the links current in the value and only keeps the last one for preview
    const setLinks = (links) => {
        // Only take the last link
        const lastLink = links[links.length - 1];
        setCurrentLinkForPreview(lastLink);
    };

    // react-mention's MentionInput needs to have this as direct child
    const renderLinkMention = () => (
        <Mention trigger="" markup="__display__" regex={delimitersRegex} data={[]} className='social-text-area__link' />
    );

    // Look for links in the new value
    // If a link has been removed, check if we can just un-highlight it
    const getNewValueWithLinks = (currentValue, newValue) => {
        // Remove the links delimiters "something #url#" => "something url"
        const newValueWithoutLinkDelimiters = newValue.replaceAll(delimitersRegexGlobal, '$1');

        // Look for actual urls in the new plain text value and store them
        setLinks(matchAll(newValueWithoutLinkDelimiters, linkRegex));

        // Find links that are no longer there, by looking at the delimiters #link#
        const prevLinks = matchAll(currentValue, delimitersRegexGlobal);
        const currentLinks = matchAll(newValue, delimitersRegexGlobal);


        // Convert current links to an object (map) for faster lookup. The value of the field doesn't matter (we use true)
        const currentLinksByUrl = currentLinks.reduce((result, url) => ({ ...result, [url]: true }), {});

        // Find links that are in prevLinks but not in currentLinks
        const removedLinks = prevLinks.reduce((result, url) => currentLinksByUrl[url] ? result : [...result, url], []);

        // When only one link has been removed (and we're not erasing the entire value), just un-hihglight it
        if (newValue !== '' && removedLinks.length === 1) {
            return currentValue.replace(`#${removedLinks[0]}#`, removedLinks[0]);
        } else {
            // Hightlight all the links (= insert the delimiters #link#)
            // $2 = space or \n that was matched (insert the trailing space after the delimiter)
            return newValueWithoutLinkDelimiters.replaceAll(linkRegex, '#$1#$2');
        }

    };

    return {
        currentLink: currentLinkForPreview,
        linkPreviewData,
        isLoadingLinkPreview,
        renderLinkMention,
        getNewValueWithLinks
    };
};


// Includes a space or \n at the end
const linkRegex = /\b(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})(\n|\s)/g;

const delimitersRegex = /#(?<display>.+?)#/;
const delimitersRegexGlobal = /#(?<display>.+?)#/g;

const matchAll = (str, regex) => {
    let match = regex.exec(str);
    const result = [];
    while (match) {
        result.push(match[1]);
        match = regex.exec(str);
    }
    return result;
};
