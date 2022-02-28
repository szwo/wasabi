import Item from 'components/Item';
import ScoreCardHeader from 'components/ScoreCardHeader';
import items from 'helpers/items';
import { useRoundScore } from 'hooks';
import React, { FC } from 'react';
import './scoreCard.styles.scss';

interface ScoreCardProps {
    id: string;
    sendScore: (playerId: string, rawScore: number, makiQty: number, puddingQty: number) => void;
}

const ScoreCard: FC<ScoreCardProps> = (props: ScoreCardProps) => {
    const { id, sendScore } = props;
    const {
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
        puddingScore,
        setPuddingScore,
        totalScore,
        submitted,
        setSubmitted,
    } = useRoundScore();

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
