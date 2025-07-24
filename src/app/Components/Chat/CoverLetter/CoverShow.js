import React from "react";

const Show = ({ data }) => {
  return (
    <div className="w-full h-full border border-neutral-300 rounded-lg p-4 flex flex-col overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">AI Output</h2>
      {data ? (
        <pre className="text-sm whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <p className="text-neutral-500 text-sm">Waiting for input...</p>
      )}
    </div>
  );
};

export default Show;
