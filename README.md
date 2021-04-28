# Project Start

The project isn't directly based on or forked off of initial repo. I had preconfigured React-MobX-Typescript environment and used it. The json database was included as a file to the root of the app.

-   `npm i` - install dependencies
-   `npm start` - starts both server and client (when tested on a Windows machine this command started only server, so client had to be started separately)
-   `npm run start-client` - starts client separately
-   `npm run start-server` - starts server separately

# Project Description

## Functionality

On top of default functionality the following features are implemented:

-   Search
-   Pagination
-   Loading indicator

## Architecture

The project is React/Typescript and implements MVVM architecture based on MobX. Here is a presentation I did on React Denver meetup last summer which describes and idea of how view models and MobX play together with this approach:

-   https://www.youtube.com/watch?v=BKl2r-XVfIU&t=480s - video
-   https://github.com/Geckoff/react_mobx_mvvm - GitHub repo

With this approach all business logic is encapsulated in the view models which are not closely coupled with particular implementation of React components. If there is a need, the components can be swapped out with React Native ones or even with some another JS framework, but the view models can be reused.

There is some logic placed into the components. This logic is one that relies on specifically React implementation. For example, navigation between pages and pagination that is based on browser links and React packages that help to handle that.

## Store

For the store the approach of caching results was chosen. Individual movie models are cached as `items` in the `MovieStore`. Search results that have been done on the website, pagination pages movies, genre moves, top movies, etc. are cached as well, but the cache stores just the ids that refer to `items` map in the `MovieStore`. This allows to avoid models duplication.

This approach allows to avoid extra api calls, but has some downsides. Synchronization of data with the server could be a potential issue. The size of the cached data as well. Since the app is test, here it works fine. Overall picking this or another approach needs the prior analysis of the data we’re working with, of the frequency of data changes, etc.

One of the things that could be done differently - storing of cached ids could potentially have been done not in the store, but in the view models those ids belong to. I, however, wanted to process all side effects inside of the loaders and that’s why placed them in the store.
