import React, { createContext, useReducer, ActionDispatch } from "react";

type Action = {
    type: "increase" | "decrease" | "set";
    payload: number;
};

type State = {
    value: number;
};

type SliderContextType = {
    state: State;
    dispatch: ActionDispatch<[action: Action]> | undefined;
};

export const SliderContext = createContext<SliderContextType>({
    state: { value: 1 },
    dispatch: undefined,
});

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "increase": {
            if (state.value === 5) return { ...state, value: 0 };
            return { ...state, value: state.value + action.payload };
        }
        case "decrease": {
            if (state.value === 0) return { ...state, value: 5 };
            return { ...state, value: state.value - action.payload };
        }
        case "set": {
            return { ...state, value: action.payload };
        }
        default:
            return state;
    }
}

export default function SlideStateProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { value: 0 });
    return <SliderContext.Provider value={{ state, dispatch }}>{children}</SliderContext.Provider>;
}
