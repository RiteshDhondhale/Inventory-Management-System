import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiClient } from '@/lib/api-client'
import { CREATE_ITEM_ROUTE, DELETE_ROUTE, GET_ITEM_ROUTE } from '@/utils/constants'
import { Input } from '@/components/ui/input'
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
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'

// const items = [
//     {
//         name: "Galaxy",
//         type: "Smartphone",
//         stock_quantity: 15,
//         rate: 25000
//     },
// ];

const Inventory = () =>
{
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [rate, setRate] = useState("");

    useEffect(() =>
    {
        getItems();
    }, []);

    const getItems = async () => 
    {
        try
        {
            const response = await apiClient.get(
                GET_ITEM_ROUTE
            )
            console.log(response.data.items)
            setItems(response.data.items)
        } catch (error)
        {
            console.log({ error })
        }
    };

    const handleAddItem = async () =>
    {
        try
        {
            const response = await apiClient.post(
                CREATE_ITEM_ROUTE,
                { name, type, quantity: Number(quantity), rate: Number(rate) }
            );
            getItems();
            window.location.reload();
        } catch (error)
        {
            console.log(error);
        }

    }

    const handleDeleteItem = async (id) =>
    {
        try
        {
            const response = await apiClient.delete(
                `${DELETE_ROUTE}/${id}`
            )
            getItems();
        }
        catch (error)
        {
            console.log(error);
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6 pt-15'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold text-gray-800'>All Items</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button><span className='mr-1'>+</span> New</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Item</DialogTitle>
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
                                    Type
                                </Label>
                                <Input id="type" className="col-span-3" value={type} onChange={e => setType(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity">
                                    Stock Quantity
                                </Label>
                                <Input id="quantity" className="col-span-3" value={quantity} onChange={e => setQuantity(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="rate">
                                    Rate
                                </Label>
                                <Input id="rate" className="col-span-3" value={rate} onChange={e => setRate(e.target.value)} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddItem} type="submit">Save changes</Button>
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
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Type</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Stock Quantity</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Rate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {items.map(item => (
                                    <TableRow className="text-left" key={item.name}>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.name}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.type}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.quantity}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><span>Rs. </span>{item.rate}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><Button variant='ghost' onClick={() => handleDeleteItem(item._id)}><Trash2 className='size-4' /></Button></TableCell>
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

export default Inventory
