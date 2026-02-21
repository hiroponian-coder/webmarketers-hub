import { getArticles, getCategories } from '@/lib/microcms';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

export default async function Home() {
  const { contents: latestArticles } = await getArticles({ limit: 6 });
  const { contents: categories } = await getCategories({ limit: 10 });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-100 py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Webマーケティングの<br className="md:hidden" />「最前線」を届ける
          </h1>
          <p className="text-slate-500 text-lg mb-10">BtoB企業のWeb担当者・経営者に向けた、実践的なノウハウメディア。</p>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-5 py-2 rounded-full text-sm font-medium transition-colors border border-transparent hover:border-blue-100"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="container mx-auto px-6 max-w-5xl mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-600 rounded-full inline-block"></span>
            最新の記事
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
