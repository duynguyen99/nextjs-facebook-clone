import Image from "next/image";
import React from "react";
import { ModalProps } from "../types/Props";

const Modal = ({
  children,
  title,
  descriptionTitle,
  hideTitle,
  titleClassName,
  onClose,
}: ModalProps) => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none mw-8">
        <div className="relative w-auto my-6 mx-auto lg:max-w-3xl max-w-xs">
          <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div
              className="w-8 h-8 absolute top-2 right-2 rounded-full justify-center bg-slate-200 z-30 hover:bg-slate-400 flex"
              onClick={onClose}
            >
              <Image
                src="/icon/close.svg"
                width="20"
                height="20"
                alt="image"
                className="bg-red cursor-pointer"
              />
            </div>
            {!hideTitle && (
              <div className="pt-2 pl-6 border-b pb-4 ">
                <div className={`font-semibold ${titleClassName || ''}`}>{title}</div>
                <div className="pt-1 whitespace-pre-line">
                  {descriptionTitle}
                </div>
              </div>
            )}
            <div className={`relative p-6 flex-auto ${hideTitle ? 'pt-4' : ''}`}>{children}</div>
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff] opacity-75 fixed inset-0 z-10 bg-black"></div>
    </>
  );
};

export default Modal;
