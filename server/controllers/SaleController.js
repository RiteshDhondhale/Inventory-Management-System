import Sale from "../models/SaleModel.js"
import Customer from "../models/CustomerModel.js";
import Vendor from "../models/VendorModel.js";
import Item from "../models/ItemModel.js";

export const createSale = async (request, response) =>
{
    try
    {
        const { customer, saleItems, vendorId, totalAmount } = request.body;

        let customerDoc;

        customerDoc = await Customer.findOne({ id: customer });
        if (!customerDoc)
        {
            return response.status(404).json({
                message: "Customer not found"
            })
        }


        const vendor = await Vendor.findById(vendorId);
        if (!vendor)
        {
            return response.status(404).json({
                message: "Vendor not found"
            })
        }

        for (const item of saleItems)
        {
            const inventoryItem = await Item.findOne({ name: item.name });
            if (!inventoryItem)
            {
                return response.status(404).json({
                    message: `Item ${item.name} not found in inventory`
                })
            }

            if (inventoryItem.quantity < item.quantity)
            {
                return response.status(400).json({
                    message: `Not enough ${item.name} in inventory. Available: ${inventoryItem.quantity}`
                })
            }
        }

        for (const item of saleItems)
        {
            const inventoryItem = await Item.findOne({ name: item.name });
            inventoryItem.quantity -= item.quantity;
            await inventoryItem.save();
        }

        const newSale = new Sale({
            customer: customerDoc._id,
            vendorId: vendor._id,
            saleItems,
            totalAmount
        });

        const sale = await newSale.save();


        return response.status(201).json({
            sale
        });
    }
    catch (err)
    {
        console.log({ err });
        return response.status(500).send("Internal Server Error")
    }
}

export const getAllSales = async (request, response) =>
{
    try
    {
        const sales = await Sale.find();

        return response.status(200).json({ sales });
    }
    catch (err)
    {
        console.error({ err });
        return response.status(500).send("Internal Server Error");
    }
}