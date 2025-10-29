import { NextResponse } from "next/server";

const ApiResponse = {
  success: (data: {} | null, message = "ok", status = 200) => {
    return NextResponse.json({ success: true, message, data }, { status });
  },
  error: (
    message = "something went wrong",
    status = 500,
    code?: string,
    details?: {}
  ) => {
    return NextResponse.json(
      {
        success: false,
        message,
        error: {
          code,
          details,
        },
      },
      { status }
    );
  },
};
export { ApiResponse };
