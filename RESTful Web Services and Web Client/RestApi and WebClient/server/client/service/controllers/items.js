function getAllItems()
{
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_ITEMS; // Pass Complete end point Url
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let items;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);
        console.log('inside');

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            items = result.responseJSON;
            console.log(items.data);

            let temp = "";

            items.data.category.map((item) =>
            {
                console.log(item);

                let category = '';

                const ajaxCallParam = {};
                const ajaxDataParam = {};

                ajaxCallParam.Type = "GET"; // GET type function
                ajaxCallParam.Url = GET_CATEGORY_BY_ID + `${item.category}`; // Pass Complete end point Url
                ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

                ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
                {
                    console.log(result);

                    // check qpi request is success
                    if (result.status === 200)
                    {
                        // fetch the data
                        category = result.responseJSON;
                        console.log(category.data.category[0].name);

                        temp += "<tr>";
                        temp += `<td>${item.name}</td>`;
                        temp += `<td>${item.description}</td>`;
                        temp += `<td>${item.itemCode}</td>`;
                        temp += `<td>${item.buyPrice}</td>`;
                        temp += `<td>${item.sellPrice}</td>`;
                        temp += `<td>${item.weight}</td>`;
                        temp += `<td>${item.quantity}</td>`;
                        temp += `<td>${category.data.category[0].name}</td>`;
                        temp += `<td><button class="btn btn-warning" onClick=editItem("${item._id}")>Edit</button></td>`;
                        temp += `<td><button class="btn btn-danger" onClick=deleteItem("${item._id}")>Delete</button></td></tr>`;

                        document.getElementById('itemData').innerHTML = temp;
                    }
                    else
                    {
                        console.log(result.status);
                    }

                    return category;
                });
            });
        }
        else
        {
            console.log(result.status);
        }

        return items;
    });
}
function addItem()
{
    console.log('inside');

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_CATEGORIES; // Pass Complete end point Url
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let categories;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            categories = result.responseJSON;
            console.log(categories.data);

            let temp = "";

            categories.data.category.map((category) =>
            {
                // console.log(category._id)
                temp += `<option value="${category.name}">${category.name}</option>`;
            });
            document.getElementById('categorySelector').innerHTML = temp;
        }
        else
        {
            console.log(result.status);
        }

        return categories;
    });

    $.confirm({
        title   : 'Add Items!',
        content : ''
            + '<form action="" class="formName">'
            + '<div class="form-group">'
            + '<label>Item Name</label>'
            + '<input type="text" placeholder="Item Name" class="itemName form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item description</label>'
            + '<input type="text" placeholder="Item description" class="itemDescription form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Code</label>'
            + '<input type="text" placeholder="Item itemCode" class="itemCode form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Buy Price</label>'
            + '<input type="number" placeholder="Item buyPrice" class="itemBuyPrice form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Sell Price</label>'
            + '<input type="number" placeholder="Item sellPrice" class="itemSellPrice form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Weight</label>'
            + '<input type="number" placeholder="Item weight" class="itemWeight form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Quantity</label>'
            + '<input type="number" placeholder="Item quantity" class="itemQty form-control" required />'
            + '</div>'
            // + '<div class="form-group">'
            // + '<label>Item Img</label>'
            // + '<input type="text" placeholder="Item img" class="itemImg form-control" required />'
            // + '</div>'
            + '<div class="input-group mb-3">'
            + '<div class="input-group mb-3">'
            + '<label class="input-group-text" for="inputGroupFile01">'
            + '<i class="bi bi-upload"></i></label>'
            + '<input type="file" class="itemImg form-control" id="inputGroupFile01">'
            + '</div>'
            + '</div>'
            // + '<div class="form-group">'
            // + '<label>Item Category</label>'
            // + '<input   placeholder="Item category" class="itemCategory form-control" required />'
            // + '</div>'
            + '<div class="form-group">'
            + '<label>Item Category</label>'
            + '<select class="itemCategory form-select" id="categorySelector" placeholder="Select item category" type="text" required>'
            + '</select>'
            + '</div>'
            + '</form>',
        buttons : {
            formSubmit : {
                text     : 'Submit',
                btnClass : 'btn-blue',
                action ()
                {
                    const name = this.$content.find('.itemName').val();
                    const description = this.$content.find('.itemDescription').val();
                    const itemCode = this.$content.find('.itemCode').val();
                    const buyPrice = this.$content.find('.itemBuyPrice').val();
                    const sellPrice = this.$content.find('.itemSellPrice').val();
                    const weight = this.$content.find('.itemWeight').val();
                    const quantity = this.$content.find('.itemQty').val();
                    const img = this.$content.find('.itemImg').val();
                    const category = this.$content.find('.itemCategory').val();

                    if (!name)
                    {
                        $.alert('provide a valid name');

                        return false;
                    }
                    else if (!description)
                    {
                        $.alert('provide a valid description');

                        return false;
                    }
                    else if (!itemCode)
                    {
                        $.alert('provide a valid itemCode');

                        return false;
                    }
                    else if (!buyPrice)
                    {
                        $.alert('provide a valid buyPrice');

                        return false;
                    }
                    else if (!sellPrice)
                    {
                        $.alert('provide a valid sellPrice');

                        return false;
                    }
                    else if (!weight)
                    {
                        $.alert('provide a valid weight');

                        return false;
                    }
                    else if (!quantity)
                    {
                        $.alert('provide a valid quantity');

                        return false;
                    }
                    else if (!img)
                    {
                        $.alert('provide a valid image');

                        return false;
                    }
                    else if (!category)
                    {
                        $.alert('provide a valid category');

                        return false;
                    }
                    else
                    {
                        const ajaxCallParam = {};
                        const ajaxDataParam = {};

                        ajaxCallParam.Type = "POST"; // GET type function
                        ajaxCallParam.Url = ADD_ITEM; // Pass Complete end point
                        ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

                        ajaxDataParam.name = name;
                        ajaxDataParam.description = description;
                        ajaxDataParam.itemCode = itemCode;
                        ajaxDataParam.buyPrice = buyPrice;
                        ajaxDataParam.sellPrice = sellPrice;
                        ajaxDataParam.quantity = quantity;
                        ajaxDataParam.weight = weight;
                        ajaxDataParam.img = img;
                        ajaxDataParam.category = category;

                        let items = '';

                        ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
                        {
                            console.log(result);

                            // check qpi request is success
                            if (result.status === 200)
                            {
                                // fetch the data
                                items = result.responseJSON;
                                $.confirm({
                                    title   : '',
                                    content : 'Item added!',
                                    buttons : {
                                        OK()
                                        {
                                            window.location.href = '../../dashboard/items.html';
                                        },
                                    },
                                });
                            }
                            else if (result.status === 403)
                            {
                                $.confirm({
                                    title   : '',
                                    content : 'Error occured!',
                                    buttons : {
                                        OK()
                                        {
                                            window.location.href = '../../dashboard/items.html';
                                        },
                                    },
                                });
                            }
                            // return category;
                        });
                    }
                },
            },
            cancel()
            {
                // close
            },
        },
    });
}

