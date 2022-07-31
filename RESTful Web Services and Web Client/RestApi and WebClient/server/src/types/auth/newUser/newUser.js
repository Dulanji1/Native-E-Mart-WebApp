function NewUser()
{
    this.name = '';
    this.email = '';
    this.password = '';
    this.phone = '';
    this.role = '';
}

NewUser.prototype.isValid = function()
{
    // check whether all the properties are not null and not empty
    return Object.values(this).some((x) => (x !== null && x !== ''));
};

module.exports = NewUser;
