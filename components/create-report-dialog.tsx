"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export function CreateReportDialog() {
  const [open, setOpen] = React.useState(false);
  const [isChecking, setIsChecking] = React.useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      linkedinUrl: "",
    },
  });

  async function checkEmailExists(email: string) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('execution_id')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      return data?.execution_id || null;
    } catch (error) {
      console.error('Error checking email:', error);
      return null;
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsChecking(true);
      
      // First, check if the email already exists in the database
      const existingExecutionId = await checkEmailExists(values.email);
      
      if (existingExecutionId) {
        // Email exists, redirect to existing report
        form.reset();
        setOpen(false);
        setIsChecking(false);
        router.push(`/reports/${existingExecutionId}`);
        return;
      }

      // Email doesn't exist, proceed with webhook call
      const payload = {
        email: values.email,
        name: `${values.firstName} ${values.lastName}`
      };

      const response = await fetch(
        "https://ezpzagents.app.n8n.cloud/webhook/fd129a13-c8e3-49d0-8b6c-a22503634f4b",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        const executionId = result.execution_id;

        if (executionId) {
          form.reset();
          setOpen(false);
          setIsChecking(false);
          // Redirect to reports page with execution_id
          router.push(`/reports/${executionId}`);
        } else {
          setIsChecking(false);
          console.error("Webhook response did not contain an execution_id.");
          // TODO: Handle error with a toast notification
        }
      } else {
        setIsChecking(false);
        console.error("Webhook submission failed:", await response.text());
        // TODO: Handle error with a toast notification
      }
    } catch (error) {
      setIsChecking(false);
      console.error("Error submitting to webhook:", error);
      // TODO: Handle error with a toast notification
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setIsChecking(false);
        form.reset();
      }
    }}>
      <DialogTrigger asChild>
        <Button className="w-full justify-between bg-orange-500 text-white hover:bg-orange-400 hover:text-black">
          Create new Report
          <PlusCircle className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new Report</DialogTitle>
          <DialogDescription>
            Enter the details of the target to start a new investigation.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john.doe@example.com"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/johndoe"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                className="bg-orange-400 text-white"
                disabled={form.formState.isSubmitting || isChecking}
              >
                {isChecking 
                  ? form.formState.isSubmitting 
                    ? "Creating new report..." 
                    : "Checking existing reports..."
                  : "Create Report"
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
