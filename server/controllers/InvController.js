import Item from "../models/ItemModel.js"

export const createItem = async (request, response) => 
{
    try
    {
        const { name, type, quantity, rate } = request.body;

        if (!name || !type || quantity === undefined || rate === undefined)
        {
            return response.status(400).json({ message: "All fields are required" });
        }

        const item = await Item.create({
            name,
            type,
            quantity,
            rate,
        });

        return response.status(201).json({
            item: {
                id: item.id,
                name: item.name,
                type: item.type,
                quantity: item.quantity,
                rate: item.rate,
            }
        });
    } catch (err)
    {
        console.log({ err });
        return response.status(500).send("Internal Server Error");
    }
}

export const getAllItems = async (request, response) => 
{
    try
    {
        const items = await Item.find();

        return response.status(200).json({ items });
    }
    catch (err)
    {
        console.error({ err });
        return response.status(500).send("Internal Server Error");
    }
}

export const deleteItem = async (request, response) =>
{
    try
    {
        const item = await Item.findByIdAndDelete(request.params.id);

        if (!item)
        {
            return response.status(404).json({
                message: "Item not found"
            });
        }

        return response.status(200).json({
            message: "Item deleted successfully."
        })
    }
    catch (err)
    {
        console.error({ err });
        return response.status(500).send("Internal Server Error");
    }
}