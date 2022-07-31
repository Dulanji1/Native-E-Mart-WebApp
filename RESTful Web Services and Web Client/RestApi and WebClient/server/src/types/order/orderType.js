function OrderType()
{
    this.name = '';
    this.qty = '';
    this.discount = '';
    this.shippingDetails = '';
    this.total = '';
    this.cart = '';
    this.items = '';
    this.user = '';
}

OrderType.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = OrderType;
