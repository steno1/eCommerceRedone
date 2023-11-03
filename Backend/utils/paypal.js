// Import the 'dotenv' library to load environment variables from a .env file

import dotenv from 'dotenv';

// Call the 'config' function to load environment variables from the .env file
dotenv.config();

// Destructure environment variables from 'process.env' and store them in constants
const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET, PAYPAL_API_URL } = process.env;

/**
 * Fetches an access token from the PayPal API.
 * @see {@link https://developer.paypal.com/reference/get-an-access-token/#link-getanaccesstoken}
 */
async function getPayPalAccessToken() {
  // Create an authorization header by encoding client ID and app secret in base64
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_APP_SECRET).toString('base64');

  // Construct the URL for accessing PayPal's OAuth2 token endpoint
  const url = `${PAYPAL_API_URL}/v1/oauth2/token`;

  // Define headers for the HTTP request
  const headers = {
    Accept: 'application/json',
    'Accept-Language': 'en_US',
    Authorization: `Basic ${auth}`,
  };

  // Create the request body
  const body = 'grant_type=client_credentials';

  // Make an HTTP POST request to the PayPal API to obtain an access token
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });

  // Check if the response status code indicates success (HTTP 2xx)
  if (!response.ok) throw new Error('Failed to get access token');

  // Parse the response as JSON and return the access token
  const paypalData = await response.json();
  return paypalData.access_token;
}

/**
 * Checks if a PayPal transaction is new by comparing the transaction ID with existing orders in the database.
 *
 * @param {Mongoose.Model} orderModel - The Mongoose model for the orders in the database.
 * @param {string} paypalTransactionId - The PayPal transaction ID to be checked.
 * @returns {Promise<boolean>} Returns true if it is a new transaction (i.e., the transaction ID does not exist in the database), false otherwise.
 * @throws {Error} If there's an error in querying the database.
 */
export async function checkIfNewTransaction(orderModel, paypalTransactionId) {
  try {
    // Find all documents where Order.paymentResult.id is the same as the id passed paypalTransactionId
    const orders = await orderModel.find({
      'paymentResult.id': paypalTransactionId,
    });

    // If there are no such orders, then it's a new transaction.
    return orders.length === 0;
  } catch (err) {
    // If there's an error, log it to the console
    console.error(err);
  }
}

/**
 * Verifies a PayPal payment by making a request to the PayPal API.
 * @see {@link https://developer.paypal.com/docs/api/orders/v2/#orders_get}
 */
export async function verifyPayPalPayment(paypalTransactionId) {
  // Obtain an access token by calling the 'getPayPalAccessToken' function
  const accessToken = await getPayPalAccessToken();

  // Construct the URL for accessing PayPal's checkout orders endpoint
  const paypalResponse = await fetch(
    `${PAYPAL_API_URL}/v2/checkout/orders/${paypalTransactionId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Check if the response status code indicates success (HTTP 2xx)
  if (!paypalResponse.ok) throw new Error('Failed to verify payment');

  // Parse the response as JSON and return an object with verification information
  const paypalData = await paypalResponse.json();
  return {
    verified: paypalData.status === 'COMPLETED',
    value: paypalData.purchase_units[0].amount.value,
  };
}
