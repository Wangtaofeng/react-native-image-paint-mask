import { WEBP } from "@/constants/mimeType";
import { supabase } from "../supabase";

export const uploadImage = async (base64: string, name: string) => {
  try {
    const arr = base64.split(",");
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    await supabase.storage.from("aigc").upload(name, u8arr, {
      contentType: WEBP,
    });
  } catch (error) {
    console.log(error);
  }
  const res = await supabase.storage.from("aigc").createSignedUrl(name, 60 * 15);
  return res.data?.signedUrl;
};
