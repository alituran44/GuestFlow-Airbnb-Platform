/**
 * HostifyOS - Paynkolay (Aktif Bank / N Kolay) Virtual POS & 3D Secure Checkout Engine
 * Vercel Serverless Edge Function
 */

import crypto from 'crypto';

const PAYNKOLAY_CONFIG = {
  sx: process.env.PAYNKOLAY_SX || '189064897|wYYIp9Y5cO0m3FyN21m9KZwEyEjPUfubzilRxkgZTVWUWEYxa2wNluICXhvnKPoGVLxk1uuKzj2PNl4SZnb3FVNOe83y1X/DdqtPtNq8B1nK8wJZZHuQ+DuVmDdNQECfZH+N8INw==',
  merchantSecretKey: process.env.PAYNKOLAY_SECRET_KEY || '_PG2qaf5kfrLZQYwrDP3Z',
  liveEndpoint: 'https://paynkolay.nkolayislem.com.tr/Vpos/v1/Payment',
  hostedEndpoint: 'https://paynkolay.nkolayislem.com.tr/Vpos'
};

const PLAN_PRICE_MAP_TRY = {
  pro_monthly: '650.00',
  pro_annual: '5750.00',
  enterprise_monthly: '1350.00',
  enterprise_annual: '11900.00'
};

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
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
    const cardHolderName = body.cardHolderName || name;
    const cardNumber = (body.cardNumber || '').replace(/\s+/g, '');
    const expireMonth = body.expireMonth || (body.cardExp ? body.cardExp.split('/')[0] : '12');
    const expireYear = body.expireYear || (body.cardExp ? '20' + body.cardExp.split('/')[1] : '2028');
    const cvv = body.cvv || body.cvc || '123';
    
    const amount = body.amount || PLAN_PRICE_MAP_TRY[planKey] || '650.00';
    const clientRefCode = `HST_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const rnd = Date.now().toString();
    const customerKey = body.customerKey || '';
    
    const origin = req.headers.origin || 'https://www.hostifyos.com';
    const successUrl = body.successUrl || `${origin}/?payment_status=success&ref=${clientRefCode}`;
    const failUrl = body.failUrl || `${origin}/?payment_status=failed&ref=${clientRefCode}`;

    // Calculate SHA-512 Hash Data
    // Hash String format: sx|clientRefCode|amount|successUrl|failUrl|rnd|customerKey|merchantSecretKey
    const hashStr = `${PAYNKOLAY_CONFIG.sx}|${clientRefCode}|${amount}|${successUrl}|${failUrl}|${rnd}|${customerKey}|${PAYNKOLAY_CONFIG.merchantSecretKey}`;
    const hashData = crypto.createHash('sha512').update(hashStr, 'utf8').digest('base64');

    // If direct card data is passed, attempt 3D Secure API call
    if (cardNumber && cardNumber.length >= 15) {
      const payload = {
        sx: PAYNKOLAY_CONFIG.sx,
        clientRefCode,
        amount,
        currency: 'TRY',
        successUrl,
        failUrl,
        rnd,
        customerKey,
        hashData,
        use3D: true,
        pan: cardNumber,
        cardHolderName,
        expiryMonth: expireMonth.padStart(2, '0'),
        expiryYear: expireYear.length === 2 ? `20${expireYear}` : expireYear,
        cvv,
        email,
        customerIp: req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1'
      };

      const payRes = await fetch(PAYNKOLAY_CONFIG.liveEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'HostifyOS-Paynkolay/1.0'
        },
        body: JSON.stringify(payload)
      });

      const textRes = await payRes.text();
      let dataRes;
      try {
        dataRes = JSON.parse(textRes);
      } catch (e) {
        dataRes = { html: textRes };
      }

      return res.status(200).json({
        success: true,
        type: '3d_secure',
        clientRefCode,
        amount,
        currency: 'TRY',
        data: dataRes
      });
    }

    // Otherwise return Paynkolay Hosted / Form submission data for frontend 3D redirect
    return res.status(200).json({
      success: true,
      type: 'hosted_form',
      actionUrl: PAYNKOLAY_CONFIG.hostedEndpoint,
      fields: {
        sx: PAYNKOLAY_CONFIG.sx,
        clientRefCode,
        amount,
        currency: 'TRY',
        successUrl,
        failUrl,
        rnd,
        customerKey,
        hashData,
        use3D: 'true'
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || 'Paynkolay checkout processing error'
    });
  }
}
