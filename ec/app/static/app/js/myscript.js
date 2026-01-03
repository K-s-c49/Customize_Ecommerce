

  // Increase quantity
  // Handle click event on the plus-cart button
$(document).on("click", ".plus-cart", function (e) {
    e.preventDefault();
    // Get the product id from the 'pid' attribute
    var id = $(this).attr("pid").toString();

    var $card = $(this).closest(".card");
    var $qty = $card.find(".cart-qty").first();

    console.log("pid =", id);  // Debugging: log product id

    // Send AJAX request to Django view
    $.ajax({
        type: "GET",  // Using GET (make sure Django view accepts GET)
        url: "/pluscart/",  // Django URL that increases quantity
        data: {
            prod_id: id  // Sending product id as query parameter
        },
        success: function (data) {
            console.log("data =", data);  // Debugging: log response from server
            $qty.text(data.quantity)
            document.getElementById("amount").innerText=data.amount
            document.getElementById("totalamount").innerText=data.totalamount

          
        }
    });
});

$(document).on("click", ".minus-cart", function (e) {
    e.preventDefault();
    // Get the product id from the 'pid' attribute
    var id = $(this).attr("pid").toString();

    var $card = $(this).closest(".card");
    var $qty = $card.find(".cart-qty").first();

    console.log("pid =", id);  // Debugging: log product id

    // Send AJAX request to Django view
    $.ajax({
        type: "GET",  // Using GET (make sure Django view accepts GET)
        url: "/minuscart/",  // Django URL that increases quantity
        data: {
            prod_id: id  // Sending product id as query parameter
        },
        success: function (data) {
            console.log("data =", data);  // Debugging: log response from server
            if (data.quantity === 0) {
                $card.remove();
            } else {
                $qty.text(data.quantity)
            }
            document.getElementById("amount").innerText=data.amount
            document.getElementById("totalamount").innerText=data.totalamount

          
        }
    });
});

$(document).on("click", ".remove-cart", function (e) {
    e.preventDefault();
    // Get the product id from the 'pid' attribute
    var id = $(this).attr("pid").toString();

    // Get the quantity span element (3rd child inside parent node)
    // This assumes your HTML structure is consistent: 
    // [minus button, span(quantity), plus button]
    var $card = $(this).closest(".card");


    // Send AJAX request to Django view
    $.ajax({
        type: "GET",  // Using GET (make sure Django view accepts GET)
        url: "/removecart/",  // Django URL that increases quantity
        data: {
            prod_id: id  // Sending product id as query parameter
        },
        success: function (data) {
            console.log("data =", data);  // Debugging: log response from server
            document.getElementById("amount").innerText=data.amount
            document.getElementById("totalamount").innerText=data.totalamount
            $card.remove();

          
        }
    });
});

// Add to Wishlist
$(document).on("click", ".plus-wishlist", function () {
    let pid = $(this).attr("pid");
    $.ajax({
        url: "/wishlist/add/",
        data: { prod_id: pid },
        success: function (response) {
            alert(response.message);
            location.reload(); // reload to update button state
        }
    });
});

// Remove from Wishlist
$(document).on("click", ".minus-wishlist", function () {
    let pid = $(this).attr("pid");
    $.ajax({
        url: "/wishlist/remove/",
        data: { prod_id: pid },
        success: function (response) {
            alert(response.message);
            location.reload();
        }
    });
});
