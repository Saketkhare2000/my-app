import { DynamicFieldData } from "@/types/dynamic-control-types";
import { FormProvider, useForm } from "react-hook-form";
import { DynamicControl } from "../DynamicControl";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@hookform/error-message";
import { useToast } from "@/components/ui/use-toast";

interface FormProps {
    fields: DynamicFieldData[];
}

export const Form = ({ fields }: FormProps) => {
    const { toast } = useToast();

    const formMethods = useForm();
    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        trigger,
    } = formMethods;

    function onSubmit(data: any, error: any) {
        // your logic on what to do with data

        console.log(data);
    }

    return (
        <form
            className={["flex flex-col gap-4 w-1/2 mx-auto"].join(" ")}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormProvider {...formMethods}>
                {fields.map((d, i) => (
                    <div key={i}>
                        <label htmlFor={d.fieldName}>{d.label}</label>
                        {/* // input controls will be rendered here */}
                        <DynamicControl {...d} />
                        <ErrorMessage
                            as={<p className="text-red-500 text-xs" />}
                            render={({ message }) => <p>{message}</p>}
                            errors={errors}
                            name={d.fieldName}
                        />
                    </div>
                ))}
            </FormProvider>
            {/* <button type="submit">Submit</button> */}
            <Button type="submit" disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    );
};
