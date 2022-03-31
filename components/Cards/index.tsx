import React from "react";
import { Card as BSCard } from "react-bootstrap";

type Props = {
  title: string;
  children: string | JSX.Element | JSX.Element[];
};

export default function Card({ title, children }: Props): JSX.Element {
  return (
    <BSCard>
      <BSCard.Body>
        <BSCard.Title>{title}</BSCard.Title>
        {children}
      </BSCard.Body>
    </BSCard>
  );
}
