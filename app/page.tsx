import { notFound } from "next/navigation";
import MonthPage from "@/components/MonthPage";
import { getLatestMonth } from "@/lib/content";
import { monthMetadata } from "@/lib/meta";

export async function generateMetadata() {
  const month = getLatestMonth();
  return month ? monthMetadata(month) : {};
}

export default function Home() {
  const month = getLatestMonth();
  if (!month) notFound();
  return <MonthPage month={month} />;
}
