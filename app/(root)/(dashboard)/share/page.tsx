import React from 'react'
import QRCode from "react-qr-code";

import Navbar from "@/components/Navbar/navbar";
import Sidebar from "@/components/Sidebar/sidebar";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const value = "http://192.168.0.215:3000/share"

const page = () => {
  return (
    <>
      
       
      <div className="dashboard-main">
        <p>Choose Sharing Method</p>
        <div className="flex space-x-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Send via Email</CardTitle>
              <CardDescription>Share your QR code by email for quick access</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">
                Select Method
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Send on OCEAN MD</CardTitle>
              <CardDescription>Connect with OCEAN MD to share your QR code</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">
                Select Method
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Show in Person</CardTitle>
              <CardDescription>Display the QR code in person for immediate access</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">
                Select Method
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex mt-8">
          <div style={{ height: "auto", maxWidth: 256, width: "100%" }}>
            <div>QR Code Display</div>
            <p>Your generated QR code for sharing with healthcare practitioners</p>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={value}
              viewBox={`0 0 256 256`}
            />
          </div>
          <div className="ml-8">
            <h2 className="font-bold text-lg">Additional Information</h2>
            <p>We ensure the highest security measures to protect your data shared via the QR code</p>
            <h3 className="font-bold mt-4">FAQ</h3>
            <ul className="list-disc ml-5">
              <li>How secure is sharing my medical records?</li>
              <li>Can I track who accessed my QR code?</li>
              <li>What if I need to revoke access to my records?</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
