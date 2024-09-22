import IconSuccess from "./icons/IconSuccess";

export default function SuccessModal() {
  return (
    <div class="fixed left-0 top-0 z-10 flex h-full w-full flex-col items-center bg-transparent p-6">
      <div class="bg-primary-green-600 animate-slide-down flex w-full max-w-[28.125rem] flex-col gap-2 rounded-xl p-6 text-white">
        <div class="flex flex-row items-center gap-2">
          <IconSuccess />
          <h1 class="text-lg font-bold">Message Sent!</h1>
        </div>
        <p class="text-primary-green-200">
          Thanks for completing the form. We'll be in touch soon!
        </p>
      </div>
    </div>
  );
}
