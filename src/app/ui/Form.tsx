"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import useSound from "use-sound";
import Countdown from "../../public/Countdown01-1.mp3";
import Controllers from "./Controllers";
import Chips from "./Chips";
import MenuCard from "./MenuCard";
import AddButton from "./AddButton";
import {
  prismaUpdateMenu,
  prismaDeleteMenu,
  prismaCreateMenu,
} from "../lib/prisma";

type FormProps = {
  prismaMenus: {
    id: number | null;
    title: string;
    time: number;
    order: number;
    isValid: boolean;
    createAt: Date | null;
  }[];
};

export default function Form({ prismaMenus }: FormProps) {
  const [menus, setMenus] = useState(prismaMenus);
  const router = useRouter();
  useEffect(() => {
    setMenus(prismaMenus);
  }, [prismaMenus]);

  // メニュータイトル入力
  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMenus(
      menus.map((menu) => {
        if (menu.id === Number(e.target.id)) {
          return {
            ...menu,
            title: e.target.value,
          };
        } else {
          return menu;
        }
      })
    );
  };
  const updateMenu = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const menu = menus.filter((menu) => menu.id === Number(e.target.id))[0];
    await prismaUpdateMenu(menu);
    router.refresh();
  };
  // 時間入力
  const changeTime = async (event: Event, newValue: number | number[]) => {
    setMenus(
      menus.map((menu) => {
        if (menu.id === Number((event.target as HTMLInputElement).name)) {
          return {
            ...menu,
            time: newValue as number,
          };
        } else {
          return menu;
        }
      })
    );
    const menu = menus.map((menu) => {
      if (menu.id === Number((event.target as HTMLInputElement).name)) {
        return { ...menu, time: newValue as number };
      }
    });
    await prismaUpdateMenu(menu.filter(Boolean)[0]);
    router.refresh();
  };
  // アップボタン
  const upOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (Number((e.target as HTMLButtonElement).dataset.order) === 1) {
      return;
    }
    const up = menus.map((menu) => {
      if (
        menu.order === Number((e.target as HTMLButtonElement).dataset.order)
      ) {
        return { ...menu, order: menu.order - 1 };
      }
    });
    const down = menus.map((menu) => {
      if (
        menu.order ===
        Number((e.target as HTMLButtonElement).dataset.order) - 1
      ) {
        return { ...menu, order: menu.order + 1 };
      }
    });
    await prismaUpdateMenu(up.filter(Boolean)[0]);
    await prismaUpdateMenu(down.filter(Boolean)[0]);
    router.refresh();
  };
  // ダウンボタン
  const downOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      Number((e.target as HTMLButtonElement).dataset.order) ===
      menus.slice(-1)[0].order
    ) {
      return;
    }
    const down = menus.map((menu) => {
      if (
        menu.order === Number((e.target as HTMLButtonElement).dataset.order)
      ) {
        return { ...menu, order: menu.order + 1 };
      }
    });
    const up = menus.map((menu) => {
      if (
        menu.order ===
        Number((e.target as HTMLButtonElement).dataset.order) + 1
      ) {
        return { ...menu, order: menu.order - 1 };
      }
    });
    await prismaUpdateMenu(up.filter(Boolean)[0]);
    await prismaUpdateMenu(down.filter(Boolean)[0]);
    router.refresh();
  };
  // 削除ボタン
  const deleteMenu = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await prismaDeleteMenu(Number((e.target as HTMLButtonElement).dataset.id));
    router.refresh();
  };
  // オンオフスイッチ
  const changeIsValid = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setMenus(
      menus.map((menu) => {
        if (menu.id === Number(event.target.id)) {
          return {
            ...menu,
            isValid: event.target.checked,
          };
        } else {
          return menu;
        }
      })
    );
    const menu = menus.map((menu) => {
      if (menu.id === Number(event.target.id)) {
        return { ...menu, isValid: event.target.checked };
      }
    });
    await prismaUpdateMenu(menu.filter(Boolean)[0]);
    router.refresh();
  };
  // 追加ボタン
  const addMenu = async () => {
    const order = menus.slice(-1)[0].order + 1;
    await prismaCreateMenu(order);
    router.refresh();
  };
  // コントローラー
  // const [sound] = useSound(Countdown);

  const [isPlay, setIsPlay] = useState(false);
  const [indexPlaying, setIndexPlaying] = useState(0);
  const [intervalMenu, setIntervalMenu] = useState(0);
  const filteredMenus = menus.filter((menu) => menu.isValid);

  // 再生
  useEffect(() => {
    const audio = new Audio(Countdown);
    const setIntervalId = setInterval(() => {
      if (!isPlay) return;
      if (indexPlaying + 1 > filteredMenus.length) {
        // sound();
        audio.play().then();
        const speech = new SpeechSynthesisUtterance(
          "マイトレーナーを終了します、お疲れ様でした。"
        );
        setTimeout(() => window.speechSynthesis.speak(speech), 3000);
        setIndexPlaying(0);
        setIntervalMenu(0);
        setIsPlay(false);
        clearInterval(setIntervalId);
      } else {
        const title = filteredMenus[indexPlaying].title;
        const delay = title.length * 200;
        const time = filteredMenus[indexPlaying].time * 1000;
        const speech = new SpeechSynthesisUtterance(title);
        // sound();
        audio.play().then();
        setTimeout(() => window.speechSynthesis.speak(speech), 3000);
        setTimeout(() => audio.play().then(), delay + 3000);
        setIntervalMenu(time + delay);
        setIndexPlaying((indexPlaying) => indexPlaying + 1);
      }
    }, intervalMenu);
    return () => {
      clearInterval(setIntervalId);
    };
  }, [indexPlaying, intervalMenu, isPlay, filteredMenus]);
  // スタートボタン
  const start = () => {
    setIsPlay(true);
  };
  // ストップボタン
  const stop = () => {
    setIsPlay(false);
    setIndexPlaying((indexPlaying) => indexPlaying - 1);
    setIntervalMenu(0);
  };
  // トータルタイム
  const timeTotal = () => {
    const timeTotal = menus.reduce(
      (previous, current) =>
        previous + (current.time + current.title.length * 0.2),
      3
    );
    const minutes = Math.floor(timeTotal / 60);
    const seconds = (timeTotal % 60).toFixed(0);
    return `${minutes}分${seconds}秒`;
  };
  // トータルメニュー数
  const menusTotal = filteredMenus.length;

  return (
    <div className="flex gap-4 flex-col items-start">
      <button>test</button>
      <Controllers start={start} stop={stop} isPlay={isPlay} />
      <Chips timeTotal={timeTotal} menusTotal={menusTotal} />
      <ul
        className="grid w-full gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {menus.map((menu) => (
          <li key={menu.id} className="grow">
            <MenuCard
              menu={menu}
              changeTitle={changeTitle}
              updateMenu={updateMenu}
              changeTime={changeTime}
              upOrder={upOrder}
              downOrder={downOrder}
              deleteMenu={deleteMenu}
              changeIsValid={changeIsValid}
              isPlay={isPlay}
              length={menus.length}
              filteredMenus={filteredMenus}
              indexPlaying={indexPlaying}
            />
          </li>
        ))}
      </ul>
      <AddButton addMenu={addMenu} />
    </div>
  );
}
