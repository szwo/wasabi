import Item from 'components/Item';
import ScoreCardHeader from 'components/ScoreCardHeader';
import { ScoreType } from 'helpers/enums';
import items from 'helpers/items';
import { useScore } from 'hooks';
import React, { FC } from 'react';
import './scoreCard.styles.scss';

interface ScoreCardProps {
    id: string;
    updateScore: (type: ScoreType, id: string, newScore: number) => void;
}

const ScoreCard: FC<ScoreCardProps> = (props: ScoreCardProps) => {
    const { id, updateScore } = props;
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
        totalScore,
        submitted,
        setSubmitted,
    } = useScore();

    return (
        <div className="score-container">
            <ScoreCardHeader
                id={id}
                totalScore={totalScore}
                makiScore={makiScore}
                updateScore={updateScore}
                submitted={submitted}
                setSubmitted={setSubmitted}
            />
            <div className="scorecard-items">
                <Item {...items.eggNigiri} score={eggNigiriScore} setScore={setEggNigiriScore} />
                <Item {...items.salmonNigiri} score={salmonNigiriScore} setScore={setSalmonNigiriScore} />
                <Item {...items.squidNigiri} score={squidNigiriScore} setScore={setSquidNigiriScore} />
                <Item {...items.dumpling} score={dumplingScore} setScore={setDumplingScore} />
                <Item {...items.tempura} score={tempuraScore} setScore={setTempuraScore} />
                <Item {...items.sashimi} score={sashimiScore} setScore={setSashimiScore} />
                <Item {...items.maki} score={makiScore} setScore={setMakiScore} />
            </div>
        </div>
    );
};

export default ScoreCard;
