import React, { createContext, FC, ReactElement, useState } from 'react';

export type RoundContextType = {
    currentRound: number;
    advanceRound: () => void;
};
export const RoundContext = createContext<RoundContextType | undefined>(undefined);

interface ProviderProps {
    children: ReactElement;
}

const RoundProvider: FC<ProviderProps> = (props: ProviderProps) => {
    const { children } = props;
    const [currentRound, setCurrentRound] = useState(0);

    const advanceRound = () => {
        setCurrentRound(currentRound + 1);
    };

    return <RoundContext.Provider value={{ currentRound, advanceRound }}>{children}</RoundContext.Provider>;
};

export default RoundProvider;
