import SearchBar from "@/components/SearchBar";

export default function HomeView(): JSX.Element {
  function onSearch(value: string) {
    console.log(value);
  }

  return (
    <div className="flex items-center justify-center h-full">
      <SearchBar onSearch={onSearch}>What are you looking for today?</SearchBar>
    </div>
  );
}
