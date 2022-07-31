function ItemType()
{
    this.name = '';
    this.description = '';
    this.itemCode = '';
    this.buyPrice = '';
    this.sellPrice = '';
    this.weight = '';
    this.quantity = '';
    this.isActive = '';
    this.img = '';
    this.category = '';
}

ItemType.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = ItemType;
