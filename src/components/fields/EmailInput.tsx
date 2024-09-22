import { validateEmail } from "@/utils/validate";
import { createMemo, onMount, type Setter } from "solid-js";

export default function EmailInput(props: {
  email: string;
  setEmail: Setter<string>;
}) {
  const validator = createMemo(() => validateEmail(props.email));

  onMount(() => {
    const el = document.getElementById("email") as HTMLInputElement;
    if (el) {
      props.setEmail(el.value.trim());
      el.setCustomValidity(validator()[1]);
    }
  });

  return (
    <div class="flex w-full flex-col gap-2 md:col-span-2">
      <label
        class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']"
        for="email"
      >
        Email Address
      </label>
      <input
        class="border-neutral-gray-500 invalid:border-primary-red hover:border-primary-green-600 focus:outline-primary-green-600 peer rounded-lg border-[1px] px-6 py-3"
        id="email"
        type="email"
        value={props.email}
        onInput={(event) =>
          props.setEmail((event.target as HTMLInputElement).value)
        }
        aria-invalid={validator()[0]}
        aria-errormessage="error-email"
        required
      />
      <span id="error-email" class="text-primary-red hidden peer-invalid:block">
        {validator()[1]}
      </span>
    </div>
  );
}
