import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })
    const newIssue = await prisma.issue.create({ data: body });

    return NextResponse.json(newIssue, { status: 201 })
}