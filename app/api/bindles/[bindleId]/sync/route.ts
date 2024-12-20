import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

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

    const bindle = await prisma.bindle.findFirst({
      where: { id: bindleId },
      include: {
        user: true,
        cloudSyncs: true,
      },
    });

    if (!bindle) {
      return NextResponse.json(
        { success: false, message: 'Bindle not found' },
        { status: 404 },
      );
    }

    const updatedCloudSyncs = await Promise.all(
      bindle.cloudSyncs.map(async (cloudSync) => {
        const updatedSync = await prisma.cloudSync.update({
          where: { id: cloudSync.id },
          data: {
            syncStatus: 'completed',
            lastSyncTime: new Date(),
          },
        });

        return updatedSync;
      })
    );

    const conflicts = updatedCloudSyncs.filter(
      (sync) => sync.syncStatus === 'conflict',
    );

    if (conflicts.length > 0) {
      await sendEmail({
        to: bindle.user.email,
        template: {
          subject: 'Sync Conflicts Detected',
          html: '<h1>Conflicts detected during sync</h1>',
          text: 'Conflicts detected during sync',
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Conflicts detected during sync',
          data: {
            bindleId: bindle.id,
            syncStatus: 'conflict',
            lastSyncTime: new Date(),
          },
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Bindle synced successfully',
        data: {
          bindleId: bindle.id,
          syncStatus: 'completed',
          lastSyncTime: new Date(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error syncing bindle:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 },
    );
  }
}