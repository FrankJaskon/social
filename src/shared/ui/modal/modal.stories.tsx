import { useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import meta from '@/shared/ui/input/input.stories'
import { Modal, ModalType } from '@/shared/ui/modal/modal'
import { ModalControl } from '@/shared/ui/modal/modal-control'
import { Typography } from '@/shared/ui/typography'

export default {
  title: 'shared/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Modal>
type Story = StoryObj<typeof meta>
const commonArgs = {
  children: (
    <>
      <Typography variant={'regular_14'}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </Typography>
      <Input type={'text'} label={'Input'} placeholder={'Input'} />
      <Input type={'password'} label={'Input'} placeholder={'Input'} />
      <Input searchInput type={'search'} label={'Input'} placeholder={'Input'} />
    </>
  ),
  open: true,
}

const DefaultModal = (args: ModalType) => {
  const [open, setOpen] = useState(false)

  const handleModalClosed = () => {
    setOpen(false)
  }
  const handleModalOpened = () => {
    setOpen(true)
  }

  return (
    <>
      <Button onClick={handleModalOpened}>Open modal</Button>
      <Modal {...args} isOpen={open} onOpenChange={handleModalClosed}>
        <Typography variant={'regular_14'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </Modal>
    </>
  )
}

export const DefaultModalStory: Story = {
  render: () => <DefaultModal isOpen={false} />,
}

const ModalWithTwoButton = (args: ModalType) => {
  const [open, setOpen] = useState(false)
  const handleModalClosed = () => {
    setOpen(false)
  }
  const handleModalOpened = () => {
    setOpen(true)
  }

  const onClickDataHandler = () => {
    handleModalClosed()
  }

  return (
    <>
      <Button onClick={handleModalOpened}>Open modal</Button>
      <Modal {...args} isOpen={open} onOpenChange={handleModalClosed}>
        <div>
          <Typography variant="regular_14">
            {'Do you really want to remove'}
            <Typography style={{ fontWeight: '900' }} as="span">
              {'Ivan'}
            </Typography>
          </Typography>
          <Typography variant="regular_14">{'All cards will be deleted.'}</Typography>
        </div>

        <ModalControl
          closedModal={handleModalClosed}
          onSubmit={onClickDataHandler}
          title={'Save'}
        />
      </Modal>
    </>
  )
}

const ModalWithTitle = (args: ModalType) => {
  const [open, setOpen] = useState(false)
  const handleModalClosed = () => {
    setOpen(false)
  }
  const handleModalOpened = () => {
    setOpen(true)
  }

  return (
    <>
      <Button onClick={handleModalOpened}>Open modal</Button>
      <Modal {...args} isOpen={open} onOpenChange={handleModalClosed}>
        <div>
          <Typography variant="regular_16">
            {'Do you really want to remove'}{' '}
            <Typography style={{ fontWeight: '900' }} as="span">
              {'Ivan'}
            </Typography>
          </Typography>
          <Typography variant="regular_16">{'All cards will be deleted.'}</Typography>
        </div>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <Button variant="primary">
              <Typography variant="h3">Save changes</Typography>
            </Button>
          </Dialog.Close>
        </div>
      </Modal>
    </>
  )
}

export const ModalWithHeaderTitle: Story = {
  render: () => <ModalWithTitle isOpen={false} title={'Header Title'} />,
}

export const ModalWithTwoButtonStory: Story = {
  render: () => <ModalWithTwoButton isOpen={false} />,
}

const ModalWithOneButton = (args: ModalType) => {
  const [open, setOpen] = useState(false)
  const handleModalClosed = () => {
    setOpen(false)
  }
  const handleModalOpened = () => {
    setOpen(true)
  }

  return (
    <>
      <Button onClick={handleModalOpened}>Open modal</Button>
      <Modal {...args} isOpen={open} onOpenChange={handleModalClosed}>
        <div>
          <Typography variant="regular_14">
            {'Do you really want to remove'}
            <Typography style={{ fontWeight: '900' }} as="span">
              {'Ivan'}
            </Typography>
          </Typography>
          <Typography variant="regular_14">{'All cards will be deleted.'}</Typography>
        </div>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close asChild>
            <Button variant="primary">Save changes</Button>
          </Dialog.Close>
        </div>
      </Modal>
    </>
  )
}

export const ModalWithOneButtonStory: Story = {
  render: () => <ModalWithOneButton isOpen={false} />,
}
