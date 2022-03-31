import Head from "next/head";
import SearchBar from "@/components/SearchBar";
import HomeView from "@views/HomeView";
import Navigation from "@views/Navigation";
import { getCategories } from "@/utils/categories";

type Props = {
  categories: string[];
};

function Home({}: Props): JSX.Element {
  function onSearch(value: string) {
    console.log(value);
  }

  return (
    <>
      <Head>
        <title>Dagora Market</title>
        <meta
          name="description"
          content="Decentralized Marketplace for Physical Goods"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <div className="flex flex-col h-full">
          <Navigation />
          <HomeView>
            <SearchBar onSearch={onSearch}>
              What are you looking for today?
            </SearchBar>
          </HomeView>
        </div>
      </body>
    </>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const categories = await getCategories();
  return { props: { categories } };
}

export default Home;
