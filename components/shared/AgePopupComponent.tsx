"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AgePopupComponent = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ageConfirmed = localStorage.getItem("ageConfirmed");
    if (!ageConfirmed) {
      setOpen(true);
    }
  }, []);

  const handleYes = () => {
    localStorage.setItem("ageConfirmed", "true");
    setOpen(false);
  };

  // Modified: simply save the response without any redirection.
  const handleNo = () => {
    localStorage.setItem("ageConfirmed", "false");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-sm mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Age Verification</h2>
          <p className="mb-4 text-center">
            Welcome to VibeCart! We are committed to responsible selling. 
            To continue, please confirm your age.
          </p>
          <p className="mb-6 text-sm text-center text-gray-600">
            By clicking "Yes", you confirm you are 18 or older. Some of the products on this site 
            require legal age verification. Please review our terms and conditions for more details.
          </p>
          <div className="flex justify-around">
            <Button onClick={handleYes} className="bg-orange-500 text-white">
              Yes
            </Button>
            <Button onClick={handleNo} variant="outline" className="border border-gray-800 text-gray-800">
              No
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AgePopupComponent;
