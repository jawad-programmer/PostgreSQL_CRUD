import { getAllInstitutes } from "@/lib/institute.service";
import { addInstitute } from "./actions/institute.actions";
import Index from "./pages";
import Link from "next/link";

export default async function Home() {

  const institutes = await getAllInstitutes();
  return (
    <>
    <h1>testing</h1>
    
    <Link href="/create">Go to Create Institute Page</Link>
      {/* <Index /> */}
    </>
  );
}
