import Head from "next/head";
import { useState } from "react";
import { Alert, FormInput, Loader } from "../../components";
import Image from "next/image";
import { createRoom } from "../../firebase";
import { useRouter } from "next/router";

export default function RoomForm() {
  // hooks
  const router = useRouter();

  // state
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  // handlers
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const roomId = await createRoom(name);
    router.push(`/room/${roomId}`);
  }

  return (
    <>
      <Head>
        <title>{`Create Room`}</title>
      </Head>
      <div className="flex justify-center items-center h-[calc(100vh-48px)]">
        <div className="w-[min(80vw,400px)] bg-white rounded-lg shadow-lg flex items-center justify-evenly flex-col p-4 gap-4">
          <h1 className="text-2xl">Create Room</h1>
          <Alert {...alert} />
          <form onSubmit={handleSubmit}>
            <FormInput
              id="nameInput"
              labelText="Name"
              type="text"
              name="name"
            />
            <input
              type="submit"
              className="btn block mx-auto"
              value="Create Room"
            />
          </form>
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
}
