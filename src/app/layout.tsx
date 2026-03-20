import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "МонКонстракшн - Барилгын Шилдэг Шийдэл",
  description:
    "Монгол Улсын тэргүүлэгч барилгын компани. Чанартай барилга, найдвартай гүйцэтгэл, 10+ жилийн туршлага.",
  keywords:
    "барилга, барилгын компани, орон сууц, оффис, үйлдвэрийн барилга, интерьер дизайн, зураг төсөл",
  authors: [{ name: "МонКонстракшн ХХК" }],
  openGraph: {
    title: "МонКонстракшн - Барилгын Шилдэг Шийдэл",
    description: "Чанартай барилга, найдвартай гүйцэтгэл",
    type: "website",
    locale: "mn_MN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
