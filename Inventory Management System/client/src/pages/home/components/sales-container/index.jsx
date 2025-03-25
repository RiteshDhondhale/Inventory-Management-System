import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import
{
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { apiClient } from '@/lib/api-client'
import { CREATE_CUSTOMER_ROUTE, CREATE_SALE_ROUTE, GET_ITEM_ROUTE, GET_VENDOR_ROUTE } from '@/utils/constants'
import { PlusCircle, Trash2 } from 'lucide-react'


const sales = [
    {
        date: "25-01-2025",
        order_id: "VN24713",
        customer_name: "Rohan",
        amount: 24000
    }
]

const Sales = () =>
{
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [vendors, setVendors] = useState([])
    const [items, setItems] = useState([])

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [date, setDate] = useState("");
    const [vendor, setVendor] = useState("");
    const [quantity, setQuantity] = useState();
    const [saleItems, setSaleItems] = useState([]);
    const [amount, setAmount] = useState(0);
    const [rate, setRate] = useState(0);
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState("");

    const today = new Date().toISOString().split('T')[0];

    useEffect(() =>
    {
        setDate(today);
        getVendors();
        getItems();
    }, [])

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

    const getVendors = async () =>
    {
        try
        {
            const response = await apiClient.get(
                GET_VENDOR_ROUTE,
            )
            console.log(response.data.vendors)
            setVendors(response.data.vendors)
        } catch (error)
        {
            console.log({ error })
        }
    };

    const handleNewSale = async () => 
    {
        try
        {
            const customerResponse = await apiClient.post(
                CREATE_CUSTOMER_ROUTE,
                { name, phone: Number(phone), address }
            )

            const saleResponse = await apiClient.post(
                CREATE_SALE_ROUTE,
                { name, saleItems, vendorId: vendor?.id }
            )
        }
        catch (error)
        {
            console.log(error);
        }
    };

    // const updateItem = async (id, field, value) => 
    // {
    //     setItems(
    //         items.map(item =>
    //         {
    //             if (item.id === id)
    //             {
    //                 const updatedItem = { ...item, [field]: value };
    //                 updatedItem.amount = updatedItem.quantity * updatedItem.rate;
    //                 return updatedItem;
    //             }
    //             return item;
    //         })
    //     )
    // }

    return (
        <div className='min-h-screen bg-gray-100 p-6 pt-15'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold text-gray-800'>All Sales</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button><span className='mr-1'>+</span> New</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>New Sales Order</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="date">
                                    Date
                                </Label>
                                <Input type="date" id="date" className="col-span-2" value={today} disabled />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="customer">
                                    Customer
                                </Label>
                                <Input id="customer" className="col-span-2" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="phone">
                                    Phone
                                </Label>
                                <Input id="phone" className="col-span-2" value={phone} onChange={e => setPhone(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="address">
                                    Address
                                </Label>
                                <Input id="address" className="col-span-2" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="vendor">
                                    Vendor
                                </Label>
                                <Select id="vendor" className="w-full" value={vendor} onValueChange={(selectedVendor) =>
                                {
                                    setVendor(selectedVendor);

                                    const selectedVendorObj = vendors.find(v => v.name === selectedVendor);
                                    setCompany(selectedVendorObj ? selectedVendorObj.company : "")
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Vendor" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {vendors.map(vendor => (
                                            <SelectItem key={vendor.id} value={vendor.name}>{vendor.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="company">
                                    Company
                                </Label>
                                <Input id="company" className="col-span-2" value={company} readOnly disabled />
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="text-left">
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Item Name</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Price</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Select onValueChange={(selectedItem) =>
                                        {
                                            const selectedItemObj = items.find(i => i.name === selectedItem);
                                            const newRate = selectedItemObj ? selectedItemObj.rate : "";

                                            setRate(newRate);
                                            setAmount(newRate * quantity);

                                            setSaleItems([
                                                ...saleItems,
                                                { name: selectedItem, rate: newRate, quantity: quantity, amount: newRate * quantity }
                                            ]);
                                        }}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Item" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {items.filter(item => item.quantity > 0).map(item => (
                                                    <SelectItem key={item.id} value={item.name}>{item.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell><Input id="rate" type='number' value={rate} disabled></Input></TableCell>
                                    <TableCell><Input id="quantity" type='number' min='0' value={quantity} onChange={e =>
                                    {
                                        const newQuantity = Number(e.target.value);
                                        setQuantity(newQuantity);
                                        setAmount(newQuantity * rate)
                                    }}></Input></TableCell>
                                    <TableCell><Input id="amount" type='number' value={amount} disabled></Input></TableCell>
                                    {/* <TableCell><Button id="deleteItem" variant='ghost' size='icon'><Trash2 /></Button></TableCell> */}
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className='flex flex-col md:flex-row gap-6'>
                            <div className='w-full md:w-1/2'>
                                <Button variant='outline' className='flex items-center gap-2'>
                                    <PlusCircle />
                                    <span>Add New Row</span>
                                </Button>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleNewSale} type="submit">Sell</Button>
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
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Date</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Order ID</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Customer Name</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sales.map(sale => (
                                    <TableRow className="text-left" key={sale.order_id}>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{sale.date}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{sale.order_id}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{sale.customer_name}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><span>Rs. </span>{sale.amount}</TableCell>
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

export default Sales
