import React, { createContext } from "react";

export interface State {
  favourites: any;

}

export interface Action {
  type: string;
  payload: any;
}

export const StateContext = createContext<State | null>(null);
export const DispatchContext = createContext<React.Dispatch<Action> | null>(
  null
);