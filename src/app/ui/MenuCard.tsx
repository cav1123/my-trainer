import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Delete from "@mui/icons-material/Delete";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";

type MenuCardProps = {
  menu: {
    id: number | null;
    title: string;
    time: number;
    order: number;
    isValid: boolean;
    createAt: Date | null;
  };
  changeTitle: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  updateMenu: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  changeTime: (event: Event, value: number | number[]) => void;
  deleteMenu: React.MouseEventHandler<HTMLButtonElement>;
  changeIsValid: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  upOrder: React.MouseEventHandler<HTMLButtonElement>;
  downOrder: React.MouseEventHandler<HTMLButtonElement>;
  isPlay: boolean;
  length: number;
  filteredMenus: {
    id: number | null;
    title: string;
    time: number;
    order: number;
    isValid: boolean;
    createAt: Date | null;
  }[];
  indexPlaying: number;
};

export default function MenuCard({
  menu,
  changeTitle,
  updateMenu,
  changeTime,
  deleteMenu,
  changeIsValid,
  upOrder,
  downOrder,
  isPlay,
  length,
  filteredMenus,
  indexPlaying,
}: MenuCardProps) {
  const isPlayClass =
    (isPlay && menu.id == filteredMenus[indexPlaying - 1]?.id) ||
    (!isPlay && menu.id == filteredMenus[indexPlaying]?.id)
      ? "bg-blue-50"
      : "";
  const isNotValidClass = !menu.isValid ? "opacity-40" : "";

  return (
    <Card
      sx={{ minWidth: 280 }}
      className={`${isPlayClass} ${isNotValidClass}`}
    >
      <CardContent className="flex gap-4 pb-0 flex-col">
        <TextField
          id={String(menu.id)}
          label="メニュー"
          multiline
          maxRows={4}
          fullWidth
          value={menu.title}
          onChange={changeTitle}
          onBlur={updateMenu}
        />
        <Box sx={{ width: "100%" }}>
          <Slider
            aria-label="Time"
            value={menu.time}
            valueLabelDisplay="on"
            valueLabelFormat={(time) => `${time}秒`}
            shiftStep={30}
            step={10}
            marks
            min={10}
            max={90}
            onChange={changeTime}
            name={String(menu.id)}
          />
        </Box>
      </CardContent>
      <CardActions className="justify-end">
        <IconButton aria-label="up" onClick={upOrder} data-order={menu.order}>
          <ArrowDropUp className="pointer-events-none" />
        </IconButton>
        <IconButton
          aria-label="down"
          onClick={downOrder}
          data-order={menu.order}
        >
          <ArrowDropDown className="pointer-events-none" />
        </IconButton>
        <Switch
          checked={menu.isValid}
          onChange={changeIsValid}
          inputProps={{ "aria-label": "isValid" }}
          id={String(menu.id)}
        />
        <IconButton
          aria-label="delete"
          onClick={deleteMenu}
          data-id={menu.id}
          disabled={isPlay || length <= 1}
        >
          <Delete className="pointer-events-none" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
