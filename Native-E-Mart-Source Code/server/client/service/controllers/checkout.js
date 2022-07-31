$( document ).ready(function() {
    const header = renderNavigationBar('checkout');
    $("#header").append( header );
});

function checkout()
{
    console.log('checkout');
    let paymentMethod = 'card';

    // set the api call
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    if (paymentMethod = 'card')
    {
        ajaxCallParams.Type = "POST"; // POST type function
        ajaxCallParams.Url = ADD_CARD_PAYMENT; // Pass Complete end point
        ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc
        ajaxCallParams.crossDomain = true;

        // Set Data parameters
        ajaxDataParams.app_name = "ABC";
        ajaxDataParams.service = "Electronic Items";
        ajaxDataParams.customer_email = "shalithax@gmail.com";
        ajaxDataParams.card_type = "VISA";
        ajaxDataParams.card_holder_name = "Example";
        ajaxDataParams.card_number = "4242424242424242";
        ajaxDataParams.expiryMonth = "01";
        ajaxDataParams.expiryYear = "2020";
        ajaxDataParams.cvv = "123";
        ajaxDataParams.amount = "5000.00";
        ajaxDataParams.currency = "USD";

        ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
        {
            // check qpi request is success
            if (result.status === 200)
            {
                const resultData = result.responceJSON;

                console.log(resultData);
                $.confirm({
                    title   : '',
                    content : 'Payment successfull',
                    buttons : {
                        OK()
                        {
                            window.location.href = '../index.html';
                        },
                    },
                });
            }
            else if (result.status === 403)
            {
                // show the error message
                $('.err-categoryName').removeClass('d-none').html(`${result.responseJSON.message}`);
            }
            else if (result.status === 400)
            {
                // show the error message
                $('.err-categoryName').removeClass('d-none').html(result.responseJSON.message);
            }
        });
    }
    else if (paymentMethod = 'phone')
    {
        ajaxCallParams.Type = "POST"; // POST type function
        ajaxCallParams.Url = ADD_CARD_PAYMENT; // Pass Complete end point
        ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc
        ajaxCallParams.crossDomain = true;

        // Set Data parameters
        ajaxDataParams.app_name = "ABC";
        ajaxDataParams.service = "Electronic Items";
        ajaxDataParams.customer_email = "shalithax@gmail.com";
        ajaxDataParams.card_type = "VISA";
        ajaxDataParams.card_holder_name = "Example";
        ajaxDataParams.card_number = "4242424242424242";
        ajaxDataParams.expiryMonth = "01";
        ajaxDataParams.expiryYear = "2020";
        ajaxDataParams.cvv = "123";
        ajaxDataParams.amount = "5000.00";
        ajaxDataParams.currency = "USD";

        ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
        {
            // check qpi request is success
            if (result.status === 200)
            {
                const resultData = result.responceJSON;

                console.log(resultData);
                $.confirm({
                    title   : '',
                    content : 'Payment successfull',
                    buttons : {
                        OK()
                        {
                            window.location.href = '../index.html';
                        },
                    },
                });
            }
            else if (result.status === 403)
            {
                // show the error message
                $('.err-categoryName').removeClass('d-none').html(`${result.responseJSON.message}`);
            }
            else if (result.status === 400)
            {
                // show the error message
                $('.err-categoryName').removeClass('d-none').html(result.responseJSON.message);
            }
        });
    }
}
