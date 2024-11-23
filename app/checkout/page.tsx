import CheckoutPageComponent from "@/components/shared/checkout";
import { ClerkProvider } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

const CheckoutPage = () => {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <ClerkProvider dynamic={true}>
          <CheckoutPageComponent />
        </ClerkProvider>
      </Suspense>
    </div>
  );
};

export default CheckoutPage;
