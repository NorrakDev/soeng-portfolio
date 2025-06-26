import TransitionLink from "./common/AnimatedLink";

export default function BrandLogo() {
    return (
      <TransitionLink href={'/'} scroll className="inline-block text-5xl font-bold">
        SG<sup className="text-xs align-super">®</sup>
      </TransitionLink>
    );
  }