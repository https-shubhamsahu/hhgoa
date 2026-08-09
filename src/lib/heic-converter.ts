import heic2any from 'heic2any';

export async function processUploadedFile(file: File): Promise<string> {
  const MAX_SIZE = 25 * 1024 * 1024; // 25MB
  if (file.size > MAX_SIZE) {
    throw new Error('Image file is too large. Please select a photo under 25MB.');
  }

  const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif') || file.type === 'image/heic' || file.type === 'image/heif';

  if (isHeic) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.9,
      });

      const singleBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(singleBlob);
      });
    } catch (err) {
      console.error('HEIC conversion failed, falling back to standard read:', err);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
