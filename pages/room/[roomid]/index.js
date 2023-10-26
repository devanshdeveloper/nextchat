import Head from "next/head";
import { createRef, useEffect, useRef, useState } from "react";
import { Alert, FormInput, Loader, MessageList } from "../../../components";
import { exitRoom, joinRoom, onRoom, sendMessage } from "../../../firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import Modal from "../../../components/Modal";

export default function RoomPage() {
  // hooks
  const router = useRouter();
  const roomId = router.query.roomid;

  // input refs
  const messageRef = createRef();
  const lastMessageRef = useRef();

  // state
  const [modal, setModal] = useState();
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // functions
  function handleSubmit(e) {
    e.preventDefault();
    const text = messageRef.current.value;
    if (!text) return;
    messageRef.current.value = "";
    sendMessage(roomId, text).catch(handleError);
  }

  function handleError(e) {
    setAlert({ message: interpretError(e.code), type: "error" });
  }

 async function handleExitRoom() {
   await exitRoom(roomId)
   router.push("/")
  }

  useEffect(() => {
    joinRoom(roomId);
    return onRoom(roomId, (s) => {
      if (s.exists()) setRoom(s.val());
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      setLoading(false);
    });
  }, [roomId]);

  return (
    <>
      <Head>
        <title>Group Message</title>
      </Head>
      <div className="pt-16">
        <Modal show={modal} setModal={setModal} text={`${room.name} | settings`}>
          <button onClick={handleExitRoom} className="btn">
            Exit Room
          </button>
        </Modal>
        <Alert {...alert} />
        <div className="h-16 text-2xl w-full fixed bg-white flex items-center justify-center border-t-2">
          <button onClick={() => setModal(true)}>{room.name}</button>
        </div>
        <div className="h-20"></div>
        <MessageList messageData={room.messages} />
        <div className="h-20" ref={lastMessageRef}></div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="fixed w-full bottom-0 left-0 h-14 gap-3 bg-white flex items-center justify-center"
      >
        <FormInput
          type="text"
          ref={messageRef}
          className="w-[min(60vw,600px)]"
        />
        <button className="btn">Send</button>
      </form>
      {loading && <Loader />}
    </>
  );
}
