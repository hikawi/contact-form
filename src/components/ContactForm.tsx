import { createMemo, createSignal } from "solid-js";
import CheckboxInput from "./fields/CheckboxInput";
import RadioInput from "./fields/RadioInput";
import SubmitButton from "./fields/SubmitButton";
import TextareaInput from "./fields/TextareaInput";
import TextInput from "./fields/TextInput";
import { z } from "astro:schema";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  queryType: z.enum(["General Enquiry", "Support Request"]),
  message: z.string().min(1),
  consent: z.literal(true),
});

export default function ContactForm() {
  const [firstName, setFirstName] = createSignal("");
  const [lastName, setLastName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [queryType, setQueryType] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [consent, setConsent] = createSignal(false);
  const disabled = createMemo(() => !isDataValid());

  function isDataValid() {
    const data = {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      queryType: queryType(),
      message: message(),
      consent: consent(),
    };
    const success = schema.safeParse(data).success;
    console.log("Checking", data, "was", success);
    return success;
  }

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const data = {
      firstName: firstName(),
      lastName: lastName(),
      email: email(),
      queryType: queryType(),
      message: message(),
      consent: consent(),
    };

    console.log(data, schema.safeParse(data));
  }

  return (
    <main class="~p-6/10 text-neutral-gray-900 w-full max-w-[46rem] rounded-2xl bg-white">
      <div class="flex flex-col gap-8">
        <h1 class="text-[2rem] font-bold leading-none tracking-tighter">
          Contact Us
        </h1>
        <form
          class="grid grid-flow-row grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          <TextInput
            id="first-name"
            label="First Name"
            error="This field is required"
            getter={firstName}
            setter={setFirstName}
          />
          <TextInput
            id="last-name"
            label="Last Name"
            error="This field is required"
            getter={lastName}
            setter={setLastName}
          />
          <TextInput
            id="email"
            label="Email Address"
            type="email"
            error="Please enter a valid email address"
            getter={email}
            setter={setEmail}
            span
          />

          <RadioInput
            name="Query Type"
            choices={["General Enquiry", "Support Request"]}
            getter={queryType}
            setter={setQueryType}
          />

          <TextareaInput
            id="message"
            label="Message"
            getter={message}
            setter={setMessage}
          />

          <CheckboxInput
            label="I consent to being contacted by the team"
            getter={consent}
            setter={setConsent}
          />

          <SubmitButton disabled={disabled} />
        </form>
      </div>
    </main>
  );
}
