const TestComponet = ({ text }: { text: string }) => (
  <div className="!h-dvh min-h-dvh snap-start p-6 flex flex-col items-center transition-all justify-between">
    <div className="h-full aspect-[9/16] bg-slate-500 transition-all">{text}</div>
  </div>
);

export default TestComponet;
