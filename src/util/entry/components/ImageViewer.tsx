"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const hiddenScrollbarClassName = "hidden-scrollbar";
const showModalParamKey = "sm";
const showModalValue = "1";

// Header heights from layout.tsx
const HEADER_HEIGHT_MOBILE = 48; // h-12 (3rem)
const HEADER_HEIGHT_DESKTOP = 64; // md:h-16 (4rem)

const ImageModal: React.FC<{
  src: string;
  alt: string;
}> = ({ src, alt }) => {
  const router = useRouter();
  useEffect(() => {
    const escapeKeyListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.back();
      }
    };
    document.addEventListener("keydown", escapeKeyListener);
    document.body.classList.add(hiddenScrollbarClassName);
    return () => {
      document.removeEventListener("keydown", escapeKeyListener);
      document.body.classList.remove(hiddenScrollbarClassName);
    };
  }, [router]);

  const [headerHeight, setHeaderHeight] = useState(HEADER_HEIGHT_MOBILE);

  useEffect(() => {
    const updateHeaderHeight = () => {
      setHeaderHeight(
        window.innerWidth >= 768 ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE,
      );
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <div
      className="absolute left-0 flex w-dvw justify-center bg-black bg-opacity-70 p-2 hover:cursor-zoom-out lg:p-8"
      style={{
        top: window.scrollY,
        height: `calc(100dvh - ${headerHeight}px)`,
        marginTop: `${headerHeight}px`,
      }}
      onClick={() => router.back()}
    >
      <img src={src} alt={alt} className="object-scale-down" />
    </div>
  );
};

type Prop = { src: string; alt: string; caption: React.ReactNode };
export const ImageViewer: React.FC<Prop> = ({ src, alt, caption }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();
  const [isModalTarget, setIsModalTarget] = useState<boolean>(false);
  const hasShowModalParam =
    currentSearchParams.get(showModalParamKey) === showModalValue;

  useEffect(() => {
    if (!hasShowModalParam) {
      setIsModalTarget(false);
    }
  }, [hasShowModalParam]);

  const openModal = useCallback(() => {
    setIsModalTarget(true);
    const params = new URLSearchParams(currentSearchParams.toString());
    params.set(showModalParamKey, showModalValue);
    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [router, pathname, currentSearchParams]);

  return (
    <>
      <p className="flex h-fit flex-col items-center">
        <img
          className="max-h-96 max-w-full object-contain hover:cursor-zoom-in"
          src={src}
          alt={alt}
          onClick={openModal}
        />
        <span>{caption}</span>
      </p>
      {hasShowModalParam && isModalTarget && <ImageModal src={src} alt={alt} />}
    </>
  );
};
