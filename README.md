Little project with ReactJS to manage a personal bookshelf.

## To Install and run

Clone the project and run 

```bash
npm install
npm start
```

with yarn
```bash
yarn install
yarn start
```

## Challenges
* Address all the backend errors in the front-end (I can't access backend code): duplicates, wrong model state. As requested I have established my Single Source Of Truth in the first books given in the bookshelf (BooksAPI.getAll()).
* Focus on composition vs inheritance

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results. 

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

