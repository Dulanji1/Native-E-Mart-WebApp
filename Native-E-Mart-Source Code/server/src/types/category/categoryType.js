function CategoryType()
{
    this.name = '';
}

CategoryType.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = CategoryType;
