import { useEffect, useState } from 'react';

const useScore = () => {
    const [eggNigiriScore, setEggNigiriScore] = useState(0);
    const [salmonNigiriScore, setSalmonNigiriScore] = useState(0);
    const [squidNigiriScore, setSquidNigiriScore] = useState(0);
    const [dumplingScore, setDumplingScore] = useState(0);
    const [tempuraScore, setTempuraScore] = useState(0);
    const [sashimiScore, setSashimiScore] = useState(0);
    const [makiScore, setMakiScore] = useState(0);

    const [totalScore, setTotalScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const total =
            eggNigiriScore + salmonNigiriScore + squidNigiriScore + dumplingScore + tempuraScore + sashimiScore;
        setTotalScore(total);
    }, [eggNigiriScore, salmonNigiriScore, squidNigiriScore, dumplingScore, tempuraScore, sashimiScore]);

    return {
        eggNigiriScore,
        setEggNigiriScore,
        salmonNigiriScore,
        setSalmonNigiriScore,
        squidNigiriScore,
        setSquidNigiriScore,
        dumplingScore,
        setDumplingScore,
        tempuraScore,
        setTempuraScore,
        sashimiScore,
        setSashimiScore,
        makiScore,
        setMakiScore,
        totalScore,
        setTotalScore,
        submitted,
        setSubmitted,
    };
};

export default useScore;
