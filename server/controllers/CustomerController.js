import Customer from "../models/CustomerModel.js";


export const createCustomer = async (request, response) =>
{
    try
    {
        const { name, phone, address } = request.body;

        if (!name)
        {
            return response.status(400).json({ message: "Name is required" });
        }

        const customer = await Customer.create(
            {
                name,
                phone,
                address
            }
        );

        return response.status(201).json({
            customer: {
                id: customer.id,
                name: customer.name,
                phone: customer.phone,
                address: customer.address
            }
        });
    }
    catch (err)
    {
        console.log({ err });
        return response.status(500).send("Internal Server Error");
        // return response.status(500).send("Internal Server Error");
    }
}

export const getAllCustomers = async (request, response) =>
{
    try
    {
        const customer = await Customer.find();

        return response.status(200).json({ customer });
    }
    catch (err)
    {
        console.log({ err });
        return response.status(500).send("Internal Server Error");
    }
}

export const deleteCustomer = async (request, response) =>
{
    try
    {
        const customer = await Customer.findByIdAndDelete(request.params.id);

        if (!customer)
        {
            return response.status(404).json({
                message: "Customer not found"
            })
        }

        return response.status(200).json({
            message: "Customer deleted successfully."
        })
    }
    catch (err)
    {
        console.error({ err });
        return response.status(500).send("Internal Server Error");
    }
}

export const updateCustomer = async (request, response) =>
{
    try
    {
        let customer = await Customer.findById(request.params.id);

        if (!customer)
        {
            return response.status(400).json({
                message: "Customer not found"
            })
        }

        customer = await Customer.findByIdAndUpdate(request.params.id, request.body);

        response.status(200).json(customer)
    }
    catch (err)
    {
        console.error({ err });
        return response.status(500).send("Internal Server Error")
    }
}