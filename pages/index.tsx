import { getCategories } from "@/utils/categories";
import HomeView from "@views/HomeView";
import Navigation from "@views/Navigation";
import Head from "next/head";

type Props = {
  categories: string[];
};

function Home({}: Props): JSX.Element {
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
          <HomeView />
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
