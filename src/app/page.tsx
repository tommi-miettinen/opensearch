import Search from "./components/Search";
import { seed } from "./opensearch";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Search />
    </main>
  );
}
