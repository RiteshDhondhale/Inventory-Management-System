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


const CustomDialog = ({ mode, vendorDetails, handleSubmit, triggerText, selectedVendor }) =>
{
    const [open, setOpen] = useState(false);

    const propertyMapping = {
        "Vendor": "name",
        "Company": "company",
        "Phone": "phone",
        "Address": "address"
    }

    useEffect(() => 
    {
        if (open && mode === "edit" && selectedVendor)
        {
            vendorDetails.forEach(({ title, setState }) => 
            {   
                const propertyName = propertyMapping[title];
                if (propertyName && selectedVendor[propertyName] !== undefined)
                {
                    setState(selectedVendor[propertyName]);
                }

            })
        } else if (!open)
        {
            resetFormFields();
        }
    }, [open, selectedVendor, mode]);

    const resetFormFields = () =>
    {
        if (!open)
        {
            vendorDetails.forEach(({ setState, setAlert }) =>
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
            vendorDetails.forEach(({ setAlert }) => setAlert(false))
        }
        setOpen(isOpen)
    }

    const onSubmit = () =>
    {
        let isValid = true;
        vendorDetails.forEach(({ state, setAlert}) =>
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
                        }}>Edit Vendor</DropdownMenuItem>
                }
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{triggerText}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {mode === "add" ? "Add a new Vendor" : "Edit existing Vendor details"}
                </DialogDescription>
                <div className="grid gap-3 gap py-4">
                    {vendorDetails.map(({ title, state, setState, alert, setAlert }) =>
                    {
                        return (
                            <div key={title} className="grid grid-cols-4 items-center gap-0">
                                <Label htmlFor={title.toLowerCase()}>
                                    {title}
                                </Label>
                                <Input
                                    id={title.toLowerCase()}
                                    type={title === "Phone" ? "number" : "text"}
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
