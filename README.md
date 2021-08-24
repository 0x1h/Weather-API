# Weather-API

Weather website which has more than 200,000 cities data, API used from [openweathermap](https://openweathermap.org/api)

website uses **[Axios](https://github.com/axios/axios)** library for HTTP Requests 
## Configuration 

Install **Webpack** for Axios library to make readable Typescript and also create `webpack.config.js` file and config it on your own

```js
npm install webpack webpack-cli ts-loader -D
```

```js
npm install Typescript -D 
```
Configuration of `webpack.config.js`

```js
const path = require('path');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

for more details you can visit [Webpack Server Configuration](https://webpack.js.org/configuration/dev-server/) and [Webpack for Typescript](https://webpack.js.org/guides/typescript/)

## Languages Used

* **HTML**
* **SCSS**
* **Typescript / Axios Library**
