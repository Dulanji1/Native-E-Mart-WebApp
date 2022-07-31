function CartType()
{
    this.name = '';
    this.user = '';
    this.items = '';
    this.qty = '';
}

CartType.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = CartType;
