import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { RocketIcon } from "@radix-ui/react-icons";
type Inputs = z.infer<typeof formSchema>;

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email address.",
    }),
    bankDetails: z
        .object({
            accountNumber: z.string().min(10, {
                message: "Account number must be at least 10 characters.",
            }),
            bankName: z.string().min(2, {
                message: "Bank name must be at least 2 characters.",
            }),
        })
        .array(),
});

const steps: {
    id: number;
    name: string;
    fields: string[];
}[] = [
    {
        id: 0,
        name: "username",
        fields: ["username"],
    },
    {
        id: 1,
        name: "email",
        fields: ["email"],
    },
    {
        id: 2,
        name: "bankDetails",
        fields: ["Account Number", "Bank Name"],
    },
];
export default function Home() {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const { trigger } = useForm<Inputs>({
        resolver: zodResolver(formSchema),
    });

    const [date, setDate] = useState<Date | undefined>(new Date());
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            bankDetails: [
                {
                    accountNumber: "",
                    bankName: "",
                },
            ],
        },
    });

    console.log(form.getValues());

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data);
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    type fieldNames = keyof Inputs;
    const next = async () => {
        const fields = steps[currentStep].fields;
        const isValid = await trigger(fields as fieldNames[], {
            shouldFocus: true,
        });
        console.log(isValid);
        if (!isValid) {
            return;
        } else {
            setCurrentStep((currentStep) => currentStep + 1);
        }
        setCurrentStep(currentStep + 1);
    };

    const handleStepper = () => {
        //the stepper should get the value of the current form field and check if it is empty or not before moving to the next step
        //if the field is empty, it should not move to the next step
        //if the field is not empty, it should move to the next step

        setCurrentStep(currentStep + 1);
    };

    const addNewAccount = () => {
        form.setValue("bankDetails", [
            ...form.getValues("bankDetails"),
            {
                accountNumber: "",
                bankName: "",
            },
        ]);
    };

    return (
        <main className="w-1/2 mx-auto my-10 h-full flex flex-col items-center gap-5">
            <Progress value={currentStep * 33} className="w-[60%]" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    {currentStep === 0 && (
                        <div className="flex w-full">
                            <FormField
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
                        </div>
                    )}
                    {currentStep === 1 && (
                        <div className=" flex items-center justify-center">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="shadcn@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your Email address.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                    {
                        //bank details
                        currentStep === 2 && (
                            <div className="flex flex-col gap-2">
                                {form
                                    .getValues("bankDetails")
                                    .map((bankDetail, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-2"
                                        >
                                            <FormField
                                                control={form.control}
                                                name={
                                                    `bankDetails.${index}.accountNumber` as const
                                                }
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>
                                                            Account Number
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="0123456789"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your account
                                                            number.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={
                                                    `bankDetails.${index}.bankName` as const
                                                }
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel>
                                                            Bank Name
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="GTB"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your bank
                                                            name.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ))}

                                <div className="flex flex-col gap-3">
                                    {
                                        //show the add new account button only if the bank details is not empty
                                        form.getValues("bankDetails").length >
                                            0 && (
                                            <div>
                                                <Button
                                                    variant={"secondary"}
                                                    onClick={addNewAccount}
                                                >
                                                    Add another bank details
                                                </Button>
                                                <Button
                                                    variant={"secondary"}
                                                    disabled={
                                                        form.getValues(
                                                            "bankDetails"
                                                        ).length === 1
                                                    }
                                                    onClick={() => {
                                                        form.getValues(
                                                            "bankDetails"
                                                        ).length > 0 &&
                                                            form
                                                                .getValues(
                                                                    "bankDetails"
                                                                )
                                                                .pop();
                                                    }}
                                                >
                                                    Remove bank details
                                                </Button>
                                            </div>
                                        )
                                        //remove the data from the bank details array
                                    }

                                    {
                                        //display the bank details which are already in the array in a card
                                        form.getValues("bankDetails").length >
                                            0 &&
                                            form
                                                .getValues("bankDetails")
                                                .map((bankDetail, index) => (
                                                    <Card key={index}>
                                                        <CardHeader>
                                                            <CardTitle>
                                                                Bank Details
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p className="font-semibold text-sm flex gap-2">
                                                                {/* Account Icon */}
                                                                <RocketIcon className="h-4 w-4" />
                                                                <span>
                                                                    {
                                                                        bankDetail.accountNumber
                                                                    }
                                                                </span>
                                                            </p>
                                                            <p>
                                                                Bank Name:
                                                                {
                                                                    bankDetail.bankName
                                                                }
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    <div className="flex gap-2">
                        <Button onClick={() => setCurrentStep(currentStep - 1)}>
                            Prev
                        </Button>
                        <Button onClick={next}>Next</Button>
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>

            <Card>
                <CardHeader>
                    <CardTitle>Bank Details</CardTitle>
                    <CardDescription>This is employee details.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* <p className="font-semibold text-sm flex gap-2">
                        <RocketIcon className="h-4 w-4" />
                        <span>0123456789</span>
                    </p>
                    <p>Bank Name: GTB</p> */}
                    {form.getValues("username").length > 0 && (
                        <p>{form.getValues("username")}</p>
                    )}
                    {form.getValues("email").length > 0 && (
                        <p>{form.getValues("email")}</p>
                    )}
                    {
                        form.getValues("bankDetails").length > 0 &&
                            form
                                .getValues("bankDetails")
                                .map((bankDetail, index) => (
                                    <p key={index}>
                                        {bankDetail.accountNumber}{" "}
                                        {bankDetail.bankName}
                                    </p>
                                ))
                        // <p>{form.getValues("bankDetails")}</p>
                    }
                </CardContent>
                <CardFooter>
                    <Button variant="secondary">Edit</Button>
                </CardFooter>
            </Card>
        </main>
    );
}
