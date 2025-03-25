import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GET_CUSTOMER_ROUTE } from '@/utils/constants'

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
            console.log(response.data)
        }
        catch (error)
        {
            console.log({ error })
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 p-6 pt-15'>
            <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold text-gray-800'>All Customers</h1>
                {/* <Button><span className='mr-1'>+</span> New</Button> */}
            </div>
            <div className='mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
                <div className='p-4 bg-white'>
                    <div className='overflow-x-auto'>
                        <Table>
                            <TableHeader>
                                <TableRow className="text-left">
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Customer Name</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Phone</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Address</TableHead>
                                    <TableHead className="px-6 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider">Amounts</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map(customer => (
                                    <TableRow className="text-left" key={customer.name}>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.name}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.phone}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{customer.address}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><span>Rs. </span>{customer.amount}</TableCell>
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
