import { ComponentProps, FC, ReactElement, ReactNode, useRef } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import { Inter } from 'next/font/google'

import { Button } from '../button'
import { Typography } from '../typography'

import cls from './modal.module.scss'

import { CloseModal } from '@/shared/assets/icons/close-modal-icon'

/**
 * @typedef {Object} ModalType
 * @property {React.ReactNode} [children] - The content to be displayed within the modal.
 * @property {string} [title] - The title of the modal.
 * @property {(value: boolean) => void} [onOpenChange] - A function to handle the modal open state change.
 * @property {boolean} isOpen - Indicates whether the modal is currently open.
 * @property {() => JSX.Element} [renderActionButton] - A function returning JSX for rendering the action button.
 * @property {() => JSX.Element} [renderCancelButton] - A function returning JSX for rendering the cancel button.
 * @property {React.ComponentProps<"div">} - Additional props to be applied to the wrapping div element.
 */

/**
 * Modal component that displays a dialog overlay.
 *
 * @param {ModalType} props - The props for configuring the modal.
 * @returns {JSX.Element} The JSX element representing the modal.
 */
/**

 * How to use.
 * Place inside the children in the form tag the content of the modal with the button ModalControl or renderActionButton,
 */
export type ModalType = {
  children?: ReactNode
  trigger?: ReactNode
  title?: string
  onOpenChange?: (value: boolean) => void
  isOpen: boolean
  width?: 'small' | 'medium' | 'big' | 'huge'
  renderActionButton?: () => ReactElement
} & ComponentProps<'div'>

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const Modal: FC<ModalType> = props => {
  const {
    children,
    title,
    trigger,
    onOpenChange,
    isOpen,
    width = 'medium',
    renderActionButton,
  } = props
  const triggerRef = useRef(null)

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      {trigger && (
        <Dialog.Trigger ref={triggerRef} asChild>
          <>{trigger}</>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className={cls.DialogOverlay} />
        <Dialog.Content className={clsx(cls.DialogContent, cls[width], inter.className)}>
          <div className={cls.header}>
            <Dialog.Title>
              <Typography variant="h1">{title}</Typography>
            </Dialog.Title>
            <Dialog.Close className={cls.IconButton} aria-label="close" asChild>
              <Button variant="custom">
                <CloseModal />
              </Button>
            </Dialog.Close>
          </div>
          <div className={cls.content}>
            {children}
            {renderActionButton?.()}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
