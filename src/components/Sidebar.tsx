import { getCategories } from '@/lib/microcms';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';

export default async function Sidebar() {
    const { contents: categories } = await getCategories({ limit: 20 });

    return (
        <aside className="w-full lg:w-80 shrink-0 space-y-8">
            {/* Profile Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 overflow-hidden mb-4 border-2 border-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="font-bold text-slate-800 text-lg mb-2">ミハトWEB制作</h3>
                <p className="text-sm text-slate-500 leading-relaxed text-left">
                    BtoB企業向けのWebマーケティングとサイト構築を得意とするWeb制作会社です。現場で培った実践的なノウハウを発信しています。
                </p>
            </div>

            {/* Search Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-600" />
                    <span>記事を検索</span>
                </h3>
                <form action="/search" method="GET" className="relative">
                    <input
                        type="text"
                        name="q"
                        placeholder="キーワードを入力..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 pr-10 outline-none transition-colors"
                    />
                    <button type="submit" className="absolute right-3 top-3 text-slate-400 hover:text-blue-600">
                        <Search className="w-4 h-4" />
                    </button>
                </form>
            </div>

            {/* Category Widget */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">カテゴリー</h3>
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <Link
                                href={`/categories/${cat.id}`}
                                className="flex items-center justify-between text-slate-600 hover:text-blue-600 py-2 border-b border-slate-50 last:border-0 transition-colors group"
                            >
                                <span>{cat.name}</span>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}
