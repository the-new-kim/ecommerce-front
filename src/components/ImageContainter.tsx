import { ReactNode } from "react";

interface IImageContainerProps {
  src: string;
  children?: ReactNode;
  objectFit: "contain" | "cover";
  width: string;
  height: string;
  aspectRatio: string;
  className: string;
}

export default function ImageContainer({
  src,
  children,
  objectFit,
  width,
  height,
  aspectRatio,
  className,
}: IImageContainerProps) {
  return (
    <div
      className={className}
      style={{ position: "relative", width, height, aspectRatio }}
    >
      <img style={{ objectFit, width: "100%", height: "100%" }} src={src} />
      {children}
    </div>
  );
}
