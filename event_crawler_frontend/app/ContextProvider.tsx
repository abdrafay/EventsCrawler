"use client";
import { ReactNode, useReducer } from "react";
import { StateContext, DispatchContext, State, Action } from "./Context";

const initialState: State = {
  favourites: null,
  
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FAVOURITES":
      return {
        ...state,
        favourites: action.payload,
      };
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default ContextProvider;