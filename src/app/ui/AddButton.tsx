import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

type AddButtonProps = {
  addMenu: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AddButton({ addMenu }: AddButtonProps) {
  return (
    <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={addMenu}
        fullWidth
      >
        追加
      </Button>
    </Stack>
  );
}
