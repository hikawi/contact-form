import { createEffect, type Accessor, type Setter } from "solid-js";

export default function TextareaInput({
  id,
  label,
  getter,
  setter,
}: {
  id: string;
  label: string;
  getter: Accessor<string>;
  setter: Setter<string>;
}) {
  createEffect(() => {
    setter((document.getElementById(id) as HTMLTextAreaElement).value.trim());
  });

  return (
    <div class="flex w-full flex-col gap-2 md:col-span-2">
      <label
        class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']"
        for={id}
      >
        {label}
      </label>
      <textarea
        class="border-neutral-gray-500 invalid:border-primary-red hover:border-primary-green-600 focus:outline-primary-green-600 resize-none rounded-lg border-[1px] px-6 py-3"
        rows={3}
        id={id}
        value={getter()}
        onInput={(event) => setter((event.target as HTMLTextAreaElement).value)}
        required
      />
      <span
        class="text-primary-red"
        classList={{ hidden: getter() !== "", block: getter() === "" }}
      >
        This field is required
      </span>
    </div>
  );
}
