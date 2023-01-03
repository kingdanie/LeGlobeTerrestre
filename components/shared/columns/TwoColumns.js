import React from "react";

export default function TwoColumns() {
  return (
    <div className="flex flex-wrap -mx-3 overflow-hidden">
      <div className="my-3 px-3 w-full overflow-hidden lg:w-1/2 xl:w-1/2"></div>

      <div className="my-3 px-3 w-full overflow-hidden lg:w-1/2 xl:w-1/2"></div>
    </div>
  );
}
