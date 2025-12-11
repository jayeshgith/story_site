import Link from "next/link";
import { GetStaticProps } from "next";
import { getAllStories } from "../lib/data";
import { IUserStories } from "../types";

export default function Home({ stories }: { stories: IUserStories[] }) {
  return (
    <div className="page">
      <h2>Stories</h2>

      <div className="grid">
        {(stories || []).map((s) => (
          <Link key={s.user.id} href={`/stories/${s.user.id}`} className="card">
            <img src={s.user.avatarUrl} className="avatar" />

            <div>
              <div>{s.user.name}</div>
              <div className="small">{s.items?.length || 0} stories</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const stories = getAllStories();
  return { props: { stories } };
};
