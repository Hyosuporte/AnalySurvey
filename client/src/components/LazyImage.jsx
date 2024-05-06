import { useState, useEffect, useRef } from "react";

function LazyImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          imgRef.current.src = src;
          imgRef.current.onload = () => setIsLoaded(true);
          observer.disconnect();
        }
      });
    });
    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      style={{ opacity: isLoaded ? 1 : 0 }}
      alt={alt}
      {...props}
    />
  );
}

export default LazyImage;
