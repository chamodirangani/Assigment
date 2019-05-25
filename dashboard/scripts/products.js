$("#index_productlist").ready(function () {

    $.ajax("http://localhost:8083/sellnbye/api/product", {
        contentType: 'application/json',
        type: 'GET'
    }).done(function (response) {
        var newItem = "";
        $.each(response, function (index, value) {

            newItem += `
            <div class="span3">
            <br>
           <a href="product_details.html"><img src="${value.productImage}" alt=""></a>
                <div class="caption cntr">
                    
                    <p>${value.productName}</p>
                    <p><strong>  ${value.productPrice}</strong></p>
                    <div class="btn-group">
                    <h4><a href="product_details.html" class="shopBtn" href="#" title="add to cart"> Product Details </a></h4> 
                    </div>
                </div>
                <br>
            </div>`;
        });

        $("#index_productlist").append(newItem);
    });
});
