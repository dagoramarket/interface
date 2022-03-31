import { IPFS_ENDPOINT, MAX_FILE_SIZE } from "@/constants";
import { uploadFileToIpfs } from "@/utils/ipfs";
import { useState } from "react";
import { Button, Form, FormControl, Image, InputGroup } from "react-bootstrap";

type Props = {
    image: string | null;
    setImage: (image: string) => void;
};

export default function ImageUpload({image, setImage}: Props) {
  const [file, setFile] = useState<ArrayBuffer | null>();
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
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
    </>
  );
}
