import { NextResponse } from "next/server";
import { getAllIMAs } from "@/lib/imas/imas";

export async function GET() {
	const imas = await getAllIMAs();
	return NextResponse.json(imas);
}
