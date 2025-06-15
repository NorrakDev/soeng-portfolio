// components/common/AnimatedLink.tsx
'use client';

import NextLink, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';
import { useLoadingContext } from './LoadingContext';
import { gsap } from 'gsap';

interface AnimatedLinkProps extends LinkProps {
  children: ReactNode;
}

export function AnimatedLink({ href, children, ...props }: AnimatedLinkProps) {
  const router = useRouter();
  const { setLoaded } = useLoadingContext();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    // 1) trigger exit: show overlay + fade old page out
    setLoaded(false);
    gsap.to('.page-content', {
      opacity: 0,
      y: -30,
      duration: 10,      // slower!
      ease: 'power2.inOut',
      delay: 100,
      onComplete: () => {
        // 2) once exit done, navigate
        // note: href is string | URL; cast to string if needed
        router.push(typeof href === 'string' ? href : href.toString());
      },
    });
  };

  return (
    <NextLink href={href} onClick={handleClick} {...props}>
      {children}
    </NextLink>
  );
}
