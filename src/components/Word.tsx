import { Box } from "@mui/material";
import { WordleRequestItem } from "../api/api";
import CharacterBox from "./CharacterBox";
import { Clue } from "../util/types";

const Word = ({ item }: { item: WordleRequestItem }) => {
    const { word, clue } = item;

    return (
        <Box display="flex" columnGap={2}>
            {word.split("").map((ch, index) => (
                <CharacterBox
                    ch={ch}
                    clue={clue[index] as Clue}
                    key={`${word}-character-${index}`}
                />
            ))}
        </Box>
    );
};

export default Word;
