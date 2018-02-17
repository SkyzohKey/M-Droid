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

# Reducers

This is a list of the defined reducers. Each reducer needs to be tested, and spec to be written before starting to code anything. Enjoy Jest!

* **Repositories**: (_This reducer is persisted._)  
  Do handle repositories managment business logic. Stores only repositories meta data. Applications lives on their own reducer.
* **Categories**: (_This reducer is persisted._)  
  Do hold an array of categories, extracted from the applications that were fetch, allows to get new categories as they are added to apps.
* **Applications**: (_This reducer is persisted._)  
  Do handle applications managment business logic. Stores only applications meta data. Packages lives on their own reducer.
* **Packages**: (_This reducer is persisted._)  
  Do handle applications packages managment business logic.
* **Downloads**: (_This reducer is persisted._)  
  Do hold a list of active/paused/failed downloads. With ability to pause/resume/cancel/retry a download.
* **Updates**:  
  Do handle applications updates, check if installed app is older than fetched one from the repositories. Not only on repositories sync, but also at a user defined interval.
