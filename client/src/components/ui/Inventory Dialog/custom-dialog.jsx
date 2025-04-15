import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import
{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { DropdownMenuItem } from '../dropdown-menu'


const CustomDialog = ({ mode, itemDetails, handleSubmit, triggerText, selectedItem }) =>
{
    const [open, setOpen] = useState(false);

    useEffect(() => 
    {
        if (open && mode === "edit" && selectedItem)
        {
            itemDetails.forEach(({ title, setState }) => 
            {
                const propertyMapping = {
                    "Name": "name",
                    "Type": "type",
                    "Stock": "quantity",
                    "Rate": "rate"
                }

                const propertyName = propertyMapping[title];
                if (propertyName && selectedItem[propertyName] !== undefined)
                {
                    setState(selectedItem[propertyName]);
                }
            })
        } else if (!open)
        {
            resestFormFields();
        }
    }, [open, selectedItem, mode]);

    const resestFormFields = () =>
    {
        if (!open)
        {
            itemDetails.forEach(({ setState, setAlert }) =>
            {
                setState("")
                if (setAlert) setAlert(false);
            })
        }
    }

    const handleDialogClose = (isOpen) =>
    {
        if (!isOpen)
        {
            itemDetails.forEach(({ setAlert }) => setAlert(false))
        }
        setOpen(isOpen)
    }

    const onSubmit = () =>
    {
        let isValid = true;
        itemDetails.forEach(({ state, setAlert}) =>
        {
            const isEmpty = state === "" || state === undefined;
            if (setAlert) setAlert(isEmpty);
            if (isEmpty) isValid = false;
        })

        if (isValid)
        {
            handleSubmit();
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                {
                    mode === "add" ?
                        <Button><span className='mr-1'>+</span> New</Button> :
                        <DropdownMenuItem onSelect={(e) =>
                        {
                            e.preventDefault();
                        }}>Edit Item</DropdownMenuItem>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{triggerText}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {mode === "add" ? "Add a new item to inventory" : "Edit existing inventory item"}
                </DialogDescription>
                <div className="grid gap-3 gap py-4">
                    {itemDetails.map(({ title, state, setState, alert, setAlert }) =>
                    {
                        return (
                            <div key={title} className="grid grid-cols-4 items-center gap-0">
                                <Label htmlFor={title.toLowerCase()}>
                                    {title}
                                </Label>
                                <Input
                                    id={title.toLowerCase()}
                                    type={title === "Stock" || title === "Rate" ? "number" : "text"}
                                    className="col-span-3"
                                    value={state}
                                    onChange={(e) =>
                                    {
                                        setState(e.target.value)
                                        setAlert(false)
                                    }} />
                                {alert && (
                                    <span className="text-[12px]/6 col-start-2 col-span-2 text-[#e66262]">{title} is required.</span>
                                )}
                            </div>
                        )
                    })}
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CustomDialog
