import { onMount, Show, type Setter } from "solid-js";

export default function MessageInput(props: {
  message: string;
  setMessage: Setter<string>;
}) {
  onMount(() => {
    const textarea = document.getElementById("message") as HTMLTextAreaElement;
    props.setMessage(textarea.value.trim());
  });

  return (
    <div class="flex w-full flex-col gap-2 md:col-span-2">
      <label
        class="after:text-primary-green-600 relative after:relative after:left-1 after:top-0 after:content-['*']"
        for="message"
      >
        Message
      </label>
      <textarea
        class="border-neutral-gray-500 invalid:border-primary-red hover:border-primary-green-600 focus:outline-primary-green-600 resize-none rounded-lg border-[1px] px-6 py-3"
        rows={3}
        id="message"
        value={props.message}
        onInput={(event) =>
          props.setMessage((event.target as HTMLTextAreaElement).value)
        }
        required
      />

      <Show when={props.message === ""}>
        <span class="text-primary-red">This field is required</span>
      </Show>
    </div>
  );
}
