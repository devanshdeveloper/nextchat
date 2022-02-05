import Head from "next/head";
import { createRef, useEffect, useState } from "react";
import { Alert, FormInput, Loader, MessageList } from "../components";
import { addMessage, onMessages } from "../firebase";

export default function Home() {
  // input refs
  const messageRef = createRef();

  // state
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // functions
  function handleSubmit(e) {
    e.preventDefault();
    const text = messageRef.current.value;
    if (!text) return;
    messageRef.current.value = "";
    addMessage(text).catch((e) => {
      console.log(e);
    });
  }

  function handleError(e) {
    setAlert({ message: interpretError(e.code), type: "error" });
  }

  useEffect(() => {
    return onMessages((s) => {
      if (s.exists()) setMessages(s.val());
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Group Message</title>
      </Head>
      <div>
        <Alert {...alert} />
        <MessageList messageData={messages} />
        <div className="h-14"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 left-0 w-full h-14 gap-3 bg-white flex items-center justify-center"
      >
        <FormInput
          type="text"
          ref={messageRef}
          className="w-[min(60vw,600px)]"
        />
        <button className="btn">Send</button>
      </form>
      <Loader loading={loading} />
    </>
  );
}
