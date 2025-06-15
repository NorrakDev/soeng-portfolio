'use client';

import { usePathname } from 'next/navigation';

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    // `key` forces remount on path change
    <main key={pathname} className="content overflow-x-hidden">
      {children}
    </main>
  );
}
