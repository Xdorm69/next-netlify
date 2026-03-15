import { getAuthUser } from "@/lib/utils";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const currentUser = await getAuthUser();
    if (!currentUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ currentUser });
}
