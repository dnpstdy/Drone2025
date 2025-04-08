"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [droneId, setDroneId] = useState("");


  useEffect(() => {
    fetchAllDrones();
  }, []);

  const fetchAllDrones = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/config`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.status === "success") {
        const drone = data.data;
        console.log("Drone:", drone);
        setDrones(drone);
      } else {
        throw new Error("Drone data not found or ID mismatch");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  const searchDrone = async (droneId) => {
    setLoading(true);
    setError("");
    if (droneId !== undefined && droneId !== null && droneId !== "") {
      try {
        console.log(droneId);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PATH}/config/${droneId}`
        );
        const data = await response.json();
        if (data.data) {
          setDrones([data.data]);
        } else {
          setError("No drone found with this ID");
          fetchAllDrones();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    } else {
      fetchAllDrones();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchDrone(droneId);
  };

  return (
    <div className="text-center">
<div id="alertContainer">
  {error && (
    <div className="text-R p-[10px]">
      ⚠️ {error}
    </div>
  )}
</div>

      {loading ? (
        <div className="flex items-center justify-center h-screen drop-shadow-[0_0_3.81px_rgba(255,255,255,0.25)]">
<l-momentum
  size="60"
  speed="1.1"
  color="#76899E" 
></l-momentum>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <form
      onSubmit={handleSubmit}
      className="card mx-auto p-4 rounded-md w-[350px] lg:w-[425px]"
    >
      <div className="flex flex-col">
        <input
          type="number"
          className="form-control text-center p-2 rounded-md"
          required
          placeholder="Enter Drone ID"
          value={droneId}
          onChange={(e) => setDroneId(e.target.value)}
        />
      </div>
    </form>
          <div className="flex flex-wrap justify-center items-center w-[75vw] h-fit mx-auto">
            {drones.map((item) => (
              <div
                className={`block bg-S-50 rounded-lg my-3 mx-3 w-[350px] h-auto shadow-custom border border-b-8 ${
                  item.light === "on" ? "border-b-G" : "border-b-R"
                }`}
                key={item.drone_id}
              >
                {" "}
                <div className="rounded-lg p-5 text-left">
                  <div className="flex w-75">
                    <p
                      className={`flex-1 font-normal mb-0 ${
                        item.light === "on" ? "text-P-75" : "text-S-75"
                      }`}
                    >
                      ID
                    </p>
                    <p className={`flex-1 mt-[1px] mx-1 mb-0 ${
    item.light === 'on' ? 'text-P-200' : 'text-S-100'
  }`} >
                      {item.drone_id || "undefined"}
                    </p>
                  </div>
                  <div className="flex">
                    <p
                      className={`flex-1 font-normal mb-0 ${
                        item.light === "on" ? "text-P-75" : "text-S-75"
                      }`}
                    >
                      Name
                    </p>
                    <p className={`flex-1 mt-[1px] mx-1 mb-0 ${
    item.light === 'on' ? 'text-P-200' : 'text-S-100'
  }`} >
                      {item.drone_name || "undefined"}
                    </p>
                  </div>
                  <div className="flex">
                    <p
                      className={`flex-1 font-normal mb-0 ${
                        item.light === "on" ? "text-P-75" : "text-S-75"
                      }`}
                    >
                      Country
                    </p>
                    <p className={`flex-1 mt-[1px] mx-1 mb-0 ${
    item.light === 'on' ? 'text-P-200' : 'text-S-100'
  }`} >
                      {item.country || "undefined"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
