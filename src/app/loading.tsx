import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Image
        src="/newlife-logo-256.png"
        alt="Loading"
        width={72}
        height={72}
        priority
        className="animate-logo-pulse"
      />
    </div>
  );
}
