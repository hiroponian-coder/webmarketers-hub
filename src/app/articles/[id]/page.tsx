import { getArticleDetail, getArticles } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
    const { contents } = await getArticles({ limit: 100 });
    return contents.map((article) => ({
        id: article.id,
    }));
}

export default async function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    // MicroCMSから記事詳細を取得
    let article;
    try {
        article = await getArticleDetail(resolvedParams.id);
    } catch (err) {
        notFound();
    }

    if (!article) {
        notFound();
    }

    const formattedDate = format(new Date(article.publishedAt), 'yyyy.MM.dd');

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-6 max-w-3xl">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページへ戻る
                </Link>

                <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <div className="mb-8">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                {article.category.name}
                            </span>
                            <time className="text-slate-400 text-sm">{formattedDate}</time>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                            {article.title}
                        </h1>
                        <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 rounded-2xl mb-12">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={article.thumbnail?.url || 'https://images.unsplash.com/photo-1432888117426-1d5ac0a2e379?auto=format&fit=crop&q=80&w=800'}
                                alt={article.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div
                            className="text-slate-700 leading-relaxed text-lg [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-slate-100"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}
