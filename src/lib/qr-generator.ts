import QRCode from 'qrcode';

export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 300,
      color: {
        dark: '#03140C',
        light: '#FFFBE8',
      },
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return '';
  }
}
