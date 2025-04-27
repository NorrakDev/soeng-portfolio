import Link from "next/link";

export default function BrandLogo() {
    return (
      <Link href={'/'} scroll className="inline-block text-5xl font-bold">
        SG<sup className="text-xs align-super">®</sup>
      </Link>
    );
  }