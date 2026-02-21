import Link from 'next/link';
import { Article } from '@/lib/microcms';
import { format } from 'date-fns';

export default function ArticleCard({ article }: { article: Article }) {
    const formattedDate = format(new Date(article.publishedAt), 'yyyy.MM.dd');

    const CATEGORY_IMAGES: Record<string, string> = {
        'Webデザイン': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
        'SEO対策': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        'SNSマーケティング': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
        'データ分析': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    };
    const fallbackImage = CATEGORY_IMAGES[article.category.name] || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';

    return (
        <Link href={`/articles/${article.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col h-full">
            <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.thumbnail?.url || fallbackImage}
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {article.category.name}
                    </span>
                </div>
            </div>
            <div className="p-6 flex flex-col grow">
                <div className="text-sm text-slate-400 mb-3">{formattedDate}</div>
                <h3 className="font-bold text-lg text-slate-800 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2 mt-auto">
                    {article.excerpt}
                </p>
            </div>
        </Link>
    );
}
