export type Category = {
  id: string;
  name: string;
};

export type Article = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  category: Category;
  thumbnail: string;
  excerpt: string;
};

export const dummyCategories: Category[] = [
  { id: "marketing", name: "Webマーケティング" },
  { id: "design", name: "Webデザイン" },
  { id: "tech", name: "技術・開発" },
];

export const dummyArticles: Article[] = [
  {
    id: "article-1",
    title: "BtoB企業がオウンドメディアで成功するための3つの法則",
    content: "<p>BtoB企業におけるオウンドメディア運営の重要性が高まっています。本記事では、成功を収めるための具体的な法則を3つ紹介します。</p><p>まずはターゲット層の明確化です...</p>",
    excerpt: "BtoB企業におけるオウンドメディア運営の重要性が高まっています。本記事では、成功を収めるための具体的な法則を3つ紹介します。",
    publishedAt: "2026-02-21T10:00:00.000Z",
    category: dummyCategories[0],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "article-2",
    title: "売れるLP（ランディングページ）の基本構成とデザインのコツ",
    content: "<p>ランディングページは、ユーザーに行動を促すための重要なページです。構成とデザインの基本を押さえることが重要です。</p>",
    excerpt: "ランディングページは、ユーザーに行動を促すための重要なページです。構成とデザインの基本を押さえることが重要です。",
    publishedAt: "2026-02-20T10:00:00.000Z",
    category: dummyCategories[1],
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "article-3",
    title: "Headless CMSとNext.jsで作る爆速Webサイト構築ガイド",
    content: "<p>これからのWeb制作において、Jamstackアーキテクチャは欠かせません。Next.jsとMicroCMSを使った実装例を解説します。</p>",
    excerpt: "これからのWeb制作において、Jamstackアーキテクチャは欠かせません。Next.jsとMicroCMSを使った実装例を解説します。",
    publishedAt: "2026-02-19T10:00:00.000Z",
    category: dummyCategories[2],
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "article-4",
    title: "SEO対策の基本：2026年最新のGoogleアルゴリズム動向",
    content: "<p>SEO対策は常に変化しています。最新のトレンドを押さえることが重要です。コアアルゴリズムアップデートに対応するには...</p>",
    excerpt: "SEO対策は常に変化しています。最新のトレンドを押さえることが重要です。コアアルゴリズムアップデートに対応するには...",
    publishedAt: "2026-02-18T10:00:00.000Z",
    category: dummyCategories[0],
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "article-5",
    title: "初心者のためのTailwind CSS v4入門ガイド",
    content: "<p>新しいTailwind CSSのバージョン4がリリースされました。設定方法や進化したポイントをわかりやすく解説します。</p>",
    excerpt: "新しいTailwind CSSのバージョン4がリリースされました。設定方法や進化したポイントをわかりやすく解説します。",
    publishedAt: "2026-02-15T12:00:00.000Z",
    category: dummyCategories[2],
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
  },
];
