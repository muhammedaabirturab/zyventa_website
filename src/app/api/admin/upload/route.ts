import { NextResponse } from "next/server";
import { getAdmin } from "@/lib/auth/session";
import { saveImage, UploadError } from "@/lib/storage";

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image was received." }, { status: 400 });
  }

  try {
    const url = await saveImage(file);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof UploadError ? error.message : "The image could not be saved.";
    if (!(error instanceof UploadError)) console.error("Image upload failed", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
