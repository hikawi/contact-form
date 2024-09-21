import { createEffect, type Accessor, type Setter } from "solid-js";

export default function RadioInput({
  name,
  choices,
  getter,
  setter,
}: {
  name: string;
  choices: string[];
  getter: Accessor<string>;
  setter: Setter<string>;
}) {
  createEffect(() => {
    const el = document.querySelector(
      `input[name="${name}"]:checked`,
    ) as HTMLInputElement;
    if (el) {
      setter(el.value);
    }
  });

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    setter(target.value);
  }

  return (
    <fieldset class="w-full space-y-2 md:col-span-2">
      <legend class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']">
        {name}
      </legend>

      <div class="grid grid-flow-row grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        {choices.map((choice, idx) => (
          <label class="border-neutral-gray-500 hover:border-primary-green-600 active:bg-primary-green-200 has-[:checked]:bg-primary-green-200 flex w-full flex-row items-center justify-start gap-3 rounded-lg border-[1px] px-6 py-3 text-lg">
            <input
              type="radio"
              name={name}
              value={choice}
              id={`radio-query-${idx}`}
              checked={getter() === choice}
              onChange={handleChange}
              class="border-neutral-gray-500 checked:border-primary-green-600 checked:accent-primary-green-600 m-0 size-6 border-[1px] bg-transparent opacity-50 checked:opacity-100"
              required
            />
            <span>{choice}</span>
          </label>
        ))}
      </div>

      <span
        class="text-primary-red"
        classList={{ hidden: getter() !== "", block: getter() === "" }}
      >
        Please select a query type
      </span>
    </fieldset>
  );
}
