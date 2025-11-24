import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLogin() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Check against localStorage or default
    const storedUser = localStorage.getItem("adminUser") || "alifarooqi24";
    const storedPass = localStorage.getItem("adminPass") || "alifarooqi2009";

    if (values.username === storedUser && values.password === storedPass) {
      localStorage.setItem("isAdmin", "true");
      toast({
        title: "Login Successful",
        description: "Welcome back, Admin.",
      });
      setLocation("/admin/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid credentials.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 relative">
      <Link href="/">
        <a className="absolute top-8 left-8 text-white flex items-center gap-2 hover:text-primary transition-colors font-ui uppercase text-sm tracking-wider">
          <ArrowLeft size={18} /> Back to Home
        </a>
      </Link>

      <div className="w-full max-w-md p-8 bg-card border border-white/10 rounded-sm">
        <h1 className="text-2xl font-bold text-white mb-6 font-heading text-center">Admin Login</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white/5 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="bg-white/5 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-primary text-black hover:bg-white transition-colors font-bold font-ui">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
