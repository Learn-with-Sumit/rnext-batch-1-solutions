import { NextResponse } from "next/server";
const movies = () => import("@/data/data.json").then((res) => res.default);

export async function GET() {
  const data = await movies();
  return NextResponse.json(data);
}
