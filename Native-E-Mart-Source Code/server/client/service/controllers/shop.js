$( document ).ready(() => {
    const header = renderNavigationBar('shop');

    $("#header").append(header);

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_ITEMS; // Pass Complete end point
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

                // temp += "<tr>";
                // temp += "<td>" + item.name + "</td>";
                // temp += "<td>" + item.description + "</td>";
                // temp += "<td>" + item.itemCode + "</td>";
                // temp += "<td>" + item.buyPrice + "</td>";
                // temp += "<td>" + item.sellPrice + "</td>";
                // temp += "<td>" + item.weight + "</td>";
                // temp += "<td>" + item.quantity + "</td>";
                // temp += "<td>" + item.category + "</td></tr>";

                temp += "    <div class=\"col-12 col-sm-6 col-md-12 col-xl-6\">";
                temp += "      <div class=\"single-product-wrapper\">";
                temp += "        <!-- Product Image -->";
                temp += "        <div class=\"product-img\">";
                temp += "            <img src=\"./assets/images/product-img/product1.jpg\" alt=\"\">";
                temp += "                <!-- Hover Thumb -->";
                temp += "                <img class=\"hover-img\" src=\"./assets/images/product-img/product2.jpg\" alt=\"\">";
                temp += "        </div>";
                temp += "        <!-- Product Description -->";
                temp += "        <div class=\"product-description d-flex align-items-center justify-content-between\">";
                temp += "            <!-- Product Meta Data -->";
                temp += "            <div class=\"product-meta-data\">";
                temp += "                <div class=\"line\"></div>";
                temp += `                <p class=\"product-price\">${item.sellPrice}</p>`;
                temp += "                <a href=\"#\">";
                temp += `                    <h6>${item.name}</h6>`;
                temp += "                </a>";
                temp += "            </div>";
                temp += "            <!-- Ratings & Cart -->";
                temp += "            <div class=\"ratings-cart text-right\">";
                temp += "                <div class=\"ratings\">";
                temp += "                   <i class=\"fa fa-star\" aria-hidden=\"true\"></i>";
                temp += "                   <i class=\"fa fa-star\" aria-hidden=\"true\"></i>";
                temp += "                   <i class=\"fa fa-star\" aria-hidden=\"true\"></i>";
                temp += "                    <i class=\"fa fa-star\" aria-hidden=\"true\"></i>";
                temp += "                    <i class=\"fa fa-star\" aria-hidden=\"true\"></i>";
                temp += "               </div>";
                temp += "                <div class=\"cart\">";
                temp += `                    <a href="#" onclick=addToCart("${item._id}") data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="./assets/images/core-img/cart.png" alt=""></a>`;
                temp += "                </div>";
                temp += "           </div>";
                temp += "        </div>";
                temp += "    </div>";
                temp += " </div>";
            });

            document.getElementById('shopData').innerHTML = temp;
        }
        else
        {
            console.log(result.status);
        }

        return items;
    });
});
