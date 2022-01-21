import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { ScoreType } from 'helpers/enums';
import React, { FC } from 'react';
import ElevationScroll from './elevationScroll.component';

interface ScoreCardHeaderProps {
    id: string;
    totalScore: number;
    makiScore: number;
    updateScore: (type: ScoreType, id: string, newScore: number) => void;
    submitted: boolean;
    setSubmitted: (submitted: boolean) => void;
}

const ScoreCardHeader: FC<ScoreCardHeaderProps> = (props: ScoreCardHeaderProps) => {
    const { id, totalScore, makiScore, submitted, updateScore, setSubmitted } = props;

    const sendScore = () => {
        updateScore(ScoreType.SCORE, id, totalScore);
        updateScore(ScoreType.MAKI, id, makiScore);
        setSubmitted(true);
    };

    return (
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
    );
};

export default ScoreCardHeader;
