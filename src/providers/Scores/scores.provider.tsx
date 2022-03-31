import React, { createContext, FC, ReactElement, useEffect, useReducer } from 'react';
import ScoresReducer, { Actions } from './scores.reducer';

export type ScoresContextType = [ScoresState, (type: Actions) => void];
export const ScoresContext = createContext<ScoresContextType>({} as ScoresContextType);
const initialState = {
    players: {},
    currentRound: 0,
};

interface ProviderProps {
    children: ReactElement;
}

const ScoresProvider: FC<ProviderProps> = (props: ProviderProps) => {
    const [state, dispatch] = useReducer(ScoresReducer, initialState);

    useEffect(() => {
        console.log(state);
    }, [state]);

    return <ScoresContext.Provider value={[state, dispatch]}>{props.children}</ScoresContext.Provider>;
};

export default ScoresProvider;
