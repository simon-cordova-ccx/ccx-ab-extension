/**
 * Updates the ccx_lastOrder session storage by adding new products from provided HTML data.
 */
function updateLastOrderWithProducts() {
  // Get existing ccx_lastOrder or initialize with the provided example
  let lastOrder = sessionStorage.getItem('ccx_lastOrder');
  if (!lastOrder) {
    lastOrder = {
      total: "59.50",
      dateCreated: "2025-09-11 12:00:16",
      orderCode: "VELOTEST633711",
      orderId: "633711",
      products: [
        {
          title: "Strawberry Ice",
          colour_title: "Mini",
          variation_title: "6MG",
          sku: "VELO00080mini6mg",
          quantity: 8,
          fullRetail: 85,
          product_id: "7",
          sku_ref: "VELO00080",
          colour_id: "94",
          variation_id: "133",
          is_subscription_product: "1"
        }
      ]
    };
  } else {
    lastOrder = JSON.parse(lastOrder);
  }

  // New products to add, extracted from HTML with assumed variant IDs
  const newProducts = [
    {
      title: "Ruby Berry",
      colour_title: "Mini",
      variation_title: "6MG",
      sku: "VELO00074mini6mg",
      quantity: 11,
      fullRetail: 50,
      product_id: "75",
      sku_ref: "VELO00074",
      colour_id: "95",
      variation_id: "134",
      is_subscription_product: "1"
    },
    {
      title: "Tropical Ice",
      colour_title: "Slim",
      variation_title: "6MG",
      sku: "VELO00081slim6mg",
      quantity: 13,
      fullRetail: 40,
      product_id: "82",
      sku_ref: "VELO00081",
      colour_id: "96",
      variation_id: "135",
      is_subscription_product: "1"
    },
    {
      title: "Cherry Ice",
      colour_title: "Mini",
      variation_title: "10MG",
      sku: "VELO00082mini10mg",
      quantity: 13,
      fullRetail: 60,
      product_id: "83",
      sku_ref: "VELO00082",
      colour_id: "97",
      variation_id: "136",
      is_subscription_product: "1"
    },
    {
      title: "Orange Ice",
      colour_title: "Mini",
      variation_title: "6MG",
      sku: "VELO00083mini6mg",
      quantity: 13,
      fullRetail: 75,
      product_id: "84",
      sku_ref: "VELO00083",
      colour_id: "98",
      variation_id: "137",
      is_subscription_product: "1"
    }
  ];

  // Merge new products with existing ones
//   lastOrder.products = [...lastOrder.products, ...newProducts];
  lastOrder.products = [...newProducts];

  // Update total based on new products (sum of fullRetail * quantity)
  lastOrder.total = lastOrder.products
    .reduce((sum, product) => sum + (product.fullRetail * product.quantity / 17), 0)
    .toFixed(2);

  // Save updated lastOrder back to sessionStorage
  sessionStorage.setItem('ccx_lastOrder', JSON.stringify(lastOrder));
  console.log('Updated ccx_lastOrder:', lastOrder);
}

// Execute the function
updateLastOrderWithProducts();