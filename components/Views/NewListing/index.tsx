import Card from "@/components/Cards";
import SelectInput from "@/components/Form/SelectInput";
import TagsInput from "@/components/Form/TagsInput";
import TextAreaInput from "@/components/Form/TextAreaInput";
import TextInput from "@/components/Form/TextInput";
import { useInput } from "@/libs/hooks/useInput";
import { useSelect } from "@/libs/hooks/useSelect";
import { useMarketContext } from "@/libs/marketContext";
import { uploadFileToTheGraph } from "@/utils/ipfs";
import { buildListing } from "@/utils/listing";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import PriceSelector from "./PriceSelector";

type Props = {};

// TODO Check if has stake, else send to

// Currently you can only upload one file at a time
// TODO: Add multiple file upload
// TODO: Break into multi stage process
// TODO: Better tags
export default function NewListing({}: Props) {
  const [image, setImage] = useState<string | null>(null);

  const titleInput = useInput("");
  const { value: title } = titleInput;

  const descriptionInput = useInput("");
  const { value: description } = descriptionInput;

  const [price, setPrice] = useState("");

  const categoryInput = useSelect("");
  const { value: category } = categoryInput;

  const priceTokenInput = useSelect("");
  const { value: priceToken } = priceTokenInput;

  const [tags, setTags] = useState<string[]>([]);
  const [tokens, setTokens] = useState<string[]>([]);
  const { createListing, categories, hasMinimumStake } = useMarketContext();

  async function submit() {
    if (!image) return;
    const listing = buildListing(
      title,
      description,
      image,
      category,
      tags,
      tokens,
      price,
      priceToken
    );
    const listingBytes = new TextEncoder().encode(JSON.stringify(listing));
    const path = await uploadFileToTheGraph(listingBytes);
    await createListing(path);
  }

  return (
    <Card title="Create Listing">
      <h1>New Listing</h1>
      <div className="flex flex-col gap-3">
        <TextInput
          title="Title"
          placeholder="My awesome product"
          textInput={titleInput}
        />
        <TextAreaInput
          title="Description"
          placeholder="Describe your product here"
          textInput={descriptionInput}
        />
        <ImageUpload image={image} setImage={setImage} />

        <SelectInput
          title="Category"
          options={categories}
          selectInput={categoryInput}
        />

        <TagsInput title="Tags" values={tags} setValues={setTags} />

        <PriceSelector
          setTokens={setTokens}
          tokens={tokens}
          price={price}
          priceToken={priceToken}
          setPrice={setPrice}
          priceTokenSelect={priceTokenInput}
        />
        <Button variant="success" onClick={submit} disabled={!hasMinimumStake}>
          {hasMinimumStake ? "Create Lisiting" : "You need to stake tokens"}
        </Button>
      </div>
    </Card>
  );
}
