

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/Components/ui/dialog"


const Modal = ({
    title,
    description,
    isOpen,
    onClose,
    children
}) => {
  return (
    <Dialog
    open={isOpen}
    onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div>
        {children}
        </div>

      </DialogContent>
    </Dialog>

  )
}

export default Modal