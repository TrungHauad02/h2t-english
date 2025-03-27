import { useState, useEffect, useRef, ReactNode, CSSProperties } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  style?: CSSProperties;
};

export default function FadeIn({ children, delay = 0, duration = 500, style, ...props }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
      }
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        height: "100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};