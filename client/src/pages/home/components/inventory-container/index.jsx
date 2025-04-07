import React, { useEffect, useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiClient } from '@/lib/api-client'
import { CREATE_ITEM_ROUTE, DELETE_ROUTE, GET_ITEM_ROUTE, UPDATE_ROUTE } from '@/utils/constants'


import { Ellipsis } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import CustomDialog from '@/components/ui/Inventory Dialog/custom-dialog'
import { Button } from '@/components/ui/button'

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
    const [stock, setStock] = useState();
    const [rate, setRate] = useState();

    const [nameAlert, setNameAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState(false);
    const [stockAlert, setStockAlert] = useState(false);
    const [rateAlert, setRateAlert] = useState(false);

    const item_details = [
        {
            title: "Name",
            state: name,
            setState: setName,
            alert: nameAlert,
            setAlert: setNameAlert,
        },
        {
            title: "Type",
            state: type,
            setState: setType,
            alert: typeAlert,
            setAlert: setTypeAlert,
        },
        {
            title: "Stock",
            state: stock,
            setState: (val) => setStock(val),
            alert: stockAlert,
            setAlert: setStockAlert,
        },
        {
            title: "Rate",
            state: rate,
            setState: (val) => setRate(val),
            alert: rateAlert,
            setAlert: setRateAlert,
        }
    ];

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
            const response = await apiClient.post(CREATE_ITEM_ROUTE,
                {
                    name,
                    type,
                    quantity: Number(stock),
                    rate: Number(rate)
                }
            );

            console.log(response.data.item)

            getItems();
            resetFormFields();

        } catch (error)
        {
            console.log(error);
        }
    }

    const handleEditItem = async (id) =>
    {
        try
        {
            await apiClient.put(`${UPDATE_ROUTE}/${id}`,
                {
                    name,
                    type,
                    quantity: Number(stock),
                    rate: Number(rate)
                }
            )

            getItems();
            resetFormFields();
        }
        catch (error)
        {
            console.log(error);
        }
    }

    const resetFormFields = () =>
    {
        setName("");
        setType("");
        setStock("");
        setRate("");


        setNameAlert(false);
        setTypeAlert(false);
        setStockAlert(false);
        setRateAlert(false);
    }

    const handleDeleteItem = async (id) =>
    {
        try
        {
            await apiClient.delete(`${DELETE_ROUTE}/${id}`)
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
                <h1 className='text-2xl font-bold text-primary'>All Items</h1>
                <CustomDialog
                    mode="add"
                    itemDetails={item_details}
                    handleSubmit={handleAddItem}
                    triggerText="Add Item" />
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
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild><Button variant="ghost"><Ellipsis /></Button></DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <CustomDialog
                                                        mode="edit"
                                                        itemDetails={item_details}
                                                        handleSubmit={() => handleEditItem(item._id)}
                                                        triggerText="Edit Item"
                                                        selectedItem={item} />
                                                    <DropdownMenuItem onClick={() => handleDeleteItem(item._id)}>Delete</DropdownMenuItem>
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

export default Inventory
