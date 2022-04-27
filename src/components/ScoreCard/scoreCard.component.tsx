import Item from 'components/Item';
import ScoreCardHeader from 'components/ScoreCardHeader';
import items from 'helpers/items';
import { useRound } from 'hooks';
import { IndividualRoundScore } from 'hooks/useScores';
import React, { FC, useEffect, useMemo, useState } from 'react';
import './scoreCard.styles.scss';

interface ScoreCardProps {
    playerId: string;
    sendScores: (scores: IndividualRoundScore) => void;
}

const ScoreCard: FC<ScoreCardProps> = (props: ScoreCardProps) => {
    const { playerId, sendScores } = props;

    const { currentRound } = useRound();

    const [eggNigiriScore, setEggNigiriScore] = useState(0);
    const [salmonNigiriScore, setSalmonNigiriScore] = useState(0);
    const [squidNigiriScore, setSquidNigiriScore] = useState(0);
    const [dumplingScore, setDumplingScore] = useState(0);
    const [tempuraScore, setTempuraScore] = useState(0);
    const [sashimiScore, setSashimiScore] = useState(0);
    const [makiScore, setMakiScore] = useState(0);
    const [puddingScore, setPuddingScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const total = useMemo(
        () => eggNigiriScore + salmonNigiriScore + squidNigiriScore + dumplingScore + tempuraScore + sashimiScore,
        [eggNigiriScore, salmonNigiriScore, squidNigiriScore, dumplingScore, tempuraScore, sashimiScore]
    );

    useEffect(() => {
        resetScores();
    }, [currentRound]);

    const resetScores = () => {
        setEggNigiriScore(0);
        setSalmonNigiriScore(0);
        setSquidNigiriScore(0);
        setDumplingScore(0);
        setTempuraScore(0);
        setSashimiScore(0);
        setMakiScore(0);
        setPuddingScore(0);
        setSubmitted(false);
    };

    const handleSendScore = () => {
        const individualRoundScore: IndividualRoundScore = {
            playerId,
            rawScore: total,
            makiQty: makiScore,
            puddingQty: puddingScore,
        };
        sendScores(individualRoundScore);
        setSubmitted(true);
    };

    return (
        <div className="score-container">
            <ScoreCardHeader id={playerId} sendScore={handleSendScore} submitted={submitted} totalScore={total} />
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
