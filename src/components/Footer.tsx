export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
            <div className="container mx-auto px-6 text-center">
                <p className="text-xl font-bold text-white mb-4">WebMarketer&apos;s Hub</p>
                <p className="text-sm mb-8">ビジネスを加速させるWebマーケティング・デザイン・開発のノウハウメディア</p>
                <p className="text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} WebMarketer&apos;s Hub. All rights reserved.</p>
            </div>
        </footer>
    );
}
