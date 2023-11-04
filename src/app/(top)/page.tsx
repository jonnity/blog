import { Articles } from "./components/Articles";

export default function Home() {
  return (
    <section className="w-full">
      <h2 className="text-2xl">記事一覧</h2>
      <div className="py-1">
        <Articles />
      </div>
    </section>
  );
}
