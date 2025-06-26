'use client';

import React, { ReactNode, useRef } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';

type TransitionLinkProps = LinkProps & {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  children?: ReactNode;  // <-- Add here
};

export default function TransitionLink({
  href,
  onClick,
  className,
  children,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();
  const isAnimating = useRef(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) onClick(e);

    if (
      isAnimating.current ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    )
      return;

    e.preventDefault();
    isAnimating.current = true;

    const currentPath = window.location.pathname;
    const targetPath = href.toString();
    const columns = document.querySelectorAll<HTMLDivElement>('.curtain-column');
    const message = document.querySelector<HTMLDivElement>('.transition-message');

    if (message) {
      gsap.to(message, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    if (!columns.length) {
      if (currentPath === targetPath) {
        window.location.reload();
      } else {
        router.push(targetPath);
      }
      return;
    }

    gsap.set(columns, { y: '-100%' });

    gsap.to(columns, {
      y: '0%',
      duration: 0.8,
      ease: 'power4.inOut',
      stagger: 0.1,
      onComplete: () => {
        if (currentPath === targetPath) {
          window.location.reload();
        } else {
          router.push(targetPath);
        }
        isAnimating.current = false;
      },
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
