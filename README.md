
# social-textarea

A "social" React textarea that supports user mentions, emojis and url previews.

Built on top of [react-mentions](https://github.com/signavio/react-mentions) and [emoji-mart](https://github.com/missive/emoji-mart) (a [virtualized fork](https://www.npmjs.com/package/emoji-mart-virtualized)).


## Authors

- [@juliendelort](https://github.com/juliendelort)

  
## Installation

```bash
  npm install social-textarea
```
    
## Usage/Examples

Import the main component and the styles on your pabe

```js
import { SocialTextArea } from 'social-textarea';
import 'social-textarea/dist/SocialTextArea.css';
````

### Basic usage
```jsx
 <SocialTextArea placeholder="Type ':' followed by a character to see emojis"/>
```

### Emoji picker and link previews:
```jsx
<SocialTextArea placeholder="Type ':' followed by a character to see emojis" >
    <SocialTextArea.EmojiPicker />
    <SocialTextArea.LinkPreview />
</SocialTextArea>
```

### User mentions:
```jsx
export default function App() {
  // This function can be async
  const handleSearchUsers = (name) => {
    // This can be an ajax call, as long as it returns an array of object {id, name, image}
    return ALL_USERS.filter(({ name }) => name.indexOf(name) >= 0);
  };
  return (
    <div className="App">
      <SocialTextArea 
        onSearchUsers={handleSearchUsers}
        placeholder="Type ':' for emojis, '@' for mentions"
       >
        <SocialTextArea.EmojiPicker />
        <SocialTextArea.LinkPreview />
      </SocialTextArea>
    </div>
  );
}

const ALL_USERS = [
  {
    id: "1",
    name: "Matthew Russell",
    image: "https://twitter.com/mrussell247"
  },
  {
    id: "2",
    name: "Julian Krispel-Samsel",
    image: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400"
  },
  {
    id: "3",
    name: "Jyoti Puri",
    image: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400"
  },
  {
    id: "4",
    name: "Max Stoiber",
    image: "https://avatars0.githubusercontent.com/u/7525670?s=200&v=4"
  },
  {
    id: "5",
    name: "Nik Graf",
    image: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400"
  },
  {
    id: "6",
    name: "Pascal Brandt",
    image:
      "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png"
  }
];

```

### Better link previews
It is possible to use a tool like [link-preview-js](https://github.com/ospfranco/link-preview-js) to generate better link previews.
For CORS reasons, link-preview-js has to be used in the backend, through an API call.

```jsx
export default function App() {

  const handleFetchLinkPreview = React.useCallback(async (url) => {
    // Fetch data and return { siteName, title, description, images, favicons, url }
  }, []);


  return (
    <>
      <SocialTextArea onFetchLinkPreview={handleFetchLinkPreview}>
        <SocialTextArea.EmojiPicker />
        <SocialTextArea.LinkPreview />
      </SocialTextArea>
    </>
  );
}
```

Example backend handler using [link-preview-js](https://github.com/ospfranco/link-preview-js):
```js
return await getLinkPreview(url, {
    headers: {
        "user-agent": "googlebot", // fetches with googlebot crawler user agent
    },
    timeout: 3000
});
```

### Styling
Styles are imported from [SocialTextArea.css](https://github.com/juliendelort/social-textarea/blob/npm/src/SocialTextArea.css) and can be overriden.
