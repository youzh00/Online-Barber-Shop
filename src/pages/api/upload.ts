import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";
import { env } from "../../env.mjs";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
cloudinary.v2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
});

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
  const imagesUrls: string[] = [];
  for (const image of images) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      upload_preset: "ml_default",
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    imagesUrls.push(uploadResponse.url);
  }
  return res.json({ imagesUrls });
}
