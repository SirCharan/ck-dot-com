"use client";

import { useEffect } from 'react';

/** Adds IntersectionObserver-based fade-in to all <section> elements on the page. */
export default function SectionAnimator() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }
    );

    const sections = Array.from(document.querySelectorAll('section'));
    sections.forEach((section) => {
      section.classList.add('section-animate');
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
