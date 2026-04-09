import { NextResponse } from 'next/server';

export const revalidate = 3600; // revalidate every hour

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'Instagram token not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      const err = await res.json();
      console.error('Instagram API error:', err);
      return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
    }

    const data = await res.json();

    const posts = data.data
      .filter((post: any) => post.media_type !== 'VIDEO' || post.thumbnail_url)
      .map((post: any) => ({
        id: post.id,
        caption: post.caption || '',
        mediaUrl: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
        permalink: post.permalink,
        type: post.media_type,
      }));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Instagram fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
