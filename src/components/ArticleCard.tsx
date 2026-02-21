import Link from 'next/link';
import { Article } from '@/lib/microcms';
import { format } from 'date-fns';

export default function ArticleCard({ article }: { article: Article }) {
    const formattedDate = format(new Date(article.publishedAt), 'yyyy.MM.dd');

    return (
        <Link href={`/articles/${article.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col h-full">
            <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.thumbnail?.url || 'https://images.unsplash.com/photo-1432888117426-1d5ac0a2e379?auto=format&fit=crop&q=80&w=800'}
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
