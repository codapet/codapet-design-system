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

const SmartDialog = ({
  children,
  ...props
}: React.ComponentProps<typeof Dialog>) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <Drawer {...props}>{children}</Drawer>
  ) : (
    <Dialog {...props}>{children}</Dialog>
  )
}

const SmartDialogContent = ({
  children,
  overlayClassName = '',
  withCloseButton = true,
  ...props
}: React.ComponentProps<typeof DrawerContent> & {
  overlayClassName?: string
  withCloseButton?: boolean
}) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerContent {...props} withCloseButton={withCloseButton}>
      {children}
    </DrawerContent>
  ) : (
    <DialogContent
      {...props}
      showCloseButton={withCloseButton}
      overlayClassName={overlayClassName}
    >
      {children}
    </DialogContent>
  )
}

const SmartDialogDescription = ({
  children,
  ...props
}: React.ComponentProps<typeof DrawerDescription>) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerDescription {...props}>{children}</DrawerDescription>
  ) : (
    <DialogDescription {...props}>{children}</DialogDescription>
  )
}

const SmartDialogHeader = ({
  children,
  ...props
}: React.ComponentProps<typeof DrawerHeader>) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerHeader {...props}>{children}</DrawerHeader>
  ) : (
    <DialogHeader {...props}>{children}</DialogHeader>
  )
}

const SmartDialogTitle = ({
  children,
  ...props
}: React.ComponentProps<typeof DrawerTitle>) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerTitle {...props}>{children}</DrawerTitle>
  ) : (
    <DialogTitle {...props}>{children}</DialogTitle>
  )
}

const SmartDialogTrigger = ({
  children,
  ...props
}: React.ComponentProps<typeof DrawerTrigger>) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerTrigger {...props}>{children}</DrawerTrigger>
  ) : (
    <DialogTrigger {...props}>{children}</DialogTrigger>
  )
}

const SmartDialogFooter = ({
  children,
  ...props
}: React.ComponentProps<typeof DrawerFooter>) => {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return isMobile ? (
    <DrawerFooter {...props}>{children}</DrawerFooter>
  ) : (
    <DialogFooter {...props}>{children}</DialogFooter>
  )
}

const SmartDialogClose = ({
  children,
  ...props
}: React.ComponentProps<typeof DrawerClose>) => {
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
