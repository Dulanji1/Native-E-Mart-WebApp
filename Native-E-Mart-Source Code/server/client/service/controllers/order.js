$( document ).ready(function() {
    const header = renderNavigationBar('order');
    $("#header").append( header );
});

function addOrder(_id) {
    console.log('inside');
    console.log(_id);

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    const sessionData = getSession();
    console.log(sessionData.authData.user.email);
    let userEmail = sessionData.authData.user.email;

    const cartItem = getCart();
    console.log(cartItem.cart.item._id);
    let userItem = cartItem.cart.item._id;

        ajaxDataParams.name = userEmail;
        ajaxDataParams.item = _id;
        ajaxDataParams.cart = id;
        ajaxDataParams.discount = 0,
        ajaxDataParams.shippingDetails = '',
        ajaxDataParams.total =''

    // const cartName = $('#cart-name').val();

    // check validations
    // if (quantity.length <= 0) {
    //        $('.err-cartName').removeClass('d-none');
    //
    //
    //        return;
    //    } else {
    //        $('.err-cartName').addClass('d-none');
    //    }



    ajaxCallParams.Type = "POST"; // POST type function

    ajaxCallParams.Url = ADD_ORDER; // Pass Complete end point
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters
    // ajaxDataParams.name = cartName;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {
        // check qpi request is success
        if (result.status === 200) {
            console.log("add order success");
            window.location.href = '../../checkout.html';
        } else if (result.status === 403) {
            // show the error message
            $('.err-orderName').removeClass('d-none').html(`${result.responseJSON.message}`);
            console.log(result.status);
        } else if (result.status === 400) {
            // show the error message
            $('.err-orderName').removeClass('d-none').html(result.responseJSON.message);
            console.log(result.status);
        }
    });
}

function getOder(){

    let orderItem;


    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ORER; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let order;



    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {

        console.log(result.status);

        // check qpi request is success
        if (result.status === 200) {
            // fetch the data
            cart = result.responseJSON;
            console.log(oder.data);

            let temp = "";

            cart.data.cart.map(order => {

                console.log(order.item);


                const ajaxCallParams = {};
                const ajaxDataParams = {};

                ajaxCallParams.Type = "GET"; // POST type function

                ajaxCallParams.Url = GET_CART_BY_ID + `${cart.item}`; // Pass Complete end point
                ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

                // Set Data parameters

                ajaxDataParams._id = cart.item;

                ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {
                    // check qpi request is success
                    if (result.status === 200) {
                        console.log("get order success");
                        cartItem = result.responseJSON;
                        console.log(cartItem.data);

                        /*******/

                        /********************/

                        document.getElementById('orderData').innerHTML = temp;

                        // window.location.href = '../../dashboard/cart.html';
                    } else if (result.status === 403) {
                        // show the error message
                        $('.err-orderName').removeClass('d-none').html(`${result.responseJSON.message}`);
                        console.log(result.status);
                    } else if (result.status === 400) {
                        // show the error message
                        $('.err-orderName').removeClass('d-none').html(result.responseJSON.message);
                        console.log(result.status);
                    }

                });

            });

        } else {
            console.log(result.status)
        }

        return cart;
    });

}


