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
import { CREATE_VENDOR_ROUTE, DELETE_VENDOR_ROUTE, GET_VENDOR_ROUTE, UPDATE_VENDOR_ROUTE } from '@/utils/constants'
import { Ellipsis } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import CustomDialog from '@/components/ui/Vendor Dialog/custom-dialog'


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
    const [vendors, setVendors] = useState([])

    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [nameAlert, setNameAlert] = useState(false);
    const [companyAlert, setCompanyAlert] = useState(false);
    const [phoneAlert, setPhoneAlert] = useState(false);
    const [addressAlert, setAddressAlert] = useState(false);

    const vendor_details = [
        {
            title: "Vendor",
            state: name,
            setState: setName,
            alert: nameAlert,
            setAlert: setNameAlert,
        },
        {
            title: "Company",
            state: company,
            setState: setCompany,
            alert: companyAlert,
            setAlert: setCompanyAlert,
        },
        {
            title: "Phone",
            state: phone,
            setState: setPhone,
            alert: phoneAlert,
            setAlert: setPhoneAlert
        },
        {
            title: "Address",
            state: address,
            setState: setAddress,
            alert: addressAlert,
            setAlert: setAddressAlert
        }
    ]

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
            await apiClient.post(
                CREATE_VENDOR_ROUTE,
                {
                    name,
                    company,
                    phone,
                    address
                }
            );

            getVendors();
            resetFormFields();

        } catch (error)
        {
            console.log(error);
        }
    }

    const handleEditVendor = async (id) =>
    {
        try
        {
            await apiClient.put(`${UPDATE_VENDOR_ROUTE}/${id}`,
                {
                    name,
                    company,
                    phone,
                    address
                }
            )

            getVendors();
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
            setCompany("");
            setPhone("");
            setAddress("");
    
            setNameAlert(false);
            setCompanyAlert(false);
            setPhoneAlert(false);
            setAddressAlert(false);
        }

    const handleDeleteVendor = async (id) =>
    {
        try
        {
            await apiClient.delete(
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
                <h1 className='text-2xl font-bold text-primary'>All Vendors</h1>
                <CustomDialog
                    mode="add"
                    vendorDetails={vendor_details}
                    handleSubmit={handleAddVendor}
                    triggerText="Add Vendor"
                />
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
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild><Button variant="ghost"><Ellipsis /></Button></DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <CustomDialog
                                                        mode="edit"
                                                        vendorDetails={vendor_details}
                                                        handleSubmit={() => handleEditVendor(vendor._id)}
                                                        triggerText="Edit Vendor"
                                                        selectedVendor={vendor}
                                                    />
                                                    <DropdownMenuItem onClick={() => handleDeleteVendor(vendor._id)}>Delete</DropdownMenuItem>
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

export default Vendors
