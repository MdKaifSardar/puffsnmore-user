import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { XCircle } from "lucide-react";
import { FaLink } from "react-icons/fa";
import Link from "next/link";

const orders = [
  {
    id: "66ed5ec9d316594990e71a19",
    products: [
      "https://res.cloudinary.com/dtxh3ew7s/image/upload/v1727352106/4_upscaled_hqhzq6.png",
    ],
    paymentMethod: "COD",
    total: "₹ 2400",
    paid: false,
  },
  {
    id: "66ec30c7671caca80b89518e",
    products: [
      "https://res.cloudinary.com/dtxh3ew7s/image/upload/v1727352106/2_upscaled_g6ibby.png",
      "https://res.cloudinary.com/dtxh3ew7s/image/upload/v1727352106/3_upscaled_smnoeu.png",
    ],
    paymentMethod: "COD",
    total: "₹ 5600",
    paid: false,
  },
  {
    id: "66dbb70be5922373191adf66",
    products: [
      "https://res.cloudinary.com/dtxh3ew7s/image/upload/v1727352106/1_upscaled_pku7p3.png",
    ],
    paymentMethod: "COD",
    total: "₹ 1280",
    paid: false,
  },
  {
    id: "66cab025fa11686711ff2fc8",
    products: [
      "https://res.cloudinary.com/dtxh3ew7s/image/upload/v1727352106/2_upscaled_g6ibby.png",
    ],
    paymentMethod: "RazorPay",
    total: "₹ 750",
    paid: false,
  },
];
const OrdersPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className=" heading text-center mb-6">MY ORDERS</h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="paid">Paid Order</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid Order</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-black">
                <TableHead className="w-[250px] ">Order Id</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead>View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium underline text-blue-500">
                    <Link href={`/order`}>{order.id}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {order.products.map((product, index) => (
                        <img
                          key={index}
                          src={product}
                          alt="_"
                          className="rounded-full bg-gray-200 w-[40px] h-[40px]"
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    {order.paid ? (
                      <span className="text-green-500">✓</span>
                    ) : (
                      <XCircle className="text-red-500 h-5 w-5" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={"/order"}>
                      <button className="text-blue-500 hover:text-blue-700">
                        <FaLink size={24} color="black" />
                      </button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
