function getAllDelivery()
{


    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_DELIVERY; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc


    let deliverys;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {

        console.log(result);
        console.log('inside');

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            deliverys = result.responseJSON;
            console.log(deliverys.data);

            let temp = "";

            deliverys.data.deliver.map((delivery) =>
            {
               console.log(delivery)
                temp += "<tr>";
                temp += "<td>" + delivery.deliveryId + "</td>";
                temp += "<td>" + delivery.name + "</td>";
                temp += "<td>" + delivery.address + "</td>";
                temp += "<td>" + delivery.email + "</td>";
                temp += "<td>" + delivery.phone + "</td>";
                temp += "<td>" + delivery.cashOnDelivery + "</td>";
                temp += "<td>" + delivery.deliveryType + "</td>";
                temp += "<td>" + delivery.costPerKm + "</td>";
                temp += `<td><button class=\"btn btn-warning\" onClick=editDelivery("${delivery._id}")>Edit</button></td>`;
                temp += `<td><button class=\"btn btn-danger\" onClick=deleteDelivery("${delivery._id}")>Delete</button></td></tr>`;

            });

            document.getElementById('deliveryData').innerHTML = temp;

        }else {
            console.log(result.status)
        }

        return deliverys;


    });

}

function addDelivery(){

    console.log('inside');

    let deliveryId  = $('#delivery-Id').val();
    let deliveryName  = $('#delivery-name').val();
    let deliveryAddress  = $('#delivery-address').val();
    let deliveryEmail  = $('#delivery-email').val();
    let deliveryPhone  = $('#delivery-phone').val();
    let deliveryCashOnDelivery = $('#delivery-cashOnDelivery').val();
    let deliveryType  = $('#delivery-Type').val();
    let deliveryCost  = $('#delivery-Cost').val();

    // check validations - delivery id
    if (deliveryId.length <= 0)
    {
        $('.err-deliveryId').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryId').addClass('d-none');
    }

    // check validations - deliveryName
    if (deliveryName.length <= 0)
    {
        $('.err-deliveryName').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryName').addClass('d-none');
    }

    // check validations - deliveryAddress
    if (deliveryAddress.length <= 0)
    {
        $('.err-deliveryAddress').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryAddress').addClass('d-none');
    }

    // check validations - deliveryEmail
    if (deliveryEmail.length <= 0)
    {
        $('.err-deliveryEmail').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryEmail').addClass('d-none');
    }

    // check validations - deliveryPhone
    if (deliveryPhone.length <= 0)
    {
        $('.err-deliveryPhone').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryPhone').addClass('d-none');
    }


    // check validations - deliveryCashOnDelivery
    if (deliveryCashOnDelivery.length <= 0)
    {
        $('.err-deliveryCashOnDelivery').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryCashOnDelivery').addClass('d-none');
    }

    // check validations - deliveryType
    if (deliveryType.length <= 0)
    {
        $('.err-deliveryType').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryType').addClass('d-none');
    }

    // check validations - deliveryCost
    if (deliveryCost.length <= 0)
    {
        $('.err-deliveryCost').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryCost').addClass('d-none');
    }


    // set the api call
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = ADD_DELIVERY; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters

    ajaxDataParams.deliveryId = deliveryId;
    ajaxDataParams.name = deliveryName;
    ajaxDataParams.address = deliveryAddress;
    ajaxDataParams.email = deliveryEmail;
    ajaxDataParams.phone = deliveryPhone;
    ajaxDataParams.cashOnDelivery = deliveryCashOnDelivery;
    ajaxDataParams.deliveryType = deliveryType;
    ajaxDataParams.costPerKm = deliveryCost;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            console.log("Add deliver details success");
            window.location.href = '../../dashboard/delivery.html';
        }
        else if (result.status === 403)
        {
            // show the error message
            $('.err-deliveryId').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
        }
        else if (result.status === 400)
        {
            // show the error message
            $('.err-deliveryId').removeClass('d-none').html(result.responseJSON.message);
        }
    });
}

