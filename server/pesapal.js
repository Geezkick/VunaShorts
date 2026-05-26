// ============================================
// VUNASHORTS — Pesapal Payment Service (API v3)
// ============================================
require('dotenv').config();

const PESAPAL_ENV = process.env.PESAPAL_ENV || 'sandbox';
const BASE_URL = PESAPAL_ENV === 'production'
  ? 'https://pay.pesapal.com/v3/api'
  : 'https://cybqa.pesapal.com/pesapalv3/api';

const CONSUMER_KEY = process.env.PESAPAL_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.PESAPAL_CONSUMER_SECRET;

// Token cache (valid for 5 min)
let cachedToken = null;
let tokenExpiry = 0;

/**
 * Get an OAuth bearer token from Pesapal.
 * Caches the token for 4 minutes (safety margin on the 5-min expiry).
 */
async function getAuthToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const res = await fetch(`${BASE_URL}/Auth/RequestToken`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pesapal Auth failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  cachedToken = data.token;
  tokenExpiry = Date.now() + 4 * 60 * 1000; // cache 4 min
  console.log('[Pesapal] Auth token acquired');
  return cachedToken;
}

/**
 * Register an IPN (Instant Payment Notification) URL with Pesapal.
 * Returns the notification_id needed for order submissions.
 */
async function registerIPN(ipnUrl) {
  const token = await getAuthToken();

  const res = await fetch(`${BASE_URL}/URLSetup/RegisterIPN`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: ipnUrl,
      ipn_notification_type: 'GET'
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pesapal IPN registration failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  console.log('[Pesapal] IPN registered:', data.ipn_id);
  return data.ipn_id;
}

/**
 * Submit an order to Pesapal.
 * Returns { order_tracking_id, merchant_reference, redirect_url }
 */
async function submitOrder({ orderId, amount, currency, description, callbackUrl, notificationId, billing }) {
  const token = await getAuthToken();

  const payload = {
    id: orderId,
    currency: currency || 'KES',
    amount: parseFloat(amount),
    description: description || 'VunaShorts Episode Unlock',
    callback_url: callbackUrl,
    notification_id: notificationId,
    billing_address: {
      email_address: billing?.email || '',
      phone_number: billing?.phone || '',
      first_name: billing?.firstName || 'VunaShorts',
      last_name: billing?.lastName || 'User',
      country_code: billing?.countryCode || 'KE',
      line_1: '',
      city: '',
      state: '',
      postal_code: '',
      zip_code: ''
    }
  };

  const res = await fetch(`${BASE_URL}/Transactions/SubmitOrderRequest`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pesapal SubmitOrder failed (${res.status}): ${text}`);
  }

  const data = await res.json();
  console.log('[Pesapal] Order submitted:', data.order_tracking_id);
  return data;
}

/**
 * Get the status of a transaction by its order_tracking_id.
 */
async function getTransactionStatus(orderTrackingId) {
  const token = await getAuthToken();

  const res = await fetch(`${BASE_URL}/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pesapal GetTransactionStatus failed (${res.status}): ${text}`);
  }

  return await res.json();
}

module.exports = {
  getAuthToken,
  registerIPN,
  submitOrder,
  getTransactionStatus,
  BASE_URL
};
