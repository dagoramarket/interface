import Card from "@/components/Cards";
import SelectInput from "@/components/Form/SelectInput";
import TagsInput from "@/components/Form/TagsInput";
import TextAreaInput from "@/components/Form/TextAreaInput";
import TextInput from "@/components/Form/TextInput";
import TxModal, { ProviderError, TxState } from "@/components/Modal/TxModal";
import { useMarketContext } from "@/libs/marketContext";
import { uploadFileToTheGraph } from "@/utils/ipfs";
import { buildListing } from "@/utils/listing";
import { ProviderRpcError } from "@web3-react/types";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import ImageUpload from "./ImageUpload";
import PriceSelector from "./PriceSelector";
import { countWords } from "@/utils/stringutils";

type Props = {};

// Currently you can only upload one file at a time
// TODO: Add multiple file upload
// TODO: Break into multi stage process
// TODO: Better tags
// TODO: Better validation
// Search for Formik

type FormData = {
  title: string;
  description: string;
  category: string;
  tags: string[];
  price: string;
  token: string;
  image: string;
  tokens: string[];
  priceToken: string;
};

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .test(
      "5-words",
      "Description must have at least 5 words",
      (v) => v !== undefined && countWords(v) >= 5
    ),
  category: yup.string().required("Category is required"),
});

export default function NewListing({}: Props) {
  const {
    setValue,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      tokens: [],
    },
  });

  const { createListing, categories, hasMinimumStake } = useMarketContext();

  const [txState, setTxState] = useState(TxState.None);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  async function submit(data: FormData) {
    console.log(data);
    setIsOpen(true);
    setTxState(TxState.Pending);
    try {
      const listing = buildListing(
        data.title,
        data.description,
        data.image,
        data.category,
        data.tags,
        data.tokens,
        data.price,
        data.priceToken
      );
      const listingBytes = new TextEncoder().encode(JSON.stringify(listing));
      const path = await uploadFileToTheGraph(listingBytes);
      await createListing(path);
      setTxState(TxState.Success);

      timerRef.current = setTimeout(() => router.push("/account"), 1000);
    } catch (e) {
      setTxState(TxState.Error);
      const error = e as ProviderRpcError;
      const data = error.data as ProviderError;
      if (data) {
        setError(data.message);
      } else {
        setError(error.message);
      }
      timerRef.current = setTimeout(() => setIsOpen(false), 5000);
    }
  }

  return (
    <Card title="Create Listing">
      <form>
        <h1>New Listing</h1>
        <div className="flex flex-col gap-3">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextInput
                title="Title"
                placeholder="My awesome product"
                {...field}
                error={errors.title}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextAreaInput
                title="Description"
                placeholder="Describe your product here"
                {...field}
                error={errors.description}
              />
            )}
          />
          <ImageUpload
            image={getValues().image}
            setImage={(s) => setValue("image", s)}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <SelectInput
                title="Category"
                options={categories}
                {...field}
                error={errors.category?.message}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field }) => <TagsInput {...field} />}
          />

          <PriceSelector
            setTokens={(t) => setValue("tokens", t)}
            tokens={getValues().tokens}
            price={getValues().price}
            priceToken={getValues().priceToken}
            setPrice={(p) => setValue("price", p)}
            setPriceToken={(p) => setValue("priceToken", p)}
          />
          <Button
            variant="success"
            onClick={handleSubmit(submit)}
            disabled={!hasMinimumStake || isOpen}
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
      </form>
    </Card>
  );
}
