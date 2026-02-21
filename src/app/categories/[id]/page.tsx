import { getArticles, getCategories } from '@/lib/microcms';
import ArticleCard from '@/components/ArticleCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    // カテゴリー情報の取得
    const { contents: categories } = await getCategories({ limit: 100 });
    const category = categories.find(c => c.id === resolvedParams.id);

    if (!category) {
        notFound();
    }

    // このカテゴリーに属する記事を取得
    const { contents: articles } = await getArticles({
        filters: `category[equals]${category.id}`,
        limit: 100
    });

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-6 max-w-6xl">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページへ戻る
                </Link>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 min-w-0">
                        <div className="mb-12">
                            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
                                カテゴリー: {category.name}
                            </h1>
                            <p className="text-slate-500">全 {articles.length} 件の記事が見つかりました</p>
                        </div>

                        {articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {articles.map(article => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                                <p className="text-slate-500">記事が見つかりませんでした。</p>
                            </div>
                        )}
                    </div>

                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
