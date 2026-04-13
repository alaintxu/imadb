import { NextRequest, NextResponse } from "next/server";
import { getIMAs } from "@/lib/imas/imas";

function parseBooleanParam(value: string | null): boolean | undefined {
	if (value === null) {
		return undefined;
	}

	if (value === "true") {
		return true;
	}

	if (value === "false") {
		return false;
	}

	return undefined;
}

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const villainCode = searchParams.get("villain") ?? undefined;
	const authorUsername = searchParams.get("author") ?? undefined;
	const modularSetCodes = searchParams.getAll("modularSet");
	const tags = searchParams.getAll("tag");
	const original = parseBooleanParam(searchParams.get("original"));

	const filteredImas = await getIMAs({
		villainCode,
		authorUsername,
		modularSetCodes: modularSetCodes.length > 0 ? modularSetCodes : undefined,
		tags: tags.length > 0 ? tags : undefined,
		original,
	});

  return NextResponse.json(filteredImas, {
    headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
  });
}
