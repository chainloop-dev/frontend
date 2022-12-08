import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  // NOTE: if we don't add this return the compiler will fail
  return "";
}
