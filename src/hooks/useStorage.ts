
import { supabase } from "@/integrations/supabase/client";

export const useStorage = () => {
  const uploadFile = async (file: File, bucket: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl.publicUrl;
  };

  return {
    uploadFile,
  };
};
