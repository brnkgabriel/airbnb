"use client"

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io"
import Button from "./Button";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
  actionLabel,
  onClose,
  onSubmit,
  body,
  disabled,
  footer,
  isOpen,
  secondaryAction,
  secondaryActionLabel,
  title
}) => {
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    setShowModal(isOpen)
    return () => { }
  }, [isOpen])

  const handleClose = useCallback(() => {

    if (disabled) { return }
    setShowModal(false)
    setTimeout(() => { onClose() }, 300);

  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {

    if (disabled) { return }
    onSubmit()

  }, [disabled, onSubmit])

  const handleSecondarySubmit = useCallback(() => {

    if (disabled || !secondaryAction) { return }

    secondaryAction()

  }, [disabled, secondaryAction])

  if (!isOpen) {
    return null
  }
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto lg:h-auto md:h-auto">
          {/* CONTENT */}
          <div className={
            `
              translate duration-300 h-full
              ${showModal ? 'translate-y-0' : 'translate-y-full'}
              ${showModal ? 'opacity-100' : 'opacity-0'}
            `
          }>
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none gap-4 p-4">
              {/* HEADER */}
              <div className="flex items-center rounded-t justify-center relative border-b-[1px] p-2">
                <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute right-0">
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">
                  {title}
                </div>
              </div>
              {/* BODY */}
              <div className="relative flex-auto">
                {body}
              </div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4 w-full">
                  {
                    secondaryAction && secondaryActionLabel && (
                      <Button
                        disabled={disabled}
                        outline
                        label={secondaryActionLabel as string}
                        onClick={handleSecondarySubmit}
                      />
                    )
                  }
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
              { footer }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal