import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <Card className="w-full max-w-md p-6 shadow-xl">
        <CardHeader className="items-center">
          <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          <CardTitle className="text-3xl font-bold font-headline">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
            You will receive an email confirmation shortly.
          </p>
          <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
