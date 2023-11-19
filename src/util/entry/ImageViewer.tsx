"use client";
import { useCallback, useEffect, useState } from "react";

const hiddenScrollbarClassName = "hidden-scrollbar";

type Prop = { src: string; alt: string; caption: string };
export const ImageViewer: React.FC<Prop> = (prop) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = useCallback(() => {
    document.body.classList.add(hiddenScrollbarClassName);
    setShowModal(true);
  }, [showModal]);
  const closeModal = useCallback(() => {
    setShowModal(false);
    document.body.classList.remove(hiddenScrollbarClassName);
  }, [showModal]);

  useEffect(() => {
    const escapeKeyListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", escapeKeyListener);
    return () => {
      document.removeEventListener("keydown", escapeKeyListener);
    };
  }, []);

  const ImageModal = () => {
    return showModal ? (
      <div
        className="absolute left-0 top-0 flex h-screen w-screen justify-center bg-black bg-opacity-70 hover:cursor-zoom-out"
        style={{ top: window.scrollY }}
        onClick={closeModal}
      >
        <img
          src={prop.src}
          alt={prop.alt}
          className="m-0 object-scale-down lg:m-8"
        />
      </div>
    ) : (
      <></>
    );
  };
  return (
    <>
      <p className="flex flex-col items-center">
        <img
          className="hover:cursor-zoom-in"
          src={prop.src}
          alt={prop.alt}
          onClick={openModal}
        />
        <span>{prop.caption}</span>
      </p>
      <ImageModal />
    </>
  );
};
