import path from 'path';
import fs from 'fs';

// .env.localから環境変数を読み込む（手動パース）
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split(/\r?\n/).forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            process.env[match[1]] = match[2].trim();
        }
    });
}

const DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

if (!DOMAIN || !API_KEY) {
    console.error('Environment variables MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY must be set in .env.local');
    process.exit(1);
}

const HEADERS = {
    'X-MICROCMS-API-KEY': API_KEY,
    'Content-Type': 'application/json',
};

const DUMMY_CATEGORIES = [
    { name: 'Webデザイン' },
    { name: 'SEO対策' },
    { name: 'SNSマーケティング' },
    { name: 'データ分析' }
];

const DUMMY_ARTICLES = [
    {
        title: 'BtoBサイトでコンバージョンを倍増させるWebデザインの5つの鉄則',
        excerpt: '企業の顔であるコーポレートサイト。ちょっとしたデザインの工夫で、問い合わせ数が劇的に変わる手法を解説します。',
        content: '<h2 id="h4fc1eaee29">なぜBtoBサイトにデザインが必要なのか</h2><p>BtoBの商材はBtoCと異なり、衝動買いされることはありません。しかし「信頼感」や「情報の探しやすさ」は直感的なデザインによって評価されます。</p><h3 id="h4fc1eaee30">1. ファーストビューでの課題解決</h3><p>訪れたユーザーが「ここは私たちの課題を解決してくれそうだ」と3秒で判断できるよう、キャッチコピーとビジュアルを一致させます。</p><ul><li>ターゲットを絞ったコピー</li><li>具体的なベネフィットの提示</li></ul><blockquote>「デザインとは、単なる装飾ではなく、機能である」</blockquote><p>この考え方をベースに、導線設計を見直してみましょう。</p>'
    },
    {
        title: '2026年最新！検索エンジンが評価するSEOコンテンツの作り方',
        excerpt: 'AIの進化によりSEOの常識は大きく変わりました。これからの時代に求められる「本質的なコンテンツSEO」を紐解きます。',
        content: '<h2 id="hf24ab5cd91">AI時代におけるSEOの変化</h2><p>検索エンジン自体がAIを組み込むようになり、小手先のキーワードを詰め込んだだけの記事は全く通用しなくなりました。最も重要なのは<strong>「独自性（オリジナリティ）」</strong>と<strong>「ユーザー体験（UX）」</strong>です。</p><h3 id="hf24ab5cd92">一次情報を取り入れる</h3><p>自社でしか出せないデータ、顧客へのインタビュー、独自の考察など、AIが自動生成できないインサイトを含めることが最強のSEO対策となります。</p>'
    },
    {
        title: 'LinkedInを活用したBtoB向けSNSマーケティング成功事例',
        excerpt: 'BtoB企業にとってLinkedInは宝の山です。決裁者に直接リーチするための効果的なアカウント運用と広告配信のコツ。',
        content: '<h2 id="h3ae05cdb24">LinkedInのポテンシャル</h2><p>海外では主流となっているLinkedInですが、日本国内でもビジネスパーソンの登録者が急増しています。特にマネジメント層や決裁権を持つユーザーの含有率が高いのが特徴です。</p><h3 id="h3ae05cdb25">成功する投稿の3つのポイント</h3><ol><li>業界のトレンドに対する専門的な考察</li><li>自社の失敗談とそこから得た教訓の共有</li><li>社内メンバーの顔が見えるカルチャー発信</li></ol><p>単なるサービスの売り込みではなく、<strong>「この人は有益な情報を持っている」</strong>と認識させることが第一歩です。</p>'
    },
    {
        title: 'とりあえず導入していませんか？GA4の正しい初期設定と分析手法',
        excerpt: 'Google Analytics 4（GA4）を何となく見ているだけの担当者必見。ビジネスの成果に直結する正しいKPI設定と分析方法を解説。',
        content: '<h2 id="h1a2b3c4d5e">UAからGA4へのパラダイムシフト</h2><p>かつてのユニバーサルアナリティクス（UA）は「ページ」単位の計測でしたが、GA4は「イベント（ユーザーの行動）」ベースの計測に変わりました。</p><h3 id="h2b3c4d5e6f">まずはコンバージョン（CV）設定を正確に</h3><p>お問い合わせフォームの送信完了、資料ダウンロードボタンのクリックなど、自社の売上に繋がるアクションを正確にCVイベントとして登録しなければ、分析は始まりません。</p>'
    },
    {
        title: 'レスポンシブデザインの落とし穴：スマホファーストを再考する',
        excerpt: '「とりあえずスマホ対応」から脱却し、デバイスごとに最適化されたユーザー体験を提供するモダンなUI/UXのアプローチ。',
        content: '<h2 id="h5f6e7d8c9b">スマホ対応＝レスポンシブ？</h2><p>PCサイトをただ単に縦長に並び替えただけのスマホサイトは、本当の意味での「スマホファースト」とは呼べません。</p><h3 id="h6e7d8c9b0a">タップ領域と指の動線</h3><p>スマートフォンではマウスカーソルがないため、ボタンのサイズやリンクの間隔、そして「親指で押しやすい位置」に重要なアクションを配置するUI設計がコンバージョン率を左右します。</p>'
    },
    {
        title: 'リード獲得を加速させるホワイトペーパーの作成ガイド',
        excerpt: 'BtoBマーケティングに欠かせないお役立ち資料（ホワイトペーパー）。読まれる資料の構成案からデザインのコツまで。',
        content: '<h2 id="h9876543210">ホワイトペーパーは「営業マン」である</h2><p>ただ情報を羅列しただけの資料ではなく、顧客の課題に寄り添い、最終的に自社のソリューションへと導くストーリーテリングが不可欠です。</p><h3 id="h0123456789">ダウンロードのハードルを下げる工夫</h3><p>ランディングページ（LP）では、資料の中身が一部わかるようなプレビュー画像を用意し、「これなら名前やメールアドレスを入力してでも欲しい！」と思わせる見せ方が重要です。</p>'
    },
    {
        title: '表示速度が命！Core Web Vitalsを改善するNext.jsの活用術',
        excerpt: 'サイトの読み込み速度は離脱率に直結します。Next.jsを利用してパフォーマンスを劇的に改善する実践的なテクニック。',
        content: '<h2 id="habcdef1234">Core Web Vitalsとは</h2><p>Googleが提唱する、ユーザー体験の質を測る重要指標です。LCP（読み込み時間）、FID（インタラクティブ性）、CLS（視覚的安定性）の3つから構成されます。</p><h3 id="h567890fedc">Next.jsによる画像最適化</h3><p>Next.jsの <code>&lt;Image&gt;</code> コンポーネントを使用することで、自動的なリサイズ、WebP等のモダンフォーマットへの変換、遅延読み込み（Lazy Loading）が適用され、LCPの改善に大きく貢献します。</p>'
    },
    {
        title: 'SNS広告のPDCAサイクルを超高速で回すクリエイティブテスト手法',
        excerpt: 'FacebookやXの広告で成果を出すためには、クリエイティブ（画像・動画）のテストがキモ。少額予算で最大のインサイトを得る方法。',
        content: '<h2 id="h1357924680">1つの完璧なバナーより、10個の60点バナー</h2><p>SNS広告において「当たる」クリエイティブを事前予測するのは不可能です。キャッチコピー、画像、カラーリングの要素を分解し、A/Bテストを繰り返すことが唯一の正攻法です。</p><h3 id="h2468013579">摩耗（クリエイティブ疲労）への対策</h3><p>同じ広告を何度も見るとユーザーは飽きてしまいます。CTR（クリック率）が低下し始めたら、速やかに新しいクリエイティブへ差し替える運用体制を整えましょう。</p>'
    },
    {
        title: 'オウンドメディア立ち上げ期にやるべき3つのこと',
        excerpt: 'ブログを始めてみたものの、なかなかアクセスが伸びない...。初期段階でつまずかないための戦略的なメディア運営のロードマップ。',
        content: '<h2 id="hqazwsxedcr">最初から完璧を求めない</h2><p>メディア運営で最も多い失敗は「数記事書いただけで効果が出ず、心が折れてしまう」ことです。SEOの効果が現れるには最低でも3〜6ヶ月の継続が必要です。</p><h3 id="htgbyhnujmi">小さな成功体験を積む</h3><p>まずは競合の少ないニッチなキーワードで上位表示を狙う、社内や既存の顧客に記事をシェアして読んでもらうなどして、「読まれる喜び」を実感できる仕組みを作りましょう。</p>'
    },
    {
        title: 'BtoB企業のYouTube活用：動画マーケティングの基本',
        excerpt: 'テキストだけでは伝わらない自社製品の魅力を、動画で効果的に発信する方法。シナリオ作成から撮影・編集のポイントまで。',
        content: '<h2 id="hpoknijbuhv">なぜBtoB企業が動画に取り組むべきか</h2><p>複雑なSaaSツールや機械設備など、テキストや写真だけでは機能や導入メリットが伝わりにくい商材こそ、動画の「視覚＋聴覚」による情報伝達が威力を発揮します。</p><h3 id="hygcvbnhjmk">How-to（使い方）動画から始めよう</h3><p>いきなり高額なプロモーションビデオを作る必要はありません。まずは既存顧客からよくある質問を解説する「How-to動画」や「操作マニュアル動画」を作成し、サポートの工数削減とエンゲージメント向上を狙うのがおすすめです。</p>'
    }

];

