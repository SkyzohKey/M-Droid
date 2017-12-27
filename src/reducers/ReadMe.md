# `src/reducers`

This folder contains the reducers consumed by the Redux store. It also contains a single `.js` file (`index.js`) which does export an unique function `getRootReducer`. This function return the global reducer made using `combineReducers`.

The reducers are then separated in folders following this style:

```php
src/reducers
├── users # This folder name is the reducer name.
│   ├── actions.js # All the reducer's actions.
│   ├── index.js # The reducer is located here.
│   ├── selectors.js # The selectors for the reducer.
│   └── types.js # Types constants for the actions.
├── categories
│   ├── actions.js
│   ├── index.js
│   └── types.js
```
