"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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

  const handleNo = () => {
    localStorage.setItem("ageConfirmed", "false");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Age Verification</DialogTitle>
        <p className="mb-4 text-center">
          Welcome to VibeCart! We are committed to responsible selling. To continue, please confirm your age.
        </p>
        <p className="mb-6 text-sm text-center text-gray-600">
          By clicking "Yes", you confirm you are 18 or older. Some products on this site require legal age verification. Please review our terms and conditions for more details.
        </p>
        <div className="flex justify-around">
          <Button onClick={handleYes} className="bg-orange-500 text-white">
            Yes
          </Button>
          <Button onClick={handleNo} variant="outline" className="border border-gray-800 text-gray-800">
            No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AgePopupComponent;
