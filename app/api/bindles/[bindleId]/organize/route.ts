import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: { bindleId: string } },
) {
  try {
    const bindleId = parseInt(params.bindleId, 10);
    if (isNaN(bindleId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid bindle ID' },
        { status: 400 },
      );
    }

    const bindle = await prisma.bindle.findUnique({
      where: { id: bindleId },
    });

    if (!bindle) {
      return NextResponse.json(
        { success: false, message: 'Bindle not found' },
        { status: 404 },
      );
    }

    const organizedContent = {}; // Placeholder for LLM processing logic

    await prisma.bindle.update({
      where: { id: bindleId },
      data: { organizedContent },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Content organized successfully',
        data: { bindleId: bindle.id, organizedContent },
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error organizing content:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', data: error },
      { status: 500 },
    );
  }
}