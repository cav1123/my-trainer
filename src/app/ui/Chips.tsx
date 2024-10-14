import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Schedule from "@mui/icons-material/Schedule";
import List from "@mui/icons-material/List";

type ChipsProps = {
  timeTotal: () => string;
  menusTotal: number;
};

export default function Chips({ timeTotal, menusTotal }: ChipsProps) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip icon={<List />} label={menusTotal} />
      <Chip icon={<Schedule />} label={timeTotal()} />
    </Stack>
  );
}
