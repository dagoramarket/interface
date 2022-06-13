import Card from "@/components/Cards";
import { ENABLED_TOKENS, IPFS_ENDPOINT } from "@/constants";
import { ListingFragment } from "@/graphql/generated";
import { Image, Row } from "react-bootstrap";
import BuyButton from "./BuyButton";

type Props = {
  listing?: ListingFragment;
};

export default function ValidListing({ listing }: Props) {
  if (!listing) return <Card title="Invalid Listing"></Card>;

  return (
    <Card title={listing.title}>
      <Row>
        {listing.media.length > 0 && (
          <Image
            src={IPFS_ENDPOINT + listing.media[0].replace("ipfs://", "")}
            alt={`Image for listing ${listing.id}`}
          />
        )}
      </Row>
      <h3>Description</h3>
      <p>{listing.description}</p>
      <h3>Price</h3>
      <p>
        {listing.price}{" "}
        {
          JSON.stringify(
          listing.allowedTokens
            .map(
              (t) =>
                Object.values(ENABLED_TOKENS).filter((et) => et.address.toLowerCase() == t.toLowerCase())[0].name
            ))
        }
      </p>
      <BuyButton
        listing={listing}
        amount={listing.price}
        token={
          listing.allowedTokens.filter(
            (t) => t.toLowerCase() === "0x783EECa49C84A33382e39e8571F248a1E91C20BB".toLowerCase()
          )[0]
        }
      />
    </Card>
  );
}
