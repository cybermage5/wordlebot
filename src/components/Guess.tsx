import { Box, Divider, Typography } from "@mui/material";
import { WordleRequestItem } from "../api/api";
import Word from "./Word";
import WordClue from "./WordClue";

const Guess = ({
    item,
    order,
    loading,
    handleSubmit,
}: {
    item: WordleRequestItem;
    order: number;
    loading?: boolean;
    handleSubmit?: (clue: string) => Promise<void>;
}) => {
    const { word, clue } = item;
    return (
        <Box display="flex" flexDirection="column" rowGap={2}>
            <Typography variant="h2">{`Guess #${order}`}</Typography>
            <Box display="flex" alignItems="center" columnGap={4}>
                <Typography variant="subtitle1">Word to Guess:</Typography>
                <Word item={{ ...item, clue: "" }} />
            </Box>
            <Typography variant="subtitle1">What response did you get back?</Typography>
            {clue ? (
                <Box display="flex" justifyContent="center">
                    <Word item={item} />
                </Box>
            ) : (
                <WordClue word={word} loading={loading} handleSubmit={handleSubmit} />
            )}
            <Divider sx={{ mt: 4 }} />
        </Box>
    );
};

export default Guess;
