function CredentialType()
{
    this.email = '';
    this.password = '';
}

CredentialType.prototype.isValid = function()
{
    return this.email.length > 0 && this.password.length > 0;
};

module.exports = CredentialType;
