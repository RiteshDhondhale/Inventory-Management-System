import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import
{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/lib/api-client'
import { CREATE_VENDOR_ROUTE, DELETE_VENDOR_ROUTE, GET_VENDOR_ROUTE } from '@/utils/constants'
import { Trash2 } from 'lucide-react'


// const vendors = [
//     {
//         name: "Jon Fen",
//         company: "Electro Pvt Ltd",
//         phone: "9854137134",
//         address: "Patparganj"
//     }
// ]

const Vendors = () =>
{
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([])
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() =>
    {
        getVendors();
    }, [])

    const getVendors = async () =>
    {
        try
        {
            const response = await apiClient.get(
                GET_VENDOR_ROUTE
            )
            console.log(response.data.vendors)
            setVendors(response.data.vendors)
        } catch (error)
        {
            console.log({ error })
        }
    };

    const handleAddVendor = async () =>
    {
        try
        {
            const response = await apiClient.post(
                CREATE_VENDOR_ROUTE,
                { name, company, phone, address }
            );
            getVendors();
            window.location.reload();
        } catch (error)
        {
            console.log(error);
        }
    }

    const handleDeleteVendor = async (id) => {
        try
        {
            const response = await apiClient.delete(
                `${DELETE_VENDOR_ROUTE}/${id}`
            )
            getVendors();
        }
        catch (error)
        {
            console.log(error);
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6 pt-15'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold text-gray-800'>All Vendors</h1>
                <Dialog className="2xl:w-xl">
                    <DialogTrigger asChild>
                        <Button><span className='mr-1'>+</span> New</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Vendor</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name">
                                    Name
                                </Label>
                                <Input id="name" className="col-span-3" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type">
                                    Company
                                </Label>
                                <Input id="company" className="col-span-3" value={company} onChange={e => setCompany(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity">
                                    Phone
                                </Label>
                                <Input id="phone" className="col-span-3" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="rate">
                                    Address
                                </Label>
                                <Input id="Address" className="col-span-3" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddVendor} type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className='mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='p-4 bg-white'>
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow className="text-left">
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Name</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Company</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Address</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {vendors.map(vendor => (
                                    <TableRow className="text-left" key={vendor.name}>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{vendor.name}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{vendor.company}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{vendor.phone}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{vendor.address}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><Button variant='ghost' onClick={() => handleDeleteVendor(vendor._id)}><Trash2 className='size-4' /></Button></TableCell>
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

export default Vendors
