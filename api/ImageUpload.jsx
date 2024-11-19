import cloudinary from 'cloudinary';

// Cloudinary 설정
cloudinary.config({
  cloud_name: 'djvcrv1dp',
  api_key: '718437171648518',
  api_secret: 'YgFbSmPdrFwQuviZ1K-Nyhx7LGc',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { base64Image } = req.body;

    if (!base64Image) {
      return res.status(400).json({ error: '이미지가 필요합니다.' });
    }

    try {
      // Cloudinary로 이미지 업로드
      const uploadResponse = await cloudinary.v2.uploader.upload(base64Image, {
        folder: 'your_folder', // 원하는 폴더 지정
        format: 'png', // 이미지 형식
      });

      // 업로드된 이미지의 URL 반환
      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error('업로드 실패:', error);
      res.status(500).json({ error: '이미지 업로드 실패' });
    }
  } else {
    res.status(405).json({ error: '허용되지 않는 메소드입니다.' });
  }
}
