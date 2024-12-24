"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";

const PercentageLoader = ({setIsFinished}) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState("4g"); // Store network speed
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Function to get network connection info using Network Information API
  const getNetworkSpeed = () => {
    if (navigator.connection) {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      setNetworkSpeed(connection.effectiveType); // 'slow-2g', '2g', '3g', '4g'
    }
  };

  useEffect(() => {
    // Check network speed on component mount
    getNetworkSpeed();

    // Add event listener to detect network changes
    const handleNetworkChange = () => {
      getNetworkSpeed();
    };

    // Listen for changes in network type
    if (navigator.connection) {
      navigator.connection.addEventListener("change", handleNetworkChange);
    }

    // Clean up the event listener
    return () => {
      if (navigator.connection) {
        navigator.connection.removeEventListener("change", handleNetworkChange);
      }
    };
  }, []);

  useEffect(() => {
    let timer;
    const startLoading = () => {
      setIsLoading(true);
      setProgress(0);

      const getIntervalBasedOnNetwork = () => {
        switch (networkSpeed) {
          case "slow-2g":
            return 200; // Slow interval for very slow connections
          case "2g":
            return 150; // Slow connection
          case "3g":
            return 100; // Moderate connection
          case "4g":
            return 50; // Fast connection
          default:
            return 100; // Default to moderate
        }
      };

      const interval = getIntervalBasedOnNetwork();

      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 90) {
            clearInterval(timer);
            return 90;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 90);
        });
      }, interval);
    };

    const stopLoading = () => {
      clearInterval(timer);
      setProgress(100);
      setTimeout(() => {
        setIsFinished(true)
        setIsLoading(false);
      }, 500);
    };

    startLoading();

    // Stop loading after a small delay
    setTimeout(stopLoading, 50);

    return () => {
      clearInterval(timer);
    };
  }, [pathname, searchParams, networkSpeed,setIsFinished]); // Add networkSpeed as dependency

  if (!isLoading && progress === 100) {
    return null;
  }

  return (
    <div className=" inset-0 flex items-center justify-center bg-gradient-to-b from-[#021821] to-[#3D1D1D] h-screen z-50 relative">
      <div className="w-[30rem] text-center pb-10">
        <div className="w-auto h-auto">
        <img src="/image/loadingImg.png" alt="My image" className="w-full h-auto " />
        </div>
        <div className="mb-4 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default PercentageLoader;
