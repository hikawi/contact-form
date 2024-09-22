import { validateName } from "@/utils/validate";
import { createMemo, onMount, type Setter } from "solid-js";

export default function NameInput(props: {
  name: string;
  setName: Setter<string>;
  lastName?: boolean;
}) {
  const validateResult = createMemo(() => validateName(props.name));
  const id = props.lastName ? "last-name" : "first-name";

  // Update the current state with the value saved.
  onMount(() => {
    const el = document.getElementById(id) as HTMLInputElement;
    props.setName(el.value.trim());
    el.setCustomValidity(validateResult()[1]);
  });

  function handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    props.setName(target.value);
    target.setCustomValidity(validateResult()[1]);
  }

  return (
    <div class="flex w-full flex-col gap-2">
      <label
        class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']"
        for={id}
      >
        {props.lastName ? "Last Name" : "First Name"}
      </label>
      <input
        class="border-neutral-gray-500 invalid:border-primary-red hover:border-primary-green-600 focus:outline-primary-green-600 peer rounded-lg border-[1px] px-6 py-3"
        id={id}
        type="text"
        value={props.name}
        onInput={handleInput}
        aria-invalid={validateResult()[0]}
        aria-errormessage={`error-${id}`}
        data-lpignore="true"
        required
      />
      <span
        id={`error-${id}`}
        class="text-primary-red hidden peer-invalid:block"
      >
        {validateResult()[1]}
      </span>
    </div>
  );
}
