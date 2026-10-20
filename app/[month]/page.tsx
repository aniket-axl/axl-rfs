import { notFound } from "next/navigation";
import MonthPage from "@/components/MonthPage";
import { getMonths } from "@/lib/content";
import { monthMetadata } from "@/lib/meta";

type Props = { params: Promise<{ month: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getMonths().map((month) => ({ month }));
}

export async function generateMetadata({ params }: Props) {
  return monthMetadata((await params).month);
}

export default async function Page({ params }: Props) {
  const { month } = await params;
  if (!getMonths().includes(month)) notFound();
  return <MonthPage month={month} />;
}
