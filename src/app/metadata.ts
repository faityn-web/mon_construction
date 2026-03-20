import type { Metadata } from "next";
import { getSettings } from "@/lib/supabase-data";
import { SiteSettings } from "@/types";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    
    return {
      title: `${settings?.company_name || 'МонКонстракшн'} - Барилгын Шилдэг Шийдэл`,
      description: "Монгол Улсын тэргүүлэгч барилгын компани. Чанартай барилга, найдвартай гүйцэтгэл, 10+ жилийн туршлага.",
      keywords: "барилга, барилгын компани, орон сууц, оффис, үйлдвэрийн барилга, интерьер дизайн, зураг төсөл",
      authors: [{ name: settings?.company_name || 'МонКонстракшн ХХК' }],
      openGraph: {
        title: `${settings?.company_name || 'МонКонстракшн'} - Барилгын Шилдэг Шийдэл`,
        description: "Чанартай барилга, найдвартай гүйцэтгэл",
        type: "website",
        locale: "mn_MN",
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    
    // Fallback metadata
    return {
      title: "МонКонстракшн - Барилгын Шилдэг Шийдэл",
      description: "Монгол Улсын тэргүүлэгч барилгын компани. Чанартай барилга, найдвартай гүйцэтгэл, 10+ жилийн туршлага.",
      keywords: "барилга, барилгын компани, орон сууц, оффис, үйлдвэрийн барилга, интерьер дизайн, зураг төсөл",
      authors: [{ name: "МонКонстракшн ХХК" }],
      openGraph: {
        title: "МонКонстракшн - Барилгын Шилдэг Шийдэл",
        description: "Чанартай барилга, найдвартай гүйцэтгэл",
        type: "website",
        locale: "mn_MN",
      },
    };
  }
}
