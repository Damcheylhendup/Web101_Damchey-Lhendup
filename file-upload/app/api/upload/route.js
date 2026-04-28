import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ message: "No file uploaded." }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { message: "Only JPG, PNG, and PDF files are allowed." },
        { status: 400 }
      );
    }

    if (file.size > maxSize) {
      return Response.json(
        { message: "File size must be less than 2MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const safeFileName = file.name.replace(/\s+/g, "_");
    const filePath = path.join(uploadDir, safeFileName);

    await writeFile(filePath, buffer);

    return Response.json({ message: "File uploaded successfully!" });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Upload failed." }, { status: 500 });
  }
}