import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../utils/cloudinary";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    images: string[];
  };
}

export default async function Upload(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { images } = req.body;
  console.log(images);
  const imagesUrls = [];
  for (const image of images) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "ml_default",
    });
    imagesUrls.push(uploadResponse.url);
  }
  return res.json({ imagesUrls });
}
