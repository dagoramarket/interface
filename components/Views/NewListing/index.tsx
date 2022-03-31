import Card from "@/components/Cards";
import {
    ENABLED_TOKENS,
    IPFS_ENDPOINT,
    MAX_FILE_SIZE
} from "@/constants";
import { useInput } from "@/libs/hooks/useInput";
import { useSelect } from "@/libs/hooks/useSelect";
import { useMarketContext } from "@/libs/marketContext";
import { uploadFileToIpfs } from "@/utils/ipfs";
import { parseUnits } from "ethers/lib/utils";
import { useState } from "react";
import {
    Button, Form,
    FormControl,
    Image,
    InputGroup
} from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";

type Props = {};

// TODO Check if has stake, else send to

// Currently you can only upload one file at a time
// TODO: Add multiple file upload
// TODO: Break into multi stage process
// TODO: Better tags
export default function NewListing({}: Props) {
  const [file, setFile] = useState<ArrayBuffer | null>();
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const title = useInput("");
  const description = useInput("");
  const [price, setPrice] = useState("");
  const category = useSelect("");
  const priceToken = useSelect("");
  const [tags, setTags] = useState<string[]>([]);
  const [tokens, setTokens] = useState<string[]>([]);
  const { createListing } = useMarketContext();

  function retrieveFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    setFile(null);
    if (!e.target.files) return;
    const files = e.target.files;
    if (files.length == 0) return;
    if (files.length > 10) {
      setError("You can only upload 10 files at a time.");
      return;
    }

    const data = files[0];
    if (data.size > MAX_FILE_SIZE) {
      setError(`File ${data.name} is too large.`);
      return;
    }
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      if (!reader.result) return;
      if (typeof reader.result == "string") return;
      const buffer = Buffer.from(reader.result);
      setFile(buffer);
    };
    e.preventDefault();
  }

  async function uploadFile() {
    if (!file) return;
    const path = await uploadFileToIpfs(file);
    setImage(path);
  }

  async function submit() {
    console.log("Submitting");
    const listing = {
      version: 1,
      title: title.value,
      description: description.value,
      categories: [category.value],
      tags: tags,
      images: [`ipfs://${image}`],
      allowed_tokens: tokens
        .sort((x, y) =>
          x == priceToken.value ? -1 : y == priceToken.value ? 1 : 0
        )
        .map((token) => ENABLED_TOKENS[token].address),
      price: parseUnits(
        price,
        ENABLED_TOKENS[priceToken.value].decimals
      ).toString(),
    };
    var enc = new TextEncoder();
    const listingBytes = enc.encode(JSON.stringify(listing));
    const path = await uploadFileToIpfs(listingBytes);
    console.log(path);
    await createListing(path);
  }

  return (
    <Card title="Create Listing">
      <h1>New Listing</h1>
      <div className="flex flex-col gap-3">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            isInvalid={false}
            isValid={false}
            placeholder="My awesome product"
            {...title}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Thats an error
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            isInvalid={false}
            isValid={false}
            placeholder="Describe your product here"
            {...description}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Thats an error
          </Form.Control.Feedback>
        </Form.Group>
        <div>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <InputGroup hasValidation>
              <FormControl
                type="file"
                onChange={retrieveFile}
                accept="video/*,image/*"
                isInvalid={error != null}
                isValid={image != null}
              />
              <Button
                onClick={uploadFile}
                variant="outline-secondary"
                disabled={error != null || file == null}
              >
                Upload
              </Button>
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>
        {image && (
          <div className="flex justify-center">
            <Image
              src={IPFS_ENDPOINT + image}
              alt="Product image"
              rounded
              width="70%"
            />
          </div>
        )}
        <Form.Group>
          <Form.Label>Category</Form.Label>
          {/* TODO: Load categories on demand */}
          <Form.Select aria-label="Default select example" {...category}>
            <option>Choose one</option>
            <option value="Games">Games</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <InputTags values={tags} onTags={(value) => setTags(value.values)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Accepted Tokens</Form.Label>
          {Object.values(ENABLED_TOKENS).map((token, i) => (
            <Form.Check
              key={i}
              type="checkbox"
              label={token.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.checked) {
                  setTokens([...tokens, token.name]);
                } else {
                  setTokens(tokens.filter((t) => t !== token.name));
                }
              }}
            />
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <InputGroup>
            <Form.Control
              pattern={
                priceToken.value
                  ? `[0-9]*\.?[0-9]{0,${
                      ENABLED_TOKENS[priceToken.value].decimals
                    }}`
                  : "[0-9]*"
              }
              disabled={priceToken.value == ""}
              isInvalid={false}
              isValid={false}
              placeholder="100.00"
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(e.target.validity.valid ? e.target.value : price);
              }}
            />
            <Form.Select aria-label="Default select example" {...priceToken}>
              <option value="">Choose one</option>
              {tokens.map((token, i) => (
                <option key={i} value={token}>
                  {token}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Form.Group>
        <Button variant="success" onClick={submit}>
          Create Lisiting
        </Button>
      </div>
    </Card>
  );
}
