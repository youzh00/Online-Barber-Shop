import type { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../utils/cloudinary";

export default async function Upload(req: NextRequest, res: NextResponse) {
  const { images } = req.body;
  const imagesUrls = [];
  for (const image of images) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "ml_default",
    });
    imagesUrls.push(uploadResponse.url);
  }
  return res.json({ imagesUrls });
}
