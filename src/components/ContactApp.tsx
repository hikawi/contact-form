import { isDataValid } from "@/utils/validate";
import { createMemo, createSignal, Show } from "solid-js";
import ConsentInput from "./fields/ConsentInput";
import EmailInput from "./fields/EmailInput";
import MessageInput from "./fields/MessageInput";
import NameInput from "./fields/NameInput";
import QueryInput from "./fields/QueryInput";
import SubmitButton from "./fields/SubmitButton";
import SuccessModal from "./SuccessModal";

export default function ContactApp() {
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [queryType, setQueryType] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [consent, setConsent] = createSignal(false);

  const object = createMemo(() => ({
    firstName: firstName(),
    lastName: lastName(),
    email: email(),
    queryType: queryType(),
    message: message(),
    consent: consent(),
  }));
  const disabled = createMemo(() => !isDataValid(object()));

  const [modal, setModal] = createSignal(false);

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    setModal(true);
    setTimeout(() => setModal(false), 5000);

    setFirstName("");
    setLastName("");
    setEmail("");
    setQueryType("");
    setMessage("");
    setConsent(false);
  }

  return (
    <main class="~p-6/10 text-neutral-gray-900 w-full max-w-[46rem] rounded-2xl bg-white">
      <Show when={modal()}>
        <SuccessModal />
      </Show>
      <div class="flex flex-col gap-8">
        <h1 class="text-[2rem] font-bold leading-none tracking-tighter">
          Contact Us
        </h1>
        <form
          class="grid grid-flow-row grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2"
          onSubmit={handleSubmit}
          novalidate
          id="contact-form"
        >
          <NameInput name={firstName()} setName={setFirstName} />
          <NameInput name={lastName()} setName={setLastName} lastName />
          <EmailInput email={email()} setEmail={setEmail} />
          <QueryInput query={queryType()} setQuery={setQueryType} />
          <MessageInput message={message()} setMessage={setMessage} />
          <ConsentInput consent={consent()} setConsent={setConsent} />
          <SubmitButton disabled={disabled} />
        </form>
      </div>
    </main>
  );
}
