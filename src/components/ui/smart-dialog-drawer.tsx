'use client'

import * as React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from './drawer'
import { useMediaQuery } from './useMediaQuery'

type SmartDialogProps = React.ComponentProps<typeof Dialog> &
  React.ComponentProps<typeof Drawer>

const SmartDialog = ({ children, ...props }: SmartDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <Drawer {...props}>{children}</Drawer>
  ) : (
    <Dialog {...props}>{children}</Dialog>
  )
}

type SmartDialogContentProps = React.ComponentProps<typeof DialogContent> &
  React.ComponentProps<typeof DrawerContent>

const SmartDialogContent = ({
  children,
  overlayClassName = '',
  withCloseButton,
  showCloseButton,
  ...props
}: SmartDialogContentProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerContent
      {...props}
      withCloseButton={withCloseButton ?? showCloseButton ?? true}
    >
      {children}
    </DrawerContent>
  ) : (
    <DialogContent
      {...props}
      showCloseButton={showCloseButton ?? withCloseButton ?? true}
      overlayClassName={overlayClassName}
    >
      {children}
    </DialogContent>
  )
}

type SmartDialogDescriptionProps = React.ComponentProps<
  typeof DialogDescription
> &
  React.ComponentProps<typeof DrawerDescription>

const SmartDialogDescription = ({
  children,
  ...props
}: SmartDialogDescriptionProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerDescription {...props}>{children}</DrawerDescription>
  ) : (
    <DialogDescription {...props}>{children}</DialogDescription>
  )
}

type SmartDialogHeaderProps = React.ComponentProps<typeof DialogHeader> &
  React.ComponentProps<typeof DrawerHeader>

const SmartDialogHeader = ({ children, ...props }: SmartDialogHeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerHeader {...props}>{children}</DrawerHeader>
  ) : (
    <DialogHeader {...props}>{children}</DialogHeader>
  )
}

type SmartDialogTitleProps = React.ComponentProps<typeof DialogTitle> &
  React.ComponentProps<typeof DrawerTitle>

const SmartDialogTitle = ({ children, ...props }: SmartDialogTitleProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerTitle {...props}>{children}</DrawerTitle>
  ) : (
    <DialogTitle {...props}>{children}</DialogTitle>
  )
}

type SmartDialogTriggerProps = React.ComponentProps<typeof DialogTrigger> &
  React.ComponentProps<typeof DrawerTrigger>

const SmartDialogTrigger = ({
  children,
  ...props
}: SmartDialogTriggerProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerTrigger {...props}>{children}</DrawerTrigger>
  ) : (
    <DialogTrigger {...props}>{children}</DialogTrigger>
  )
}

type SmartDialogFooterProps = React.ComponentProps<typeof DialogFooter> &
  React.ComponentProps<typeof DrawerFooter>

const SmartDialogFooter = ({ children, ...props }: SmartDialogFooterProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerFooter {...props}>{children}</DrawerFooter>
  ) : (
    <DialogFooter {...props}>{children}</DialogFooter>
  )
}

type SmartDialogCloseProps = React.ComponentProps<typeof DialogClose> &
  React.ComponentProps<typeof DrawerClose>

const SmartDialogClose = ({ children, ...props }: SmartDialogCloseProps) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <>
      <DrawerClose {...props}>{children}</DrawerClose>
    </>
  ) : (
    <DialogClose {...props}>{children}</DialogClose>
  )
}

export {
  SmartDialog,
  SmartDialogClose,
  SmartDialogContent,
  SmartDialogDescription,
  SmartDialogFooter,
  SmartDialogHeader,
  SmartDialogTitle,
  SmartDialogTrigger
}
