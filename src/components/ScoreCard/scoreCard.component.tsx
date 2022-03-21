import Item from 'components/Item';
import ScoreCardHeader from 'components/ScoreCardHeader';
import items from 'helpers/items';
import { useScoresContext } from 'hooks';
import React, { FC, useEffect, useState } from 'react';
import './scoreCard.styles.scss';

interface ScoreCardProps {
    id: string;
    sendScore: (playerId: string, rawScore: number, makiQty: number, puddingQty: number) => void;
}

const ScoreCard: FC<ScoreCardProps> = (props: ScoreCardProps) => {
    const { id, sendScore } = props;

    const [state] = useScoresContext();
    const { currentRound } = state;

    const [eggNigiriScore, setEggNigiriScore] = useState(0);
    const [salmonNigiriScore, setSalmonNigiriScore] = useState(0);
    const [squidNigiriScore, setSquidNigiriScore] = useState(0);
    const [dumplingScore, setDumplingScore] = useState(0);
    const [tempuraScore, setTempuraScore] = useState(0);
    const [sashimiScore, setSashimiScore] = useState(0);
    const [makiScore, setMakiScore] = useState(0);
    const [puddingScore, setPuddingScore] = useState(0);

    const [totalScore, setTotalScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const total =
            eggNigiriScore + salmonNigiriScore + squidNigiriScore + dumplingScore + tempuraScore + sashimiScore;
        setTotalScore(total);
    }, [eggNigiriScore, salmonNigiriScore, squidNigiriScore, dumplingScore, tempuraScore, sashimiScore]);

    useEffect(() => {
        resetScores();
    }, [currentRound]);

    // TODO: Enable reset
    const resetScores = () => {
        setEggNigiriScore(0);
        setSalmonNigiriScore(0);
        setSquidNigiriScore(0);
        setDumplingScore(0);
        setTempuraScore(0);
        setSashimiScore(0);
        setMakiScore(0);
        setPuddingScore(0);
        setTotalScore(0);
        setSubmitted(false);
    };

    const handleSendScore = () => {
        sendScore(id, totalScore, makiScore, puddingScore);
        setSubmitted(true);
    };

    return (
        <div className="score-container">
            <ScoreCardHeader id={id} sendScore={handleSendScore} submitted={submitted} totalScore={totalScore} />
            <div className="scorecard-items">
                <Item {...items.eggNigiri} score={eggNigiriScore} setScore={setEggNigiriScore} />
                <Item {...items.salmonNigiri} score={salmonNigiriScore} setScore={setSalmonNigiriScore} />
                <Item {...items.squidNigiri} score={squidNigiriScore} setScore={setSquidNigiriScore} />
                <Item {...items.dumpling} score={dumplingScore} setScore={setDumplingScore} />
                <Item {...items.tempura} score={tempuraScore} setScore={setTempuraScore} />
                <Item {...items.sashimi} score={sashimiScore} setScore={setSashimiScore} />
                <Item {...items.maki} score={makiScore} setScore={setMakiScore} />
                <Item {...items.pudding} score={puddingScore} setScore={setPuddingScore} />
            </div>
        </div>
    );
};

export default ScoreCard;
