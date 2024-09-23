import { onMount, Show, type Setter } from "solid-js";
import styles from "./Input.module.sass";

export default function CheckboxInput(props: {
  consent: boolean;
  setConsent: Setter<boolean>;
}) {
  onMount(() => {
    const el = document.getElementById("consent") as HTMLInputElement;
    props.setConsent(el.checked);
  });

  return (
    <div class="flex flex-col gap-2 md:col-span-2">
      <label class="mt-4 flex flex-row items-center gap-4">
        <input
          class={styles.checkbox}
          type="checkbox"
          id="consent"
          required
          checked={props.consent}
          onChange={(event) =>
            props.setConsent((event.target as HTMLInputElement).checked)
          }
        />
        <span class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']">
          I consent to being contacted by the team
        </span>
      </label>

      <Show when={!props.consent}>
        <span class="text-primary-red">
          To submit this form, please consent to being contacted
        </span>
      </Show>
    </div>
  );
}
