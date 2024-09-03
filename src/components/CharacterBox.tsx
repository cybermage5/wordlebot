import { Box, Typography } from "@mui/material";
import * as React from "react";
import { Clue } from "../util/types";

const CharacterBox = ({
    ch,
    clue = Clue.NoExist,
    handleClick,
}: {
    ch?: string;
    clue?: Clue;
    handleClick?: () => void;
}) => {
    const backgroundColor = React.useMemo(() => {
        if (clue === "x") {
            return "transparent";
        } else if (clue === "y") {
            return "yellow";
        } else {
            return "#49c649";
        }
    }, [clue]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={64}
            height={64}
            sx={{
                border: "1px solid grey",
                backgroundColor,
                cursor: handleClick ? "pointer" : "initial",
            }}
            onClick={handleClick}
        >
            {ch && <Typography variant="body1">{ch.toUpperCase()}</Typography>}
        </Box>
    );
};

export default CharacterBox;
