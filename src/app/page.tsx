import TestComponet from "./test";

export default function Home() {
  return (
    <main className="w-full flex flex-col snap-y snap-mandatory overflow-y-auto h-screen">
      <TestComponet text={"1"} />
      <TestComponet text={"2"} />
      <TestComponet text={"3"} />
      <TestComponet text={"4"} />
    </main>
  );
}
