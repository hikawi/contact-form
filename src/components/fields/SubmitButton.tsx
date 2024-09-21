import type { Accessor } from "solid-js";

export default function SubmitButton({
  disabled,
}: {
  disabled: Accessor<boolean>;
}) {
  return (
    <button
      type="submit"
      disabled={disabled()}
      class="bg-primary-green-600 disabled:hover:bg-primary-green-600 mt-4 w-full rounded-lg p-4 text-lg font-bold text-white enabled:hover:[background:linear-gradient(0deg,_rgba(0,0,0,0.50)_0%,_rgba(0,0,0,0.50)_100%),_#0C7D69] disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2"
    >
      Submit
    </button>
  );
}
