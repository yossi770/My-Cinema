import React, { createContext, useState, FC } from "react";

export type AppContextState = {
  MoviesWatched: Array<any>;
  setMoviesWatched: (array: any) => void;
  Favorites: Array<any>;
  setFavorites: (array: any) => void;
  location: number;
  setLocation: (newLocation: number) => void;
};

const contextDefaultValues: AppContextState = {
  MoviesWatched: [],
  setMoviesWatched: () => { },
  Favorites: [],
  setFavorites: () => { },
  location: 0,
  setLocation: (number) => number
};

export const AppContext = createContext<AppContextState>(
  contextDefaultValues
);

const AppContextProvider: FC = ({ children }) => {
  const [MoviesWatched, moviesWatchedSet] = useState<object[]>(contextDefaultValues.MoviesWatched);
  const setMoviesWatched = (array: any) => moviesWatchedSet(array);
  const [Favorites, favoritesSet] = useState<object[]>(contextDefaultValues.Favorites);
  const setFavorites = (array: any) => favoritesSet(array);
  const [location, LocationSet] = useState<number>(contextDefaultValues.location);
  const setLocation = (newLocation: number) => LocationSet(newLocation);

  return (
    <AppContext.Provider
      value={{
        MoviesWatched,
        setMoviesWatched,
        Favorites,
        setFavorites,
        location,
        setLocation
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;