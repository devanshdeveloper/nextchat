import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createRoom, getRoomNamesForUser } from "../firebase";
import { FormInput } from "../components";
import { useRouter } from "next/router";

export default function Home() {
  // hooks
  const router = useRouter();

  // state
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    getRoomNamesForUser().then((r) => {
      setRooms(r);
    });
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const roomId = await createRoom(name);
    router.push(`/room/${roomId}`);
  }

  return (
    <>
      <Head>
        <title>Rooms</title>
      </Head>
      <div className="flex flex-col items-center gap-5 pt-20">
        <div className="flex gap-5">
          <Link href="/room/create" className="btn">
            Create Room
          </Link>
          <Link href="/room/join" className="btn">
            Join Room
          </Link>
        </div>
        <div className="text-2xl font-bold">Joined Rooms</div>
        <div className="space-y-5 w-[min(500px,80vw)]">
          {rooms &&
            rooms.map((room) => (
              <Link
                key={room.id}
                className="bg-white px-4 py-2 block rounded-md text-center
                w-full"
                href={`/room/${room.id}`}
              >
                {room.name}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}
