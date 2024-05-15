# LMS Frontend

## Tailwind Configuration

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

add config in tailwind.config.js
"./index.html",
"./src/\*_/_.{js,ts,jsx,tsx}",

```

Add the following details in the plugin property of tailwind config
```
   plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
  ],
  
```



### Adding Plugings and dependencies

```

npm i @reduxjs/toolkit @tailwindcss/line-clamp axios chart.js daisyui react-chartjs-2 react-hot-toast react-icons react-redux react-router-dom

```

#### Configure auto import sort eslint 

1. Install simple import sort 
```
   npm i eslint-plugin-simple-import-sort
```

2. Add rule in `.eslint.cjs`
```
  'simple-import-sort/imports': 'error' ,
````

3. Add simple-import-sort plugin in `.eslint.cjs`
```
  plugins: [..., 'simple-import-sort'],
```

4. To enable auto import sort on file save in vscode 
  
   - Open `settings.json` 
   - Add the following config

```
   "editor.codeActionsOnsave" : {
      "source.fixAll.eslint": true
   }
```