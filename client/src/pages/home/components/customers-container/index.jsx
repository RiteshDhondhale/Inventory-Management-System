import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DELETE_CUSTOMER_ROUTE, GET_CUSTOMER_ROUTE, UPDATE_CUSTOMER_ROUTE } from '@/utils/constants'
import { apiClient } from '@/lib/api-client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

// const customers = [
//   {
//       name: "Rohan",
//       phone: 9813716424,
//       address: "Patparganj",
//       amount: 25000
//   },
// ]

const Customers = () =>
{

    const [customers, setCustomers] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [open, setOpen] = useState(false);

    useEffect(() =>
    {
        getCustomers();
    }, [])

    const getCustomers = async () =>
    {
        try
        {
            const response = await apiClient.get(
                GET_CUSTOMER_ROUTE
            )

            setCustomers(response.data.customer)
        }
        catch (error)
        {
            console.log({ error })
        }
    }

    const handleDeleteCustomer = async (id) =>
    {
        try
        {
            await apiClient.delete(`${DELETE_CUSTOMER_ROUTE}/${id}`)
            getCustomers();
        }
        catch (error)
        {
            console.log(error);
        }
    }

    const handleSelection = async (e, customer) =>
    {
        e.preventDefault()
        setName(customer.name);
        setPhone(customer.phone);
        setAddress(customer.address);
    }

    const resetEditForm = () =>
    {
        setName('');
        setPhone('');
        setAddress('');
    }

    const handleDialog = (isOpen) =>
    {
        if (!isOpen)
        {
            resetEditForm();
        }
        setOpen(isOpen);
    }

    const handleEditCustomer = async (id) =>
    {
        try
        {
            await apiClient.put(`${UPDATE_CUSTOMER_ROUTE}/${id}`,
                {
                    name,
                    phone,
                    address
                }
            )
            resetEditForm();
            getCustomers();
            setOpen(false)
        }
        catch (error)
        {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6 pt-8'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold text-primary'>All Customers</h1>
                {/* <Button><span className='mr-1'>+</span> New</Button> */}
            </div>
            <div className='mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='p-4 bg-white'>
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow className="text-left">
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Customer Name</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Customer ID</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Address</TableHead>
                                    {/* <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Total Spent</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map(customer => (
                                    <TableRow className="text-left" key={customer.id}>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.name}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.id}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.phone}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.address}</TableCell>
                                        {/* <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><span>Rs. </span>{customer.amount}</TableCell> */}
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild><Button variant="ghost"><Ellipsis /></Button></DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <Dialog open={open} onOpenChange={handleDialog}>
                                                        <DialogTrigger asChild>
                                                            <DropdownMenuItem onSelect={(e) => handleSelection(e, customer)}>Edit</DropdownMenuItem>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-md">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Customer</DialogTitle>
                                                            </DialogHeader>
                                                            <DialogDescription>Edit existing customer detail</DialogDescription>
                                                            <div key={customer._id} className='grid gap-3 gap py-4'>
                                                                <div className='grid grid-cols-4 items-center gap-0'>
                                                                    <Label htmlFor="customer" >Customer</Label>
                                                                    <Input className="col-span-3" value={name} onChange={(e) => { setName(e.target.value) }} />
                                                                </div>
                                                                <div className='grid grid-cols-4 items-center gap-0'>
                                                                    <Label htmlFor="phone" >Phone</Label>
                                                                    <Input className="col-span-3" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                                                </div>
                                                                <div className='grid grid-cols-4 items-center gap-0'>
                                                                    <Label htmlFor="address" >Address</Label>
                                                                    <Input className="col-span-3" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button type="submit" onClick={() => handleEditCustomer(customer._id)}>Save changes</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <DropdownMenuItem onClick={() => handleDeleteCustomer(customer._id)}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
