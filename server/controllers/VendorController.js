import Vendor from "../models/VendorModel.js";

export const createVendor = async (request, response) => 
{
    try
    {
        const { name, company, phone, address } = request.body;

        if (!name || !company || phone == undefined || !address)
        {
            return response.status(400).json({ message: "All fields are required" });
        }

        const vendor = await Vendor.create(
            {
                name,
                company,
                phone,
                address
            }
        );

        return response.status(201).json({
            vendor: {
                id: vendor.id,
                name: vendor.name,
                company: vendor.company,
                phone: vendor.phone,
                address: vendor.address
            }
        });
    } catch (err)
    {
        console.log({ err });
        return response.status(500).send("Internal Server Error");
    }
}

export const getAllVendors = async (request, response) => 
{
    try
    {
        const vendors = await Vendor.find();

        return response.status(200).json({ vendors });
    }
    catch (err)
    {
        console.log({ err });
        return response.status(500).send("Internal Server Error");
    }
}

export const deleteVendor = async (request, response) => 
{
    try
    {
        const vendor = await Vendor.findByIdAndDelete(request.params.id);

        if (!vendor)
        {
            return response.status(404).json({
                message: "Vendor not found"
            });
        }

        return response.status(200).json({
            message: "Vendor deleted successfully"
        })
    }
    catch (err)
    {
        console.error({ err });
        return response.status(500).send("Internal Server Error");
    }
}

export const updateVendor = async (request, response) =>
{
    try
    {
        let vendor = await Vendor.findById(request.params.id);

        if (!vendor)
        {
            return response.status(400).json({
                message: "Vendor not found"
            })
        }

        vendor = await Vendor.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true }
        );

        response.status(200).json({
            vendor: {
                id: vendor.id,
                name: vendor.name,
                phone: vendor.phone,
                company: vendor.company,
                address: vendor.address,
            }
        })
    }
    catch (err)
    {
        console.error({ err });
        return response.status(500).send("Internal Server Error");
    }
}