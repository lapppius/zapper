"use client";
import { useFormStatus } from "react-dom";
import Button from "./Button";

export default function SubmitButton({ title, ...props }) {
  // useFormStatus gives information about the parent form
  const { pending } = useFormStatus();

  return (
    <Button
      title={title}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      {...props}
    />
  );
}
