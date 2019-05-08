import React from "react";

interface Props {
  personId: string;
}

export const PersonPresenter: React.SFC<Props> = ({ personId }) => (
  <div>you are in /person/{personId}</div>
);
