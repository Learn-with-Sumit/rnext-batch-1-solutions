import { NextResponse } from "next/server";
const movies = () => import("@/data/data.json").then((res) => res.default);

const isAvailable = async (id) => {
  const data = await movies();
  return data?.results.find((movie) => movie.id === +id);
};
export async function GET(request, { params: { id } }) {
  if (!(await isAvailable(id))) {
    return new Response(JSON.stringify({ status: "error" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
      statusText: "Not Found",
    });
  }
  const data = await movies();
  const movie = data?.results.find((movie) => movie.id === +id);

  return NextResponse.json(movie);
}

export async function PATCH(request, { params: { id } }) {
  if (!(await isAvailable(id))) {
    return new Response(JSON.stringify({ status: "error" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
      statusText: "Not Found",
    });
  }
  const data = await movies();
  const { title } = await request.json();
  const movie = data?.results.find((movie) => movie.id === +id);
  return NextResponse.json({ ...movie, title });
}

export async function DELETE(request, { params: { id } }) {
  if (!(await isAvailable(id))) {
    return new Response(JSON.stringify({ status: "error" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
      statusText: "Not Found",
    });
  }
  const data = await movies();
  const movie = data?.results.filter((movie) => movie.id !== +id);
  return new Response(JSON.stringify({ status: "success" }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
    statusText: "Successfully deleted",
  });
}
