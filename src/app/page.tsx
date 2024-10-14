import Header from "./ui/Header";

import Form from "./ui/Form";
import { getMenus } from "../app/lib/prisma";

export default async function Home() {
  const prismaMenus = await getMenus();

  return (
    <>
      <Header />
      <div className="px-4 py-8 flex gap-4 flex-col">
        <Form prismaMenus={prismaMenus} />
      </div>
    </>
  );
}
