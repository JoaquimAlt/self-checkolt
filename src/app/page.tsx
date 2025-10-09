import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5">
      <h1>Se você é gayzinho clique aqui</h1>
      <Button asChild>
        <Link href={"/fsw-donalds"}>Click me</Link>
      </Button>
    </div>
  );
}
