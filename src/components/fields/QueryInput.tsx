import { For, onMount, Show, type Setter } from "solid-js";
import styles from "./Input.module.sass";

const choices = ["General Enquiry", "Support Request"];

export default function QueryInput(props: {
  query: string;
  setQuery: Setter<string>;
}) {
  onMount(() => {
    const elements = choices.map(
      (_, idx) =>
        document.getElementById(`query-choice-${idx}`) as HTMLInputElement,
    );
    for (const element of elements) {
      if (element.checked) {
        props.setQuery(element.value);
        break;
      }
    }
  });

  function handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    props.setQuery(target.value);
  }

  return (
    <fieldset class="w-full space-y-2 md:col-span-2">
      <legend class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']">
        Query Type
      </legend>

      <div class="grid grid-flow-row grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        <For each={choices}>
          {(choice, idx) => (
            <label class="border-neutral-gray-500 hover:border-primary-green-600 active:bg-primary-green-200 has-[:checked]:bg-primary-green-200 flex w-full flex-row items-center justify-start gap-3 rounded-lg border-[1px] px-6 py-3 text-lg">
              <input
                type="radio"
                name="queryType"
                id={`query-choice-${idx()}`}
                value={choice}
                checked={props.query === choice}
                onChange={handleChange}
                class={styles.radio}
                required
              />
              <span>{choice}</span>
            </label>
          )}
        </For>
      </div>

      <Show when={props.query === ""}>
        <span class="text-primary-red mt-2">Please select a query type</span>
      </Show>
    </fieldset>
  );
}
