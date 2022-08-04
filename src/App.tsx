import React from "react";
import { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/header/Header";
import { PUBLIC_ROUTES } from "./routes/routes";
import { IUser } from "./types/user";
import "./App.scss";

export const Context = createContext<[IUser[], Function]>([[], () => void 0]);

export const App = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  return (
    <Context.Provider value={[users, setUsers]}>
      <div className="app">
        <Header />
        <Routes>
          {PUBLIC_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </div>
    </Context.Provider>
  );
};
