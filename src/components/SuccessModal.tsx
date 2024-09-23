import { onCleanup, onMount } from "solid-js";
import IconSuccess from "./icons/IconSuccess";

export default function SuccessModal() {
  onMount(() => {
    document.getElementById("modal")?.focus();
  });

  onCleanup(() => {
    document.getElementById("contact-form")?.focus();
  });

  return (
    <div
      class="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center bg-transparent p-6"
      role="alert"
      tabindex={-1}
      aria-labelledby="modal-text"
      aria-describedby="modal-message"
      id="modal"
    >
      <div class="bg-primary-green-600 animate-slide-down flex w-full max-w-[28.125rem] flex-col gap-2 rounded-xl p-6 text-white">
        <div class="flex flex-row items-center gap-2">
          <IconSuccess />
          <h1 class="text-lg font-bold" id="modal-text">
            Message Sent!
          </h1>
        </div>
        <p class="text-primary-green-200" id="modal-message">
          Thanks for completing the form. We'll be in touch soon!
        </p>
      </div>
    </div>
  );
}
