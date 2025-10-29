import { ApiResponse } from "@/lib/apiResponse";


export async function GET() {
  return ApiResponse.success(null, "Api working fine", 200);
}
