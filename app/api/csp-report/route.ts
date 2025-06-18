import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    
    // Log CSP violations (you can enhance this to store in a database or send to monitoring service)
    console.log("CSP Violation Report:", body);
    
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("CSP Report Error:", error);
    return NextResponse.json({ error: "Failed to process report" }, { status: 500 });
  }
}
