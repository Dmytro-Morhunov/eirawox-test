import Image from "next/image";

interface Props {
  src: string;
}

export function ProductImage({ src }: Props) {
  return (
    <Image
      alt="image"
      src={src}
      width={500}
      height={500}
      className="w-full h-80 object-contain"
      loading="lazy"
    />
  );
}
