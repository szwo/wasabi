import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AppBar, Button, IconButton, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import Item from 'components/Item';
import items from 'helpers/items';
import React, { FC, useEffect, useState } from 'react';
import './scorecard.styles.scss';

interface ScoreCardProps {
    id: string;
    updateScore: (id: string, newScore: number) => void;
}

interface ElevationScrollProps {
    children: React.ReactElement;
}

const ElevationScroll = (props: ElevationScrollProps) => {
    const { children } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
};

const ScoreCard: FC<ScoreCardProps> = (props: ScoreCardProps) => {
    const { id, updateScore } = props;

    const [eggNigiriScore, setEggNigiriScore] = useState(0);
    const [salmonNigiriScore, setSalmonNigiriScore] = useState(0);
    const [squidNigiriScore, setSquidNigiriScore] = useState(0);
    const [dumplingScore, setDumplingScore] = useState(0);
    const [tempuraScore, setTempuraScore] = useState(0);
    const [sashimiScore, setSashimiScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const total =
            eggNigiriScore + salmonNigiriScore + squidNigiriScore + dumplingScore + tempuraScore + sashimiScore;
        setTotalScore(total);
    }, [eggNigiriScore, salmonNigiriScore, squidNigiriScore, dumplingScore, tempuraScore, sashimiScore]);

    const sendScore = () => {
        updateScore(id, totalScore);
        setSubmitted(true);
    };

    return (
        <div className="score-container">
            <div className="scorecard-header">
                <ElevationScroll>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                {id}'s Score: {totalScore}
                            </Typography>
                            {submitted && (
                                <IconButton>
                                    <CheckCircleIcon sx={{ color: '#ffffff' }} />
                                </IconButton>
                            )}
                            <Button color="inherit" variant="outlined" onClick={() => sendScore()}>
                                Submit Scores
                            </Button>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
            </div>
            <div className="scorecard-items">
                <Item {...items.eggNigiri} score={eggNigiriScore} setScore={setEggNigiriScore} />
                <Item {...items.salmonNigiri} score={salmonNigiriScore} setScore={setSalmonNigiriScore} />
                <Item {...items.squidNigiri} score={squidNigiriScore} setScore={setSquidNigiriScore} />
                <Item {...items.dumpling} score={dumplingScore} setScore={setDumplingScore} />
                <Item {...items.tempura} score={tempuraScore} setScore={setTempuraScore} />
                <Item {...items.sashimi} score={sashimiScore} setScore={setSashimiScore} />
            </div>
        </div>
    );
};

export default ScoreCard;
