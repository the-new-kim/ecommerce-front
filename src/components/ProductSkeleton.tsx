export default function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center [&>*]:mb-3 w-full relative group">
      <div className="relative aspect-[2/3] w-full h-full overflow-hidden bg-slate-200" />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col justify-center items-start w-full [&>*]:h-6 [&>*]:w-full [&>*]:bg-slate-200">
          <div className="mb-1" />
          <div />
        </div>
      </div>
    </div>
  );
}
