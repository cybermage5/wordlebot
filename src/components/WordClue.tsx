import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import * as React from "react";
import Word from "./Word";
import CharacterBox from "./CharacterBox";
import { Clue } from "../util/types";
import { replaceCharacterAtIndex } from "../util/funcs";

const WordClue = ({
    word,
    handleSubmit,
    loading,
}: {
    word: string;
    handleSubmit?: (clue: string) => Promise<void>;
    loading?: boolean;
}) => {
    const [clue, setClue] = React.useState("xxxxx");

    const onSubmit = async () => {
        if (handleSubmit) {
            await handleSubmit(clue);
            setClue("xxxxx");
        }
    };

    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" alignItems="center" rowGap={1}>
                <Word item={{ word, clue }} />
                {[Clue.Match, Clue.NoMatchButExist, Clue.NoExist].map((item) => (
                    <Box display="flex" columnGap={2} key={`${item}-clue-selection`}>
                        {word.split("").map((_, index) => (
                            <CharacterBox
                                clue={item}
                                key={`${word}-${item}-${index}`}
                                handleClick={() =>
                                    setClue(replaceCharacterAtIndex(clue, index, item))
                                }
                            />
                        ))}
                    </Box>
                ))}
            </Box>
            <LoadingButton
                disabled={loading}
                loading={loading}
                variant="contained"
                sx={{ width: "fit-content", ml: "auto", mt: 2 }}
                onClick={onSubmit}
            >
                Submit
            </LoadingButton>
        </Box>
    );
};

export default WordClue;
