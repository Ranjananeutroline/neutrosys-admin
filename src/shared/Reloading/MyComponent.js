import React, { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

function MyComponent() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  return (
    <div className="MyComponent">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ScaleLoader size={30} color={"#53217f"} loading={loading} />
        </div>
      ) : (
        <header className="min-h-screen flex flex-col items-center justify-center bg-silver text-white">
          <p className="text-blue-500 hover:text-blue-700">Learn React</p>
        </header>
      )}
    </div>
  );
}

export default MyComponent;
