"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const hiddenScrollbarClassName = "hidden-scrollbar";
const showModalParamKey = "sm";
const showModalValue = "1";

const ImageModal: React.FC<{
  src: string;
  alt: string;
  show: boolean;
  closeModal: () => void;
}> = ({ src, alt, show, closeModal }) => {
  const escapeKeyListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("keydown", escapeKeyListener);
      document.body.classList.add(hiddenScrollbarClassName);
    } else {
      document.removeEventListener("keydown", escapeKeyListener);
      document.body.classList.remove(hiddenScrollbarClassName);
    }
    return () => {
      document.removeEventListener("keydown", escapeKeyListener);
    };
  }, [show]);

  return show ? (
    <div
      className="absolute left-0 top-0 flex h-screen w-screen justify-center bg-black bg-opacity-70 hover:cursor-zoom-out"
      style={{ top: window.scrollY }}
      onClick={closeModal}
    >
      <img src={src} alt={alt} className="m-0 object-scale-down lg:m-8" />
    </div>
  ) : (
    <></>
  );
};

type Prop = { src: string; alt: string; caption: string };
export const ImageViewer: React.FC<Prop> = ({ src, alt, caption }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showThisImageModal, setShowThisImageModal] = useState<boolean>(false);
  const hasShowModalParam = useMemo(
    () => searchParams.get(showModalParamKey) === showModalValue,
    [searchParams],
  );
  useEffect(() => {
    if (!hasShowModalParam && showThisImageModal) {
      setShowThisImageModal(false);
    }
  }, [hasShowModalParam]);

  const openModalNavigation = useCallback(() => {
    setShowThisImageModal(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set(showModalParamKey, showModalValue);
    router.push(pathname + "?" + params.toString(), { scroll: false });
  }, [router]);
  const closeModalNavigation = useCallback(() => {
    setShowThisImageModal(false);
    router.back();
  }, [router]);

  return (
    <>
      <p className="flex h-fit flex-col items-center">
        <img
          className="max-h-96 max-w-full object-contain hover:cursor-zoom-in"
          src={src}
          alt={alt}
          onClick={openModalNavigation}
        />
        <span>{caption}</span>
      </p>
      <ImageModal
        src={src}
        alt={alt}
        show={hasShowModalParam && showThisImageModal}
        closeModal={closeModalNavigation}
      />
    </>
  );
};
