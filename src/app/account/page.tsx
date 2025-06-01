import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ListOrdered, LogOut } from 'lucide-react';
import Link from 'next/link';

// This is a placeholder. In a real app, you'd check authentication status.
const isAuthenticated = false; // Simulate user not logged in

export default function AccountPage() {
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-md p-6 shadow-xl">
          <CardHeader className="items-center">
            <User className="h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold font-headline">My Account</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Please log in or create an account to manage your profile and view your order history.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/register">Create Account</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Placeholder for authenticated user view
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Account</h1>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-primary-foreground rounded-full p-3">
              <User className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl font-headline">John Doe</CardTitle>
              <CardDescription>john.doe@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <ListOrdered className="mr-2 h-5 w-5 text-primary" /> Order History
            </h3>
            <p className="text-muted-foreground">You have no orders yet.</p>
            {/* In a real app, list orders here */}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Account Details</h3>
            <p className="text-muted-foreground">Manage your personal information and preferences.</p>
            <Button variant="outline" className="mt-2">Edit Profile (Placeholder)</Button>
          </div>
          <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" /> Log Out (Placeholder)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
