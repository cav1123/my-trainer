"use server";
import { PrismaClient } from "@prisma/client";
const prisma = global.prisma ?? new PrismaClient({ log: ["query"] });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// 取得
export async function getMenus() {
  return await prisma.menus.findMany({
    orderBy: {
      order: "asc",
    },
  });
}
// 更新
export async function prismaUpdateMenu(menu) {
  await prisma.menus.update({
    where: {
      id: menu.id,
    },
    data: menu,
  });
}
// 削除
export async function prismaDeleteMenu(id) {
  await prisma.menus.delete({
    where: {
      id: id,
    },
  });
}
// 作成
export async function prismaCreateMenu(order) {
  await prisma.menus.create({
    data: {
      title: "",
      time: 30,
      order: order,
      isValid: true,
    },
  });
}
