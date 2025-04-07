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
import { CREATE_CUSTOMER_ROUTE, CREATE_SALE_ROUTE, GET_CUSTOMER_ROUTE, GET_ITEM_ROUTE, GET_SALE_ROUTE, GET_VENDOR_ROUTE } from '@/utils/constants'
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
    const [sales, setSales] = useState([])

    const [vendors, setVendors] = useState([]);
    const [items, setItems] = useState([]);
    // const [tempItems, setTempItems] = useState([]);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [date, setDate] = useState("");
    const [vendor, setVendor] = useState(null);
    const [company, setCompany] = useState("");
    const [saleItems, setSaleItems] = useState([]);

    const [customers, setCustomers] = useState([])
    const [customerId, setCustomerId] = useState("");

    const [selectedItem, setSelectedItem] = useState("");
    const [rate, setRate] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [amount, setAmount] = useState(0);

    const [nameAlert, setNameAlert] = useState(false);
    const [phoneAlert, setPhoneAlert] = useState(false);
    const [addressAlert, setAddressAlert] = useState(false);

    const [vendorAlert, setVendorAlert] = useState(false);

    const [itemAlert, setItemAlert] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const [maxQuantity, setMaxQuantity] = useState(0);

    const totalAmount = saleItems.reduce((sum, item) => sum + item.amount, 0);

    const [open, setOpen] = useState(false);
    const [saleDialog, setSaleDialog] = useState(false);

    useEffect(() =>
    {
        setDate(today);
        getVendors();
        getItems();
        getSales();
        getCustomers();

        if (!open)
        {
            resetFormFields();
        }
    }, [open])

    // useEffect(() => 
    // {
    //     setItems([...items])
    // }, [])

    const customer_details = [
        {
            title: "Name",
            state: name,
            setState: setName,
            alert: nameAlert,
            setAlert: setNameAlert
        },
        {
            title: "Phone",
            state: phone,
            setState: setPhone,
            alert: phoneAlert,
            setAlert: setPhoneAlert,
        },
        {
            title: "Address",
            state: address,
            setState: setAddress,
            alert: addressAlert,
            setAlert: setAddressAlert
        }
    ]

    const getSales = async () => 
    {
        try
        {
            const response = await apiClient.get(GET_SALE_ROUTE)
            setSales(response.data.sales)
        }
        catch (error)
        {
            console.log({ error });
        }
    }

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

    const getItems = async () => 
    {
        try
        {
            const response = await apiClient.get(GET_ITEM_ROUTE)
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
            const response = await apiClient.get(GET_VENDOR_ROUTE)

            setVendors(response.data.vendors)
        } catch (error)
        {
            console.log({ error })
        }
    };

    const resetItemForm = () =>
    {
        setSelectedItem("");
        setRate(0);
        setQuantity(1);
        setAmount(0);
    }

    const handleAddItem = () =>
    {
        if (!selectedItem || quantity <= 0)
        {
            return;
        }

        const newItem = {
            name: selectedItem,
            rate: rate,
            quantity: quantity,
            amount: rate * quantity
        }

        setSaleItems([...saleItems, newItem]);

        console.log("Before Add Items: ", items)

        const updateItems = items.map(item =>
        {
            if (item.name === selectedItem)
            {
                return {
                    ...item,
                    quantity: item.quantity - quantity
                }
            }
            return item;
        })

        console.log(updateItems)

        setItems(updateItems);

        console.log("After Add Items: ", items)

        // setMaxQuantity(0);
        resetItemForm();
    }

    const handleRemoveItem = (index) =>
    {
        // const itemToRemove = saleItems[index];

        // const updateTempItems = tempItems.map(item =>
        // {
        //     if (item.name === itemToRemove.name)
        //     {
        //         return {
        //             ...item,
        //             quantity: item.quantity + itemToRemove.quantity
        //         }
        //     }
        //     return item;
        // })

        // setTempItems(updateTempItems)

        const updatedItems = [...saleItems];
        updatedItems.splice(index, 1);
        setSaleItems(updatedItems)
    }

    const validateData = () =>
    {
        let isValid = true;
        customer_details.forEach(({ state, setAlert }) => 
        {
            const isEmpty = state === "" || state === undefined;
            if (setAlert) setAlert(isEmpty);
            if (isEmpty) isValid = false;
        })

        if (!vendor)
        {
            setVendorAlert(true);
            isValid = false;
        }

        if (saleItems.length === 0)
        {
            setItemAlert(true);
            isValid = false;
        }

        if (isValid)
        {
            handleNewSale();
            setOpen(false)
        }
    }

    const handleNewSale = async () => 
    {
        try
        {
            const customerResponse = await apiClient.post(
                CREATE_CUSTOMER_ROUTE,
                { name, phone: Number(phone), address }
            );

            const customerId = customerResponse.data.customer.id;

            const saleData = {
                customer: customerId,
                saleItems: saleItems.map(item => ({
                    name: item.name,
                    rate: item.rate,
                    quantity: item.quantity,
                    amount: item.amount
                })),
                vendorId: vendor._id,
                totalAmount: totalAmount
            };


            const saleResponse = await apiClient.post(
                CREATE_SALE_ROUTE,
                saleData
            );

            getSales();
            resetFormFields();
        }
        catch (error)
        {
            console.log("Error details:", error.response?.data || error.message);
            console.log("Full error:", error);
        }
    };

    const resetFormFields = () =>
    {
        if (!open)
        {
            customer_details.forEach(({ setState, setAlert }) => 
            {
                setState("");
                if (setAlert) setAlert(false);
            })
            setVendor(null);
            setCompany("");
            setSaleItems([]);
            resetItemForm();
            setVendorAlert(false);
            setItemAlert(false)

            // setTempItems([...items])
        }
    }

    const handleDialogClose = (isOpen) =>
    {
        console.log(isOpen)
        if (!isOpen)
        {
            resetFormFields();
        }

        setOpen(isOpen)
    }

    const handleSaleClick = (sale) =>
    {
        setSaleDialog(true)
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6 pt-15'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold text-primary'>All Sales</h1>
                <Dialog open={open} onOpenChange={handleDialogClose}>
                    <DialogTrigger asChild>
                        <Button><span className='mr-1'>+</span> New</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Sales Order</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="date">
                                    Date
                                </Label>
                                <Input type="date" id="date" className="col-span-2" value={date} disabled />
                            </div>
                            {customer_details.map(({ title, state, setState, alert, setAlert }) =>
                            {
                                return (
                                    <div key={title} className='grid grid-cols-3 items-center gap-0'>
                                        <Label htmlFor={title.toLowerCase()}>
                                            {title === "Name" ? "Customer" : title}
                                        </Label>
                                        <Input
                                            id={title.toLowerCase()}
                                            className="col-span-2"
                                            value={state}
                                            maxLength={title === "Phone" ? 10 : undefined}
                                            onChange={(e) => 
                                            {
                                                setState(e.target.value)
                                                setAlert(false)
                                            }
                                            }
                                        />
                                        {
                                            alert && (
                                                <span className='text-[12px]/6 col-start-2 col-span-2 text-[#e66262]'>{title === "Name" ? "Customer" : title} is required.</span>
                                            )
                                        }
                                    </div>
                                )
                            })}
                            <div className="grid grid-cols-3 items-center gap-0">
                                <Label htmlFor="vendor">
                                    Vendor
                                </Label>
                                <Select id="vendor" value={vendor?._id} onValueChange={(selectedVendorId) =>
                                {
                                    const selectedVendorObj = vendors.find(v => v._id === selectedVendorId);
                                    setVendor(selectedVendorObj);
                                    setVendorAlert(false);
                                    setCompany(selectedVendorObj ? selectedVendorObj.company : "")
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Vendor" />
                                    </SelectTrigger>
                                    <SelectContent >
                                        {vendors.map(vendor => (
                                            <SelectItem key={vendor._id} value={vendor._id}>{vendor.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {vendorAlert && (
                                    <span className="text-[12px]/6 col-start-2 col-span-2 text-[#e66262]">Please select the vendor</span>
                                )}
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="company">
                                    Company
                                </Label>
                                <Input id="company" className="col-span-2" value={company} readOnly disabled />
                            </div>
                        </div>
                        <div className='grid gap-4 py-4'>
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
                                            <Select value={selectedItem} onValueChange={(selectedItem) =>
                                            {
                                                setSelectedItem(selectedItem)

                                                const selectedItemObj = items.find(i => i.name === selectedItem);
                                                const newRate = selectedItemObj ? selectedItemObj.rate : "";

                                                const availQuantity = selectedItemObj ? selectedItemObj.quantity : 0;
                                                setMaxQuantity(availQuantity);

                                                setRate(newRate);
                                                setAmount(newRate * quantity);
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
                                        <TableCell><Input id="quantity" type='number' min='1' max={maxQuantity} value={quantity} onChange={e =>
                                        {
                                            const newQuantity = Number(e.target.value);

                                            // const validQuantity = Math.min(newQuantity, maxQuantity)

                                            setQuantity(newQuantity);
                                            setAmount(newQuantity * rate)
                                        }}></Input></TableCell>
                                        <TableCell><Input id="amount" type='number' value={amount} disabled></Input></TableCell>
                                    </TableRow>
                                </TableBody>
                                {itemAlert && (
                                    <span className="text-[12px]/6 col-start-2 col-span-2 text-[#e66262]">Please add item</span>
                                )}
                            </Table>
                            <div className='flex flex-col md:flex-row gap-6'>
                                <div className='w-full md:w-1/2'>
                                    <Button variant='outline' className='flex items-center gap-2' onClick={handleAddItem}>
                                        <PlusCircle />
                                        <span>Add Item</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {saleItems.length > 0 && (
                            <div className='grid gap-4 py-4'>
                                <h1 className='font-semibold text-base'>Cart</h1>
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
                                        {
                                            saleItems.map((item, index) => (
                                                <TableRow key={item.id ?? index} className="text-left">
                                                    <TableCell className="px-4 py-2">{item.name}</TableCell>
                                                    <TableCell className="px-4 py-2">{item.rate}</TableCell>
                                                    <TableCell className="px-4 py-2">{item.quantity}</TableCell>
                                                    <TableCell className="px-4 py-2">{item.amount}</TableCell>
                                                    <TableCell className="px-4 py-2">
                                                        <Button variant='ghost' size='icon' onClick={() => handleRemoveItem(index)}><Trash2 /></Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                        <DialogFooter>
                            <Button onClick={validateData} type="submit">Sell</Button>
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
                                {sales.map(sale => 
                                {
                                    const properDate = new Date(sale.saleDate).toISOString().split("T")[0];
                                    const customerObj = customers.find(c => c._id === sale.customer);
                                    const customerName = customerObj ? customerObj.name : "";

                                    return (
                                        <TableRow onClick={() => handleSaleClick(sale)} className="text-left" key={sale._id}>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{properDate}</TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{sale.id}</TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customerName}</TableCell>
                                            <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><span>Rs. </span>{sale.totalAmount}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>

                        <Dialog open={saleDialog} onOpenChange={setSaleDialog}>
                            <DialogContent className="sm:max-w-7xl"> Sale</DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sales
