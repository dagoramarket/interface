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
import { countWords } from "@/utils/stringutils";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import PriceSelector from "./PriceSelector";
import Modal from "@/components/Modal";
import TxModal, { ProviderError, TxState } from "@/components/Modal/TxModal";
import { ProviderRpcError } from "@web3-react/types";
import { useRouter } from "next/router";

type Props = {};

// Currently you can only upload one file at a time
// TODO: Add multiple file upload
// TODO: Break into multi stage process
// TODO: Better tags
// TODO: Better validation
// Search for Formik
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

  const [enableSubmit, setEnableSubmit] = useState(false);

  const [txState, setTxState] = useState(TxState.None);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setEnableSubmit(false);
    const state =
      title &&
      description &&
      image &&
      price &&
      category &&
      priceToken &&
      tokens.length > 0;
    // if (!title) return;
    // if (!description) return;
    // if (!image) return;
    // if (!category) return;
    // if (tokens.length === 0) return;
    // if (!price) return;
    // if (!priceToken) return;
    setEnableSubmit(state as boolean);
  }, [title, description, image, category, tokens, price, priceToken]);

  async function submit() {
    if (!image) return;
    setIsOpen(true);
    setTxState(TxState.Pending);
    try {
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
      setTxState(TxState.Success);

      timerRef.current = setTimeout(() => router.push('/account'), 1000);
    } catch (e) {
      setTxState(TxState.Error);
      const error = e as ProviderRpcError;
      const data = error.data as ProviderError;
      if(data) {
        setError(data.message);
      } else {
        setError(error.message);
      }
      timerRef.current = setTimeout(() => setIsOpen(false), 5000);
    }
  }

  return (
    <Card title="Create Listing">
      <h1>New Listing</h1>
      <div className="flex flex-col gap-3">
        <TextInput
          title="Title"
          placeholder="My awesome product"
          textInput={titleInput}
          validate={(v) => {
            return {
              valid: v.length > 3,
              error: "Title must be at least 3 characters",
            };
          }}
        />
        <TextAreaInput
          title="Description"
          placeholder="Describe your product here"
          textInput={descriptionInput}
          validate={(v) => {
            return {
              valid: countWords(v) >= 5,
              error: "Description must have at leat 5 words",
            };
          }}
        />
        <ImageUpload image={image} setImage={setImage} />

        <SelectInput
          title="Category"
          options={categories}
          selectInput={categoryInput}
          validate={(v) => {
            return {
              valid: v.length > 0,
              error: "Please select the category.",
            };
          }}
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
        <Button
          variant="success"
          onClick={submit}
          disabled={!hasMinimumStake || !enableSubmit || isOpen}
        >
          {hasMinimumStake ? "Create Listing" : "You need to stake tokens"}
        </Button>

        <TxModal
          title="Creating Listing"
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
          txState={txState}
          setTxState={setTxState}
          error={error}
        >
          <div className="flex flex-col align-items-center mx-auto gap-3">
            <h1>Teste</h1>
          </div>
        </TxModal>
      </div>
    </Card>
  );
}
