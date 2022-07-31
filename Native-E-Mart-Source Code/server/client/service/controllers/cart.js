$( document ).ready(function() {
    const header = renderNavigationBar('cart');
    $("#header").append( header );
});


/*function addToCart(_id){
    console.log(_id);
    window.location.replace('cart.html');

}*/

function addToCart(_id) {
    console.log('inside');
    console.log(_id);

    const ajaxCallParams = {};
    const ajaxDataParams = {};


    const sessionData = getSession();
    console.log(sessionData.authData.user.email);

    let userEmail = sessionData.authData.user.email;

    // const quantity = $('#qty').val();
    ajaxDataParams.name = 'test img';
    ajaxDataParams.user = userEmail;
    ajaxDataParams.item = _id;
    ajaxDataParams.qty = 1;


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

     ajaxCallParams.Url = ADD_CART; // Pass Complete end point
     ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

     // Set Data parameters
     // ajaxDataParams.name = cartName;

     ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {
            // check qpi request is success
            if (result.status === 200) {
                console.log("add category success");
                window.location.href = '../../cart.html';
            } else if (result.status === 403) {
                // show the error message
                $('.err-cartName').removeClass('d-none').html(`${result.responseJSON.message}`);
                console.log(result.status);
            } else if (result.status === 400) {
                // show the error message
                $('.err-cartName').removeClass('d-none').html(result.responseJSON.message);
                console.log(result.status);
            }
        });
}




function getCart() {

    let cartItem;


    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_CART; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let cart;
    let total = 0;

    let itemsInCart = [];

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {

        console.log(result.status);

        // check qpi request is success
        if (result.status === 200) {
            // fetch the data
            cart = result.responseJSON;
            console.log(cart.data);

            let temp = "";

            cart.data.cart.map(cart => {

                console.log(cart.item);


                const ajaxCallParams = {};
                const ajaxDataParams = {};

                ajaxCallParams.Type = "GET"; // POST type function

                ajaxCallParams.Url = GET_ITEM_BY_ID + `${cart.item}`; // Pass Complete end point
                ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

                // Set Data parameters

                ajaxDataParams._id = cart.item;

               ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {
                    // check qpi request is success
                    if (result.status === 200) {
                        console.log("get cart success");
                        cartItem = result.responseJSON;
                        console.log(cartItem.data);

                        itemsInCart.push(cartItem.data.category[0].sellPrice);

                        total = total + cartItem.data.category[0].sellPrice;

                        console.log(total)
                        /*******/
                        temp += "<tr>";
                        temp += " <td className=\"cart_product_img\">";
                        temp += "<a href=\"#\"><img src=\"./assets/images/bg-img/cart1.jpg\" alt=\"Product\"></a>";
                        temp += "</td>";
                        temp += " <td className=\"cart_product_desc\">";
                        temp += " <h5>" + cartItem.data.category[0].name + "</h5>";
                        temp += " </td>";
                        temp += " <td className=\"price\">";
                        temp += ` <span>${cartItem.data.category[0].sellPrice}</span>`;
                        temp += "</td>";
                        temp += " <td className=\"qty\">";
                        temp += "<div className=\"qty-btn d-flex\">";
                        // temp += `<p>${cartItem.data.category[0].sellPrice}</p>`
                        temp += "<div className=\"quantity\">";
                        temp += " <span className=\"qty-minus\"";
                        temp += " onClick=\"var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;\">\" + \"<i";
                        temp += "className=\"fa fa-minus\" aria-hidden=\"true\"></i></span>";
                        temp += `<input type=\"number\" className="qty-text" id=\"qtyCart\" step=\"1\" min=\"1\" max=\"300\" `;
                        temp += `name=\"quantity\" value="${cart.qty}">`;
                        temp += " <span className=\"qty-plus\"";
                        temp += "  onClick=\"var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;\"><i";
                        temp += "className=\"fa fa-plus\" aria-hidden=\"true\"></i></span>";
                        temp += " </div>";
                        temp += " </div>";
                        temp += " </td>";
                        temp += `<td><button class="btn btn-warning" onClick=editCart("${cart._id}")>Update</button></td>`;
                        temp += `<td><button class="btn btn-danger" onClick=deleteCart("${cart._id}")>Delete</button></td>`;
                        temp += "</tr>";
                        // temp += "<td>" + itemData.employee_name + "</td>";
                        // temp += "<td>" + itemData.employee_salary + "</td></tr>";
                        /********************/

                        document.getElementById('cartData').innerHTML = temp;

                        // window.location.href = '../../dashboard/cart.html';
                    } else if (result.status === 403) {
                        // show the error message
                        $('.err-cartName').removeClass('d-none').html(`${result.responseJSON.message}`);
                        console.log(result.status);
                    } else if (result.status === 400) {
                        // show the error message
                        $('.err-cartName').removeClass('d-none').html(result.responseJSON.message);
                        console.log(result.status);
                    }
                });
            });

            // tem += "<td>" + itemData.employee_salary + "</td></tr>";
            /********************/

            // document.getElementById('cartSummary').innerHTML = tem;

        } else {
            console.log(result.status)
        }

        console.log(itemsInCart)

        return cart;
    });

}

