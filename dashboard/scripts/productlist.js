$("#products_productlist").ready(function () {

    $.ajax("http://localhost:8083/sellnbye/api/product", {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        var newItem = "";
        $.each(response, function (index, value) {

            newItem += `<hr class="soften">
            <div class="row-fluid">
                <div class="span2">
                    <img src="${value.productImage}" alt="" height="130" width="100">
                </div>
                <div class="span6">
                    
                    <h5 class="productName_header_id">${value.productName}</h5>
                    <p>
                       Product Creator: ${value.creator}
                    </p>
                    </br>
                    <p>
                        Available Quantity: ${value.productCount}
                    </p>
                </div>
                <div class="span4 alignR">
                    <form class="form-horizontal qtyFrm">
                        <h3>Rs: ${value.productPrice}</h3><br>
                       
                    </form>
                </div>
            </div>`;
        });

        $("#products_productlist").append(newItem);
    });
});
