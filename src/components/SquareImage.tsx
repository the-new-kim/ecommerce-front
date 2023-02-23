interface ISquareImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function SquareImage({
  src,
  alt,
  className = "",
}: ISquareImageProps) {
  return (
    <div
      className={
        "relative w-14 sm:w-16 lg:w-20 h-full flex justify-center items-center " +
        className
      }
    >
      <img className="object-cover aspect-square" src={src} alt={alt} />
    </div>
  );
}
