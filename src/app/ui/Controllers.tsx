import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Stop from "@mui/icons-material/Stop";

type ControllersProps = {
  start: React.MouseEventHandler<HTMLButtonElement>;
  stop: React.MouseEventHandler<HTMLButtonElement>;
  isPlay: boolean;
};

export default function Controllers({ start, stop, isPlay }: ControllersProps) {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="Basic button group"
      sx={{ width: "100%" }}
    >
      <Button
        variant="contained"
        size="large"
        startIcon={<PlayArrow />}
        onClick={start}
        disabled={isPlay}
        fullWidth
      >
        スタート
      </Button>
      <Button
        variant="contained"
        size="large"
        startIcon={<Stop />}
        onClick={stop}
        disabled={!isPlay}
        fullWidth
      >
        ストップ
      </Button>
    </ButtonGroup>
  );
}
