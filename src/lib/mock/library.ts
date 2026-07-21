export type Book = {
  id: string;
  title: string;
  author: string;
  era: string;
  category: "أدب" | "نحو" | "بلاغة" | "مقامات" | "شعر";
  description: string;
  pages: number;
  gradient: string;
  embedUrl: string;
  downloadUrl: string;
};

export const books: Book[] = [
  {
    id: "bayan-tabyeen",
    title: "البيان والتبيين",
    author: "أبو عثمان الجاحظ",
    era: "العصر العباسيّ · ق ٣هـ",
    category: "بلاغة",
    description:
      "موسوعةُ الجاحظ الكبرى في البيان والفصاحة والخطابة، ينتقلُ فيها بين الأخبار والحكايات والشعر بأسلوبٍ ماتع.",
    pages: 420,
    gradient: "linear-gradient(135deg, oklch(0.55 0.12 180), oklch(0.35 0.08 250))",
    embedUrl: "https://archive.org/embed/waq58941",
    downloadUrl: "https://archive.org/details/waq58941",
  },
  {
    id: "kamil-mubarrad",
    title: "الكامل في اللغة والأدب",
    author: "أبو العباس المبرِّد",
    era: "العصر العباسيّ · ق ٣هـ",
    category: "أدب",
    description:
      "من أجلّ كتب الأدب واللغة، جمع فيه المبرّد أخبار العرب وأشعارَهم مع شروحٍ لغويّة نفيسة.",
    pages: 380,
    gradient: "linear-gradient(135deg, oklch(0.7 0.15 65), oklch(0.45 0.12 30))",
    embedUrl: "https://archive.org/embed/FP42869",
    downloadUrl: "https://archive.org/details/FP42869",
  },
  {
    id: "adab-kabeer",
    title: "الأدب الكبير والأدب الصغير",
    author: "عبد الله بن المقفّع",
    era: "العصر العباسيّ · ق ٢هـ",
    category: "أدب",
    description:
      "رسالتان في آداب السياسة والصداقة والسلوك، بلغةٍ رصينة وحكمةٍ باقية.",
    pages: 140,
    gradient: "linear-gradient(135deg, oklch(0.6 0.14 30), oklch(0.35 0.1 20))",
    embedUrl: "https://archive.org/embed/adab-kabir-saghir",
    downloadUrl: "https://archive.org/details/adab-kabir-saghir",
  },
  {
    id: "maqamat-hariri",
    title: "مقامات الحريري",
    author: "أبو محمد القاسم الحريري",
    era: "العصر العباسيّ · ق ٦هـ",
    category: "مقامات",
    description:
      "خمسون مقامة تفيض بالسجع البديع والاستعارات، مدرسةٌ متكاملة في فنون البيان.",
    pages: 512,
    gradient: "linear-gradient(135deg, oklch(0.55 0.15 300), oklch(0.32 0.1 280))",
    embedUrl: "https://archive.org/embed/maqamatharirilo00hari",
    downloadUrl: "https://archive.org/details/maqamatharirilo00hari",
  },
  {
    id: "amali-qali",
    title: "الأمالي",
    author: "أبو علي القالي البغداديّ",
    era: "الأندلس · ق ٤هـ",
    category: "أدب",
    description:
      "مجالسُ القالي في اللغة والأدب، أَملاها على تلاميذه في قرطبة، وفيها من نوادر العربية ما ليس في غيرها.",
    pages: 460,
    gradient: "linear-gradient(135deg, oklch(0.62 0.14 220), oklch(0.38 0.1 260))",
    embedUrl: "https://archive.org/embed/waq53127",
    downloadUrl: "https://archive.org/details/waq53127",
  },
  {
    id: "diwan-mutanabbi",
    title: "ديوان المتنبّي",
    author: "أبو الطيّب المتنبّي",
    era: "العصر العباسيّ · ق ٤هـ",
    category: "شعر",
    description:
      "ديوانُ شاعر العربية الأكبر، بحكمته السائرة وفخره الشامخ ومديحه البديع.",
    pages: 620,
    gradient: "linear-gradient(135deg, oklch(0.5 0.1 180), oklch(0.3 0.05 200))",
    embedUrl: "https://archive.org/embed/diwan-al-mutanabbi",
    downloadUrl: "https://archive.org/details/diwan-al-mutanabbi",
  },
];

export function getBook(id: string) {
  return books.find((b) => b.id === id);
}
