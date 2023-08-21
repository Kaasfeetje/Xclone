import React from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

const Select = ({ onChange, value }: Props) => {
  return (
    <select onChange={onChange} value={value}>
      <option value="everyone">Everyone</option>
      <option value="followers">Followers</option>
      {/* TODO:Implement circles? */}
    </select>
  );
};

export default Select;
