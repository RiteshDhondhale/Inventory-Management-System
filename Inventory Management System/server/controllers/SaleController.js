import Sale from "../models/SaleModel.js"


export const createSale = async (request, response) =>
{
    try
    {
        const { customer, items, vendorId } = request.body;
        
        const sale = await Sale.create({
            customer,
            items,
            vendorId
        })

        return response.status(201).json({
            sale: {
                id: sale.id,
                customer: sale.customer,
                items: sale.items,
                vendorId: sale.vendorId,
                totalAmount: sale.totalAmount,
                saleDate: sale.saleDate
            }
        })
    }
    catch (err)
    {
        console.log({ err });
        return response.status(500).send("Internal Server Error")
    }
}