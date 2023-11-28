import { NextPage } from "next";
import React from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface FormValues {
    title: string;
    index: number;
    questions: {
        name: string;
        type: "text" | "email" | "bankDetails" | "date" | "number";
    }[];
}
const FormStructure: NextPage = () => {
    const form = useForm<FormValues>();

    // 2. Define a submit handler.
    function onSubmit(values: FormValues) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const formSteps: FormValues[] = [
        {
            title: "Personal Information",
            index: 0,
            questions: [
                {
                    name: "First Name",
                    type: "text",
                },
                {
                    name: "Last Name",
                    type: "text",
                },
                {
                    name: "Email Address",
                    type: "email",
                },
                {
                    name: "Date of Birth",
                    type: "date",
                },
                {
                    name: "Phone Number",
                    type: "number",
                },
            ],
        },
        {
            title: "Bank Details",
            index: 1,
            questions: [
                {
                    name: "Bank Name",
                    type: "text",
                },
                {
                    name: "Account Number",
                    type: "text",
                },
            ],
        },
    ];

    return (
        <div className="w-1/2 mx-auto h-screen grid place-items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {formSteps.map(({ index, title, questions }) => (
                        <FormField
                            key={step.index}
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <FormControl>
                        <Button type="submit">Submit</Button>
                    </FormControl>
                </form>
            </Form>
        </div>
    );
};

export default FormStructure;
