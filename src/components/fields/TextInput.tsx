import { createEffect, type Accessor, type Setter } from "solid-js";

export default function TextInput({
  id,
  label,
  error,
  getter,
  setter,
  span = false,
  type = "text",
}: {
  id: string;
  label: string;
  error: string;
  getter: Accessor<string>;
  setter: Setter<string>;
  span?: boolean;
  type?: string;
}) {
  createEffect(() => {
    setter((document.getElementById(id) as HTMLInputElement).value.trim());
  });

  return (
    <div
      class="flex w-full flex-col gap-2"
      classList={{ "md:col-span-2": span }}
    >
      <label
        class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']"
        for={id}
      >
        {label}
      </label>
      <input
        class="border-neutral-gray-500 invalid:border-primary-red hover:border-primary-green-600 focus:outline-primary-green-600 peer rounded-lg border-[1px] px-6 py-3"
        id={id}
        type={type}
        value={getter()}
        onInput={(event) => setter((event.target as HTMLInputElement).value)}
        aria-invalid={getter() === ""}
        aria-errormessage={`error-${id}`}
        required
      />
      <span
        id={`error-${id}`}
        class="text-primary-red hidden peer-invalid:block"
      >
        {error}
      </span>
    </div>
  );
}