function getCategoryById(_id)
{
    console.log(_id);

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_CATEGORY_BY_ID + `${_id}`; // Pass Complete end point Url
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let categories;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            categories = result.responseJSON;
            console.log(categories.data.category[0].name);
        }
        else
        {
            console.log(result.status);
        }
    });

    return categories;
}

function editItem(_id)
{
    console.log(_id);

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ITEM_BY_ID + `${_id}`; // Pass Complete end point
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let Item = '';

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            Item = result.responseJSON;
            console.log(Item.data);
        }
        else
        {
            console.log(result.status);
        }
        // return category;
    });

    $.confirm({
        title   : 'Edit Item!',
        content : ''
            + '<form action="" class="formName">'
            + '<div class="form-group">'
            + '<label>Item Name</label>'
            + '<input type="text" placeholder="Item Name" class="itemName form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item description</label>'
            + '<input type="text" placeholder="Item description" class="itemDescription form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Code</label>'
            + '<input type="text" placeholder="Item itemCode" class="itemCode form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Buy Price</label>'
            + '<input type="number" placeholder="Item buyPrice" class="itemBuyPrice form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Sell Price</label>'
            + '<input type="number" placeholder="Item sellPrice" class="itemSellPrice form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Weight</label>'
            + '<input type="number" placeholder="Item weight" class="itemWeight form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Quantity</label>'
            + '<input type="number" placeholder="Item quantity" class="itemQty form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Img</label>'
            + '<input type="text" placeholder="Item img" class="itemImg form-control" required />'
            + '</div>'
            + '<div class="form-group">'
            + '<label>Item Category</label>'
            + '<select class="itemCategory form-select" id="categorySelector" placeholder="Select item category" type="text" required>'
            + '</select>'
            + '</form>',
        buttons : {
            formSubmit : {
                text     : 'Submit',
                btnClass : 'btn-blue',
                action()
                {
                    const name = this.$content.find('.itemName').val();
                    const description = this.$content.find('.itemDescription').val();
                    const itemCode = this.$content.find('.itemCode').val();
                    const buyPrice = this.$content.find('.itemBuyPrice').val();
                    const sellPrice = this.$content.find('.itemSellPrice').val();
                    const weight = this.$content.find('.itemWeight').val();
                    const quantity = this.$content.find('.itemQty').val();
                    const img = this.$content.find('.itemImg').val();
                    const category = this.$content.find('.itemCategory').val();

                    if (!name)
                    {
                        $.alert('provide a valid name');

                        return false;
                    }
                    else if (!description)
                    {
                        $.alert('provide a valid description');

                        return false;
                    }
                    else if (!itemCode)
                    {
                        $.alert('provide a valid itemCode');

                        return false;
                    }
                    else if (!buyPrice)
                    {
                        $.alert('provide a valid buyPrice');

                        return false;
                    }
                    else if (!sellPrice)
                    {
                        $.alert('provide a valid sellPrice');

                        return false;
                    }
                    else if (!weight)
                    {
                        $.alert('provide a valid weight');

                        return false;
                    }
                    else if (!quantity)
                    {
                        $.alert('provide a valid quantity');

                        return false;
                    }
                    else if (!img)
                    {
                        $.alert('provide a valid image');

                        return false;
                    }
                    else if (!category)
                    {
                        $.alert('provide a valid category');

                        return false;
                    }
                    else
                    {
                        const ajaxCallParam = {};
                        const ajaxDataParam = {};

                        ajaxCallParam.Type = "PUT"; // GET type function
                        ajaxCallParam.Url = UPDATE_ITEM; // Pass Complete end point
                        ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

                        ajaxDataParam._id = _id;
                        ajaxDataParam.name = name;
                        ajaxDataParam.description = description;
                        ajaxDataParam.itemCode = itemCode;
                        ajaxDataParam.buyPrice = buyPrice;
                        ajaxDataParam.sellPrice = sellPrice;
                        ajaxDataParam.quantity = quantity;
                        ajaxDataParam.weight = weight;
                        ajaxDataParam.img = img;
                        ajaxDataParam.category = category;

                        ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
                        {
                            console.log(result);

                            // check qpi request is success
                            if (result.status === 200)
                            {
                                // fetch the data
                                Item = result.responseJSON;
                                console.log(`update + ${Item.data}`);
                                $.confirm({
                                    title   : '',
                                    content : 'Category updated!',
                                    buttons : {
                                        ok()
                                        {
                                            window.location.href = '../../dashboard/items.html';
                                        },
                                    },
                                });
                            }
                            else
                            {
                                console.log(result.status);
                            }
                            // return category;
                        });
                    }
                },
            },
            cancel()
            {
                // close
            },
        },
        onContentReady()
        {
            // bind to events
            const jc = this;

            // categories.map((category) =>
            // {
            //     category.name = this.$content.find('.categoryName').val();
            // });
            console.log(Item.data.category[0].category);

            const ajaxCallParam = {};
            const ajaxDataParam = {};

            ajaxCallParam.Type = "GET"; // GET type function
            ajaxCallParam.Url = GET_ALL_CATEGORIES; // Pass Complete end point Url
            ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

            let categories;

            let temp = "";

            ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
            {
                console.log(result);

                // check qpi request is success
                if (result.status === 200)
                {
                    // fetch the data
                    categories = result.responseJSON;
                    console.log(categories.data);

                    categories.data.category.map((category) =>
                    {
                        const ajaxCallParams = {};
                        const ajaxDataParams = {};

                        ajaxCallParams.Type = "GET"; // GET type function
                        ajaxCallParams.Url = GET_CATEGORY_BY_ID + `${Item.data.category[0].category}`; // Pass Complete end point Url
                        ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

                        let categoryForList;

                        ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
                        {
                            console.log(result);

                            // check qpi request is success
                            if (result.status === 200)
                            {
                                // fetch the data
                                categoryForList = result.responseJSON;
                                console.log(categoryForList.data.category[0].name);

                                document.getElementById('categorySelector').innerHTML = categoryForList.data.category[0].name;

                                // console.log(category._id)
                                temp += `<option value="${category.name}">${category.name}</option>`;
                                document.getElementById('categorySelector').innerHTML = temp;
                            }
                            else
                            {
                                console.log(result.status);
                            }
                        });

                        return categories;
                    });
                }
                else
                {
                    console.log(result.status);
                }

                return categories;
            });

            console.log(getCategoryById(Item.data.category[0].category));

            this.$content.find('.itemName').val(Item.data.category[0].name);
            this.$content.find('.itemDescription').val(Item.data.category[0].description);
            this.$content.find('.itemCode').val(Item.data.category[0].itemCode);
            this.$content.find('.itemBuyPrice').val(Item.data.category[0].buyPrice);
            this.$content.find('.itemSellPrice').val(Item.data.category[0].sellPrice);
            this.$content.find('.itemWeight').val(Item.data.category[0].weight);
            this.$content.find('.itemQty').val(Item.data.category[0].quantity);
            this.$content.find('.itemImg').val(Item.data.category[0].img);
            this.$content.find('.itemCategory').val(temp);

            this.$content.find('form').on('submit', (e) =>
            {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });
        },
    });
}

function deleteItem(_id)
{
    console.log(_id);

    $.confirm({
        title   : 'Confirm!',
        content : 'Delete this Item?',
        buttons : {
            confirm()
            {
                const ajaxCallParams = {};
                const ajaxDataParams = {};

                ajaxCallParams.Type = "DELETE"; // GET type function
                ajaxCallParams.Url = DELETE_ITEM +`${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
                ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

                ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
                {
                    // check qpi request is success
                    if (result.status === 200)
                    {
                        $.confirm({
                            title   : '',
                            content : 'Item Deleted!',
                            buttons : {
                                ok()
                                {
                                    window.location.href = '../../dashboard/items.html';
                                },
                            },
                        });
                    }
                    else if (result.status === 403)
                    {
                        // show the error message
                        $('.err-categoryName').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
                    }
                    else if (result.status === 400)
                    {
                        // show the error message
                        $('.err-categoryName').removeClass('d-none').html(result.responseJSON.message);
                    }
                });
            },
            cancel()
            {

            },
        },
    });
}
