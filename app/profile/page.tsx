import MyProfileComponent from "@/components/shared/profile";
import { ClerkProvider } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import React, { Suspense } from "react";

const ProfilePage = () => {
  return (
    <div>
      <Suspense fallback={<Loader className="animate-spin" />}>
        <ClerkProvider dynamic={true}>
          <MyProfileComponent />
        </ClerkProvider>
      </Suspense>
    </div>
  );
};

export default ProfilePage;
