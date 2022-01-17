import Item from 'components/Item';
import items from 'helpers/items';
import React, { FC, useEffect, useState } from 'react';
import './scorecard.styles.scss';

const ScoreCard: FC = () => {
    const [eggNigiriScore, setEggNigiriScore] = useState(0);
    const [salmonNigiriScore, setSalmonNigiriScore] = useState(0);
    const [squidNigiriScore, setSquidNigiriScore] = useState(0);
    const [dumplingScore, setDumplingScore] = useState(0);
    const [tempuraScore, setTempuraScore] = useState(0);
    const [sashimiScore, setSashimiScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        const total =
            eggNigiriScore + salmonNigiriScore + squidNigiriScore + dumplingScore + tempuraScore + sashimiScore;
        setTotalScore(total);
    }, [eggNigiriScore, salmonNigiriScore, squidNigiriScore, dumplingScore, tempuraScore, sashimiScore]);

    return (
        <>
            <div className="pinned">Total Score: {totalScore}</div>
            <Item {...items.eggNigiri} score={eggNigiriScore} setScore={setEggNigiriScore} />
            <Item {...items.salmonNigiri} score={salmonNigiriScore} setScore={setSalmonNigiriScore} />
            <Item {...items.squidNigiri} score={squidNigiriScore} setScore={setSquidNigiriScore} />
            <Item {...items.dumpling} score={dumplingScore} setScore={setDumplingScore} />
            <Item {...items.tempura} score={tempuraScore} setScore={setTempuraScore} />
            <Item {...items.sashimi} score={sashimiScore} setScore={setSashimiScore} />
        </>
    );
};

export default ScoreCard;
