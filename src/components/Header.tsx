import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function Header() {
    return (
        <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl text-blue-600 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <span>WebMarketer&apos;s Hub</span>
                </Link>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
                    <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">記事一覧</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">運営会社</Link>
                </nav>
            </div>
        </header>
    );
}
