import { useListingByHashQuery } from "@/graphql/generated";
import ValidListing from "./ValidListing";

type Props = {
  id: string;
};

export default function ListingView({ id }: Props) {
  const { data, loading } = useListingByHashQuery({
    variables: {
      hash: id,
    },
  });

  if (!data || data?.activeListings.length === 0) {
    return <>Invalid Listing</>;
  }

  return <ValidListing listing={data.activeListings[0]} />;
}
