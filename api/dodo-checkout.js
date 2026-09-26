/**
 * HostifyOS - Dodo Payments Secure Serverless Checkout Engine
 * Vercel Serverless Edge Function
 */

const DODO_PRODUCT_MAP = {
  pro_monthly: 'pdt_0NoB0aoePAJvzwbeqpT3B',
  pro_annual: 'pdt_0NoB0bbRJD7ZDhFlYwVYL',
  enterprise_monthly: 'pdt_0NoB0a45lMIAStRQ38iiA',
  enterprise_annual: 'pdt_0NoB0Yusos1T6J53b2SjT'
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  const allowedOrigins = ['https://www.hostifyos.com', 'https://hostifyos.com', 'http://localhost:3000'];
  const reqOrigin = req.headers.origin || '';
  if (allowedOrigins.includes(reqOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', reqOrigin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://www.hostifyos.com');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = req.body || {};
    const planKey = body.plan || 'pro_monthly';
    const email = body.email || 'host@hostifyos.com';
    const name = body.name || 'Valued Host';
    const returnUrl = body.returnUrl || 'https://www.hostifyos.com/?session_id={CHECKOUT_SESSION_ID}&status=success';

    const productId = DODO_PRODUCT_MAP[planKey] || body.productId || DODO_PRODUCT_MAP.pro_monthly;
    const apiKey = process.env.DODO_PAYMENTS_API_KEY || 'BxWmfn78EloAHJpA.KsEFqECqNpX5PbhpZ2Bhxog2CN0sZ7JGcT4eqJIh-rssUD_3';

    const dodoRes = await fetch('https://live.dodopayments.com/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'HostifyOS/1.0'
      },
      body: JSON.stringify({
        product_cart: [{ product_id: productId, quantity: 1 }],
        customer: { email, name },
        return_url: returnUrl
      })
    });

    const dodoData = await dodoRes.json();

    if (!dodoRes.ok) {
      return res.status(dodoRes.status).json({
        success: false,
        error: dodoData.message || 'Dodo Payments session creation failed',
        code: dodoData.code || 'UNKNOWN_ERROR',
        details: dodoData
      });
    }

    return res.status(200).json({
      success: true,
      checkout_url: dodoData.checkout_url || dodoData.url,
      session_id: dodoData.session_id || dodoData.id
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal Server Error'
    });
  }
}
