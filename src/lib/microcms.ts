import { createClient, MicroCMSQueries } from 'microcms-js-sdk';

// 環境変数が設定されていない場合はエラーをスロー
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error('MICROCMS_API_KEY is required');
}

// APIクライアントのセットアップ
export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});

// 型定義
export type Category = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
};

export type Article = {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    content: string;
    excerpt: string;
    thumbnail: {
        url: string;
        height: number;
        width: number;
    };
    category: Category;
};

// 記事一覧を取得する関数
export const getArticles = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Article>({
        endpoint: 'articles',
        queries,
    });
    return listData;
};

// 記事詳細を取得する関数
export const getArticleDetail = async (contentId: string, queries?: MicroCMSQueries) => {
    const detailData = await client.getListDetail<Article>({
        endpoint: 'articles',
        contentId,
        queries,
    });
    return detailData;
};

// カテゴリー一覧を取得する関数
export const getCategories = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Category>({
        endpoint: 'categories',
        queries,
    });
    return listData;
};
