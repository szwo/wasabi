import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { FC } from 'react';
import ElevationScroll from './elevationScroll.component';
interface ScoreCardHeaderProps {
    id: string;
    sendScore: () => void;
    submitted: boolean;
    totalScore: number;
}

const ScoreCardHeader: FC<ScoreCardHeaderProps> = (props: ScoreCardHeaderProps) => {
    const { id, totalScore, submitted, sendScore } = props;

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
                        <Button color="inherit" variant="outlined" onClick={sendScore} disabled={submitted}>
                            Submit Scores
                        </Button>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </div>
    );
};

export default ScoreCardHeader;
