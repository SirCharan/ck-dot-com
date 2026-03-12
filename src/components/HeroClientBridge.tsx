"use client";

import dynamic from 'next/dynamic';

const HeroInteractive = dynamic(() => import('./HeroInteractive'), {
  ssr: false,
});

export default function HeroClientBridge() {
  return <HeroInteractive />;
}
