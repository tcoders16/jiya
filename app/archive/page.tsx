import NavBar from "@/components/NavBar";
import ArchiveList from "@/components/ArchiveList";
import { allPoems } from "@/lib/poem-store";

export default function ArchivePage() {
  const poems = allPoems();
  return (
    <div className="flex flex-col gap-5">
      <NavBar
        label="A quiet shelf"
        title="Archive"
        backHref="/"
        rightHref="/settings"
        rightLabel="Settings"
      />
      <div className="hair" />
      <ArchiveList poems={poems} />
    </div>
  );
}
