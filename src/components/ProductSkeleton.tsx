import { Skeleton } from "./Skeleton";

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-center items-center [&>*]:mb-3 w-full relative group">
      <Skeleton className="aspect-[2/3] w-full h-auto" />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col justify-center items-start w-full">
          <Skeleton className="mb-2 h-5" />
          <Skeleton className="h-5" />
        </div>
      </div>
    </div>
  );
}
