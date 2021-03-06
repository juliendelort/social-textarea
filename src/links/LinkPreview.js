import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { SocialTextAreaContext } from '../context';


const getDomain = url => {
    if (!url) {
        return '';
    }
    const urlWithHttp = url.indexOf('http://') === 0 || url.indexOf('https://') === 0 ? url : `http://${url}`;

    const a = document.createElement('a');
    a.href = urlWithHttp;
    return a.hostname;
};


const SingleLinkPreview = ({ siteName, image = '', title, description, loading = false }) => {

    return (
        <Card variant="outlined">
            <CardActionArea>
                {loading ? <Skeleton variant="rect" width="100%" height={140} /> : null}
                {!loading && image ? (
                    <CardMedia className='link-preview__media' image={image} title="Link preview" component="img" />
                ) : null}
                <CardContent>
                    <Typography variant="caption" display="block" gutterBottom>
                        {siteName}
                    </Typography>
                    <Typography variant="h6" component="h2" className='link-preview__title'>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" className='link-preview__description'>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export const LinkPreview = () => {
    const { currentLink, linkPreviewData, isLoadingLinkPreview } = React.useContext(SocialTextAreaContext);
    const currentLinkDomain = getDomain(currentLink);

    if (!currentLink) {
        return null;
    }

    if (linkPreviewData && !isLoadingLinkPreview) {
        // We have some link preview data
        const { siteName, title, description, images, favicons, url } = linkPreviewData;
        return (
            <SingleLinkPreview
                siteName={siteName}
                image={(images && images[0]) || (favicons && favicons[0])}
                title={title}
                description={description || currentLink}
            />
        );
    } else {
        // No link preview data, just use what we have
        return (
            <SingleLinkPreview
                loading={isLoadingLinkPreview}
                siteName={currentLinkDomain}
                title={currentLinkDomain}
                description={currentLink}
            />
        );
    }

};

