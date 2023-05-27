import { InputHTMLAttributes } from "react";
import "./styles.css";

type PropsInput = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function Input({ label, ...rest }: PropsInput) {
  return (
    <div className="container">
      <label>{label}</label>
      <input {...rest} id="input" />
    </div>
  );
}
