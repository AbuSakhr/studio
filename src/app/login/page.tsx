'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder login logic
    toast({
      title: "Login Successful",
      description: "Welcome back!",
    });
    router.push('/account'); // Redirect to account page after "login"
  };

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
             <LogIn className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Welcome Back!</CardTitle>
          <CardDescription>Log in to access your account and order history.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Button variant="link" asChild className="p-0 text-accent hover:text-accent/80">
              <Link href="/register">Sign up</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
