import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; //

// Update user profile (PUT request)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { id, name } = body;

    if (!id || !name) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }

    // Assume you're using Prisma or another ORM to update the user's profile in the DB
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating profile", success: false },
      { status: 500 }
    );
  }
}
