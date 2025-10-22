"use server";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/lib/apiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.accessToken) {
    return ApiResponse.error(
      "session not found",
      401,
      "401",
      "accesstoken not found"
    );
  }
  try {
    // Simulate async operation that fails
    const doSomething = await new Promise((resolve, reject) => {
      reject(new Error("Operation failed"));
    });

    return ApiResponse.success(doSomething, "Operation succeeded");
  } catch (error: any) {
    console.error("❌ Error in GET handler:", error);

    return ApiResponse.error(
      `Something went wrong: ${error.message || "Unknown error"}`,
      400,
      "OPERATION_FAILED"
    );
  }
}
