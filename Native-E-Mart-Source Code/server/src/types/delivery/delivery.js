function DeliveryType()
{
    this.deliveryId = '';
    this.name = '';
    this.address = '';
    this.email = '';
    this.phone = '';
    this.cashOnDelivery = '';
    this.deliveryType = '';
    this.costPerKm = '';
    this.isActive = '';
}

DeliveryType.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = DeliveryType;