async function main() {
    console.log('Starting dummy data generation...');

    const categoryIds = [];

    // 1. カテゴリーの登録
    console.log('\n--- Creating Categories ---');
    for (const cat of DUMMY_CATEGORIES) {
        try {
            const res = await fetch(`https://${DOMAIN}.microcms.io/api/v1/categories`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(cat),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to create category ${cat.name}: ${res.status} ${text}`);
            }

            const data = await res.json();
            console.log(`Created category: ${cat.name} (ID: ${data.id})`);
            categoryIds.push(data.id);
        } catch (error) {
            console.error(error);
        }
    }

    if (categoryIds.length === 0) {
        console.error('No categories created. Aborting article creation.');
        process.exit(1);
    }

    // 2. 記事の登録
    console.log('\n--- Creating Articles ---');
    for (let i = 0; i < DUMMY_ARTICLES.length; i++) {
        const article = DUMMY_ARTICLES[i];
        // カテゴリーをランダムに割り当て
        const randomCategoryId = categoryIds[Math.floor(Math.random() * categoryIds.length)];

        const articleData = {
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            category: randomCategoryId
            // thumbnail は一旦省略（未指定の場合はフロントエンド側でデフォルト画像が表示される仕様）
        };

        try {
            const res = await fetch(`https://${DOMAIN}.microcms.io/api/v1/articles`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(articleData),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Failed to create article ${article.title}: ${res.status} ${text}`);
            }

            const data = await res.json();
            console.log(`Created article: ${article.title.substring(0, 15)}... (ID: ${data.id})`);
        } catch (error) {
            console.error(error);
        }
    }

    console.log('\nDummy data generation fully completed!');
}

main().catch(console.error);
