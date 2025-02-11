import { IMAGE_URL } from "@/constants/url";
import { fal } from "@fal-ai/client";

fal.config({
  credentials: process.env.EXPO_PUBLIC_FAL_KEY,
});

export const operateImage = async (url: string, originURL = IMAGE_URL) => {
  const result = await fal.subscribe("fal-ai/flux-lora-fill", {
    input: {
      prompt: "A woman with deep green hair", // can use another prompt
      image_url: originURL,
      mask_url: url,
    },
  });
  return result.data;
};
