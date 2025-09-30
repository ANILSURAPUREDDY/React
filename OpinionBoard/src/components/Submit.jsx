import { useFormStatus } from "react-dom";

//we can use useFormStatus hook to disable the button on submit the request, if you want to use useFormStatus hook it must should be
//used in nested compoments. If you want to use in same component we can use useActionState of pendind.

export default function Submit() {
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submiting..." : "Submit"}
      </button>
    </p>
  );
}
