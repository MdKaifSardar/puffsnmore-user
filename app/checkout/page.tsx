"use client";

import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  MapPinIcon,
  TicketIcon,
  CreditCardIcon,
} from "lucide-react";
import Link from "next/link";

type Steps = {
  title: string;
  icon: React.ReactNode;
};

const steps: Steps[] = [
  { title: "Delivery Address", icon: <MapPinIcon className="h-5 w-5" /> },
  { title: "Apply Coupon", icon: <TicketIcon className="h-5 w-5" /> },
  { title: "Choose Payment", icon: <CreditCardIcon className="h-5 w-5" /> },
];
type OrderItems = {
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
};
const orderItems: OrderItems[] = [
  {
    name: "High-End Fragrance Collection for Males",
    size: "300ml",
    quantity: 1,
    price: 999.0,
    image:
      "https://res.cloudinary.com/dtxh3ew7s/image/upload/v1727352106/2_upscaled_g6ibby.png",
  },
  {
    name: "High-End Fragrance Collection for Males",
    size: "200ml",
    quantity: 1,
    price: 799.0,
    image:
      "https://res.cloudinary.com/dtxh3ew7s/image/upload/v1727352106/1_upscaled_pku7p3.png",
  },
];
const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  const discount = 600;
  const total = subtotal - discount;
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="heading mb-6 text-center">CHECKOUT</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 w-full px-4">
          <div className="flex flex-col lg:flex-row mb-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center mb-4 lg:mb-0 lg:flex-row flex-col lg:space-x-4"
              >
                <div
                  className={`rounded-full p-2 ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {index < currentStep ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="ml-0 lg:ml-4 lg:mr-8 text-center lg:text-left">
                  <p
                    className={`text-sm font-medium ${
                      index <= currentStep
                        ? "text-primary"
                        : "text-secondary-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="h-0.5 w-8 bg-border mt-1 lg:mt-0 mr-0 lg:mr-4 hidden lg:block"></div>
                )}
              </div>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="subHeading">
                {steps[currentStep].title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First Name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input id="phoneNumber" placeholder="Phone Number" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zipCode">Zip Code / Postal Code</Label>
                      <Input
                        id="zipCode"
                        placeholder="Zip Code / Postal Code"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Country"
                        defaultValue="India"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address1">Address 1</Label>
                    <Input id="address1" placeholder="Address 1" />
                  </div>
                  <div>
                    <Label htmlFor="address2">Address 2</Label>
                    <Input id="address2" placeholder="Address 2" />
                  </div>
                  <Button className="w-full" onClick={handleNext}>
                    Save Address
                  </Button>
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="couponCode">Enter Coupon Code</Label>
                    <Input
                      id="couponCode"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleNext}>
                    Apply Coupon
                  </Button>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="razorpay" id="razorpay" />
                      <Label htmlFor="razorpay">Razorpay</Label>
                    </div>
                  </RadioGroup>
                  <Link href={"/order"}>
                    <Button className="w-full" onClick={handleNext}>
                      Confirm Payment Method
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="mt-4 flex space-x-4 justify-center lg:justify-start">
            {currentStep > 0 && (
              <Button variant={"outline"} onClick={handlePrevious}>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button variant={"outline"} onClick={handlePrevious}>
                Continue
              </Button>
            )}
          </div>
        </div>

        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="subHeading">Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div>
                      <h3 className="para">{item.name}</h3>
                      <p className="text-sm text-gray-600">Size: {item.size}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-medium">₹ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({orderItems.length} Items):</span>
                    <span>₹ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Cart Discount:</span>
                    <span>- ₹ {discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold mt-2">
                    <span>Total:</span>
                    <span>₹ {total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href={"/order"}>
                  <Button className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300">
                    Place Order with COD
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
