import { getArticles } from '@/lib/microcms';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedParams = await searchParams;
    const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

    // 検索クエリが存在する場合のみ記事を取得
    const { contents: articles, totalCount } = query
        ? await getArticles({ q: query, limit: 100 })
        : { contents: [], totalCount: 0 };

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
                            <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-3">
                                <Search className="w-8 h-8 text-blue-600" />
                                検索結果
                            </h1>
                            {query ? (
                                <p className="text-slate-500">
                                    「<span className="font-bold text-slate-800">{query}</span>」で検索しました（全 {totalCount} 件）
                                </p>
                            ) : (
                                <p className="text-slate-500">キーワードを入力して記事を検索できます。</p>
                            )}
                        </div>

                        {query && articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {articles.map(article => (
                                    <ArticleCard key={article.id} article={article} />
                                ))}
                            </div>
                        ) : query ? (
                            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                                <p className="text-slate-500">一致する記事が見つかりませんでした。別のキーワードでお試しください。</p>
                            </div>
                        ) : null}
                    </div>

                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
