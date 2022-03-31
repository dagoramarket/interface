import { ENABLED_TOKENS } from "@/constants";
import { BindInput } from "@/libs/hooks/useInput";
import { BindSelect } from "@/libs/hooks/useSelect";
import React, { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";

type Props = {
  setTokens: (tokens: string[]) => void;
  tokens: string[];
  priceToken: string;
  priceTokenSelect: BindSelect;
  price: string;
  setPrice: (price: string) => void;
};

export default function PriceSelector({
  setTokens,
  tokens,
  priceToken,
  priceTokenSelect,
  price,
  setPrice,
}: Props) {
    
  useEffect(() => {
    if (tokens.filter((t) => t === priceToken).length === 0) {
      priceTokenSelect.setValue("");
      setPrice("");
    }
  }, [tokens, priceToken, priceTokenSelect, setPrice]);

  return (
    <>
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
              priceToken
                ? `[0-9]*\.?[0-9]{0,${ENABLED_TOKENS[priceToken].decimals}}`
                : "[0-9]*"
            }
            disabled={priceToken == ""}
            isInvalid={false}
            isValid={false}
            placeholder="100.00"
            value={price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPrice(e.target.validity.valid ? e.target.value : price);
            }}
          />
          <Form.Select
            aria-label="Default select example"
            {...priceTokenSelect}
          >
            <option value="">Choose one</option>
            {tokens.map((token, i) => (
              <option key={i} value={token}>
                {token}
              </option>
            ))}
          </Form.Select>
        </InputGroup>
      </Form.Group>
    </>
  );
}
