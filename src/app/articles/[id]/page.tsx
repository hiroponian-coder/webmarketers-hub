import { getArticleDetail, getArticles } from '@/lib/microcms';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';

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
    } catch {
        notFound();
    }

    if (!article) {
        notFound();
    }

    const formattedDate = format(new Date(article.publishedAt), 'yyyy.MM.dd');

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-6 max-w-6xl">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページへ戻る
                </Link>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 min-w-0">
                        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-10">
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
                                        src={article.thumbnail?.url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                                        alt={article.title}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div
                                    className="text-slate-700 leading-relaxed text-lg 
                            [&>p]:mb-8 
                            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-slate-200 
                            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:pl-4 [&>h3]:border-l-4 [&>h3]:border-blue-600
                            [&>h4]:text-lg [&>h4]:font-bold [&>h4]:mt-8 [&>h4]:mb-3
                            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-2 
                            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-2 
                            [&>blockquote]:border-l-4 [&>blockquote]:border-slate-300 [&>blockquote]:bg-slate-50 [&>blockquote]:p-4 [&>blockquote]:italic [&>blockquote]:text-slate-500 [&>blockquote]:my-8 [&>blockquote>p]:mb-0
                            [&>img]:rounded-xl [&>img]:my-8 [&>img]:w-full [&>img]:object-cover [&>img]:shadow-sm
                            [&>strong]:text-slate-900 [&>strong]:bg-yellow-100 [&>strong]:px-1
                            [&>a]:text-blue-600 [&>a]:underline [&>a:hover]:text-blue-800"
                                    dangerouslySetInnerHTML={{ __html: article.content }}
                                />
                            </div>
                        </article>
                    </div>

                    <Sidebar />
                </div>
            </div>
        </div>
    );
}
