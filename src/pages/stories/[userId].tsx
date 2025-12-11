import { GetServerSideProps } from "next";
import Head from "next/head";
import { getStoriesByUserId } from "../../lib/data";
import StoryViewer from "../../components/StoryViewer";
import { IUserStories } from "../../types";

export default function StoryPage({ story }: { story: IUserStories | null }) {
  if (!story) {
    return <div style={{ padding: 20 }}>Story not found</div>;
  }

  const first = story.items[0];
  const host = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const ogImage = host + first.mediaUrl;

  return (
    <>
      <Head>
        <title>{story.user.name} • Story</title>
        <meta name="description" content={`${story.user.name}’s story`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${story.user.name} • Story`} />
        <meta
          property="og:description"
          content={`${story.user.name}'s story`}
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`${host}/stories/${story.user.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <StoryViewer story={story} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = ctx.params as { userId: string };
  const story = getStoriesByUserId(userId);
  return { props: { story } };
};
