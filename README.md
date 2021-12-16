
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

### [See demo on Stackblitz!](https://stackblitz.com/edit/demo-social-textarea?embed=1&file=src/style.css)

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
Styles are imported from [SocialTextArea.css](https://github.com/juliendelort/social-textarea/blob/main/src/SocialTextArea.css) and can be overriden.
Example:
```css
/* Changing the mention highlight color */
.social-text-area .social-text-area__mention {
  background: tomato;
}

/* Changing fontsize of user suggestion items */ 
.social-text-area .mentionInputRoot .mentionInputRoot__suggestions__item {
  font-size: 14px;
}
```

### Controlled vs uncontrolled

#### Controlled
```jsx
const [value, setValue] = React.useState();
return (
    <>
        <SocialTextArea value={value} onValueChange={(value)=>setValue(value)}>
            <SocialTextArea.EmojiPicker />
            <SocialTextArea.LinkPreview />
        </SocialTextArea>
    </>
);
```

#### Uncontrolled

```jsx    
<SocialTextArea onValueChange={(value)=>console.log(value)}>
    <SocialTextArea.EmojiPicker />
    <SocialTextArea.LinkPreview />
</SocialTextArea>
    
```
## Props

All props are optional.

- `value` (`object`): For using the component in "controlled" mode. Fields: 
    - `rawValue` (`string`): value containing all the internal delimiters. 
    - `plainText` (`string`): plain text value
    - `mentions` (`object`): information about the highlighted user mentions

    Example of `value` object:
    ```js
    {
        rawValue: "Hi [[1|Matthew Russell]], check this out #http://facebook.com# ",
        plainText: "Hi Matthew Russell, check this out http://facebook.com ",
        mentions: [
            {
                id: "1",
                display: "Matthew Russell",
                childIndex: 0,
                index: 3,
                plainTextIndex: 3
            }
        ]
    }
    ```
- `defaultValue` (`object`): Same as above, but for "uncontrolled" mode. The value to use when the component is initialized.
-  `onValueChange` (`function(value)`): Called when the value in the component changes. The `value` object is passed as parameter.
- `className` (`string`): The component root class name.
- `placeholder` (`string`): Placeholder for the textarea
- `onFetchLinkPreview` (`function(url)`): Called when the previewed url changes. Can be used to retrieve additional information using a library like [link-preview-js](https://github.com/ospfranco/link-preview-js). See [Better link previews](#Better-link-previews).
- `onSearchUsers` (`function(name)`): Called to retrieved the user suggestions. If a user types "@Br" in the component, this function will be called with "br" as parameter. See [User mentions](#User-mentions).


  