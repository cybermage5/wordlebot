import { Box, CircularProgress, Typography } from "@mui/material";
import * as React from "react";
import { WordleRequest, fetchWordleResult } from "../api/api";
import Guess from "./Guess";

const Game = () => {
    const [request, setRequest] = React.useState<WordleRequest>([]);
    const [currentWord, setCurrentWord] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const fetchGuessWord = async (req: WordleRequest) => {
        try {
            setLoading(true);
            setErrorMessage("");
            const result = await fetchWordleResult(req);
            setCurrentWord(result.guess);
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        try {
            fetchGuessWord([]);
        } catch (err) {
            setErrorMessage(err as string);
        }
    }, []);

    const handleSubmit = async (clue: string) => {
        try {
            const newRequest = [
                ...request,
                {
                    word: currentWord,
                    clue,
                },
            ];
            if (clue === "ggggg") {
                setRequest(newRequest);
                setErrorMessage("");
                setSuccess(true);
                return;
            }
            await fetchGuessWord(newRequest);
            setRequest(newRequest);
        } catch (err) {
            setErrorMessage(err as string);
        }
    };

    if (loading && !currentWord) {
        return (
            <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" rowGap={4} my={4}>
            {request.map((item, index) => (
                <Guess item={item} key={item.word} order={index + 1} />
            ))}
            {currentWord && request.length < 6 && !success && (
                <Guess
                    item={{ word: currentWord, clue: "" }}
                    order={request.length + 1}
                    loading={loading}
                    handleSubmit={handleSubmit}
                />
            )}
            {success && <Typography variant="h2">Yay! All Done</Typography>}
            {errorMessage && (
                <Typography variant="body1" sx={{ color: "red" }}>
                    {`${errorMessage}`}
                </Typography>
            )}
        </Box>
    );
};

export default Game;