function editDelivery(_id)
{
    console.log(_id);

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_DELIVERY_BY_ID + `${_id}`; // Pass Complete end point
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let deliverys = '';

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            deliverys = result.responseJSON;
            console.log(deliverys.data);
        }
        else
        {
            console.log(result.status);
        }
        // return category;
    });

    $.confirm({
        title   : 'Edit Delivery Details!',
        content : ''
            + '<form action="" class="formName">'
            + '<div class="form-group">'

            + '<label>Delivery Id</label>'
            + '<input type="text" placeholder="Delivery Id" class="deliveryId form-control" required />'

            + '<label>Name</label>'
            + '<input type="text" placeholder="Name" class="name form-control" required />'

            + '<label>Address</label>'
            + '<input type="text" placeholder="Address" class="address form-control" required />'

            + '<label>Email</label>'
            + '<input type="text" placeholder="Email" class="email form-control" required />'

            + '<label>Phone No</label>'
            + '<input type="text" placeholder="Phone No" class="phoneNo form-control" required />'

            + '<label>CashOnDelivery</label>'
            + '<input type="text" placeholder="CashOnDelivery" class="cashOnDelivery form-control" required />'

            + '<label>Delivery Type</label>'
            + '<input type="text" placeholder="Delivery Type" class="deliveryType form-control" required />'

            + '<label>Cost Per Km</label>'
            + '<input type="text" placeholder="Cost Per Km" class="costPerKm form-control" required />'

            + '</div>'
            + '</form>',
        buttons : {
            formSubmit : {
                text     : 'Submit',
                btnClass : 'btn-blue',
                action () {
                    const deliveryId = this.$content.find('.deliveryId').val();
                    const name = this.$content.find('.name').val();
                    const address = this.$content.find('.address').val();
                    const email = this.$content.find('.email').val();
                    const phoneNo = this.$content.find('.phoneNo').val();
                    const cashOnDelivery = this.$content.find('.cashOnDelivery').val();
                    const deliveryType = this.$content.find('.deliveryType').val();
                    const costPerKm = this.$content.find('.costPerKm').val();


                    if (!deliveryId )
                    {
                        $.alert('provide a valid deliveryId');

                        return false;
                    }
                    if (!name)
                    {
                        $.alert('provide a valid name');

                        return false;
                    }
                    if (!address)
                    {
                        $.alert('provide a valid address');

                        return false;
                    }
                    if (!email)
                    {
                        $.alert('provide a valid email');

                        return false;
                    }
                    if (!phoneNo)
                    {
                        $.alert('provide a valid phoneNo');

                        return false;
                    }

                    if (!cashOnDelivery)
                    {
                        $.alert('provide a valid cashOnDelivery');

                        return false;
                    }
                    if (!deliveryType)
                    {
                        $.alert('provide a valid deliveryType');

                        return false;
                    }
                    if (!costPerKm)
                    {
                        $.alert('provide a valid costPerKm');

                        return false;
                    }
                    else
                    {
                        const ajaxCallParam = {};
                        const ajaxDataParam = {};

                        ajaxCallParam.Type = "PUT"; // GET type function
                        ajaxCallParam.Url = UPDATE_DELIVERY; // Pass Complete end point
                        ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

                        const deliveryId = $('.deliveryId').val();
                        const name = $('.name').val();
                        const address = $('.address').val();
                        const email = $('.email').val();
                        const phoneNo = $('.phoneNo').val();
                        const cashOnDelivery = $('.cashOnDelivery').val();
                        const deliveryType = $('.deliveryType').val();
                        const costPerKm = $('.costPerKm').val();


                        ajaxDataParam._id = _id;
                        ajaxDataParam.deliveryId = deliveryId;
                        ajaxDataParam.name = name;
                        ajaxDataParam.address = address;
                        ajaxDataParam.email = email;
                        ajaxDataParam.phone = phoneNo;
                        ajaxDataParam.cashOnDelivery = cashOnDelivery;
                        ajaxDataParam.deliveryType = deliveryType;
                        ajaxDataParam.costPerKm = costPerKm;

                        ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
                        {
                            console.log(result);

                            // check qpi request is success
                            if (result.status === 200)
                            {
                                // fetch the data
                                deliverys = result.responseJSON;
                                console.log(`update + ${deliverys.data}`);
                                $.confirm({
                                    title   : '',
                                    content : 'Delivery Details updated!',
                                    buttons : {
                                        ok()
                                        {
                                            window.location.href = '../../dashboard/delivery.html';
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
            console.log(deliverys.data.deliver.deliveryId);


            this.$content.find('.deliveryId').val(deliverys.data.deliver.deliveryId);
            this.$content.find('.name').val(deliverys.data.deliver.name);
            this.$content.find('.address').val(deliverys.data.deliver.address);
            this.$content.find('.email').val(deliverys.data.deliver.email);
            this.$content.find('.phoneNo').val(deliverys.data.deliver.phone);
            this.$content.find('.cashOnDelivery').val(deliverys.data.deliver.cashOnDelivery);
            this.$content.find('.deliveryType').val(deliverys.data.deliver.deliveryType);
            this.$content.find('.costPerKm').val(deliverys.data.deliver.costPerKm);


            this.$content.find('form').on('submit', (e) =>
            {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                jc.$formSubmit.trigger('click'); // reference the button and click it
            });
        },
    });
}




function deleteDelivery(_id)
{
    console.log(_id);

    $.confirm({
        title   : 'Confirm!',
        content : 'Delete this Delivery Details?',
        buttons : {
            confirm()
            {
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "DELETE"; // GET type function
    ajaxCallParams.Url = DELETE_DELIVERY+`${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            $.confirm({
                title   : '',
                content : 'Delivery Details Deleted!',
                buttons : {
                    ok()
                    {
                        window.location.href = '../../dashboard/delivery.html';
                    },
                },
            });
        }
        else if (result.status === 403)
        {
            // show the error message
            $('.err-deliveryId').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
        }
        else if (result.status === 400)
        {
            // show the error message
            $('.err-deliveryId').removeClass('d-none').html(result.responseJSON.message);
        }
    });
            },
            cancel()
            {
            },
        },
    });
}