function editCart(_id) {
    console.log(_id);


    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_CART_BY_ID + `${_id}`; // Pass Complete end point
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let cart = '';

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            cart = result.responseJSON;
            console.log(cart.data.category[0].qty);




        }
        else
        {
            console.log(result.status);
        }
        // return category;
    });


    $.confirm({
        title   : 'Edit Category!',
        content : ''
            + '<form action="" class="formName">'
            + '<div class="form-group">'
            + '<label>Category Name</label>'
            + '<input type="number" placeholder="Category Name" class="updateQty form-control" required />'
            + '</div>'
            + '</form>',
        buttons : {
            formSubmit : {
                text     : 'Submit',
                btnClass : 'btn-blue',
                action () {
                    const updateQty = $('.updateQty').val();

                    if (!updateQty)
                    {
                        $.alert('provide a valid name');

                        return false;
                    }
                    else
                    {
                        const ajaxCallParam = {};
                        const ajaxDataParam = {};

                        ajaxCallParam.Type = "PUT"; // GET type function
                        ajaxCallParam.Url = UPDATE_CART // Pass Complete end point
                        ajaxCallParam.DataType = "JSON"; // Return data type e-g Html, Json etc

                        const sessionData = getSession();
                        console.log(sessionData.authData.user.email);

                        let userEmail = sessionData.authData.user.email;

                        // console.log(qty);


                        ajaxDataParam._id = _id;
                        ajaxDataParam.qty = updateQty;
                        ajaxDataParam.name = 'img';
                        ajaxDataParam.item = cart.data.category[0].item;
                        ajaxDataParam.user = userEmail;

                        ajaxCall(ajaxCallParam, ajaxDataParam, (result, data, settings) =>
                        {
                            console.log(result);

                            // check qpi request is success
                            let cart;
                            if (result.status === 200) {
                                // fetch the data
                                cart = result.responseJSON;
                                console.log(cart.data);
                                $.confirm({
                                    title: '',
                                    content: 'Item updated!',
                                    buttons: {
                                        ok() {
                                            window.location.href = '../../cart.html';
                                        },
                                    },
                                });
                            } else {
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

            console.log(cart.data.category[0].qty)

            this.$content.find('.updateQty').val(cart.data.category[0].qty);

            this.$content.find('form').on('submit', (e) =>
            {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });
        },
    });

    // const qty = $('.qty-text').val();







}

function deleteCart(_id) {
    console.log(_id);

    $.confirm({
        title: 'Confirm!',
        content: 'Delete this Item?',
        buttons: {
            confirm() {
                const ajaxCallParams = {};
                const ajaxDataParams = {};

                ajaxCallParams.Type = "DELETE"; // GET type function
                ajaxCallParams.Url = DELETE_CART + `${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
                ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

                ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) => {
                    // check qpi request is success
                    if (result.status === 200) {

                        console.log(result.responseJSON)

                        $.confirm({
                            title: '',
                            content: 'Item Deleted!',
                            buttons: {
                                ok() {
                                    window.location.href = '../../cart.html';
                                },
                            },
                        });
                    } else if (result.status === 403) {
                        // show the error message
                        $('.err-cartName').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
                    } else if (result.status === 400) {
                        // show the error message
                        $('.err-cartName').removeClass('d-none').html(result.responseJSON.message);
                    }
                });
            },
            cancel() {
            },
        },
    });

}