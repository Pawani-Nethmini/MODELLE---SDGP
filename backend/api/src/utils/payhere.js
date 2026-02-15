import crypto from 'crypto';

export function generatePayHereHash(merchantId, orderId, amount, currency, merchantSecret) {
    const secretHash = crypto
        .createHash('md5')
        .update(merchantSecret)
        .digest("hex")
        .toUpperCase();

    const hashString = `${merchantId}${orderId}${amount}${currency}${secretHash}`;

    return crypto          // ← ADD return
        .createHash('md5')
        .update(hashString)
        .digest("hex")
        .toUpperCase();
}