const { Role } = require("../../models");

const RoleService = {
    find : async (name) =>
    {
        try
        {
            const data = await Role.findOne({ name });

            return data;
        }
        catch (e)
        {
            console.log(e);
            throw e;
        }
    },
    all : async () =>
    {
        const data = await Role.find({ isActive: true });

        return data;
    },
    create : async (roleData) =>
    {
        const query = { name: roleData.name };
        const update = roleData;
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };

        Role.findOneAndUpdate(query, update, options, (error, result) =>
        {
            if (error)
            {
                console.log(error);
                throw error;
            }
        });
    },

};

module.exports = RoleService;
