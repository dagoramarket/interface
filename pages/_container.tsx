import { useMarketContext } from "@/libs/marketContext";
import type { AppProps } from "next/app";
import { useEffect } from "react";

const Container = ({ Component, pageProps }: AppProps) => {
  const { updateCategories } = useMarketContext();
  useEffect(() => {
    updateCategories(pageProps.categories);
  });

  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default Container;
