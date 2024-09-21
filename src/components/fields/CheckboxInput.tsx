import { createEffect, type Accessor, type Setter } from "solid-js";

export default function CheckboxInput({
  label,
  getter,
  setter,
}: {
  label: string;
  getter: Accessor<boolean>;
  setter: Setter<boolean>;
}) {
  createEffect(() => {
    setter(
      (document.getElementById("checkbox-consent") as HTMLInputElement).checked,
    );
  });

  return (
    <div class="flex flex-col gap-2 md:col-span-2">
      <label class="mt-4 flex flex-row items-center gap-4">
        <input
          class="border-neutral-gray-500 accent-primary-green-600 hover:border-primary-green-600 focus:outline-primary-green-600 size-6 rounded-lg border-[1px] px-6 py-3"
          type="checkbox"
          id="checkbox-consent"
          required
          checked={getter()}
          onChange={(event) =>
            setter((event.target as HTMLInputElement).checked)
          }
        />
        <span class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']">
          {label}
        </span>
      </label>

      <span
        class="text-primary-red"
        classList={{ hidden: getter(), block: !getter() }}
      >
        To submit this form, please consent to being contacted
      </span>
    </div>
  );
}
