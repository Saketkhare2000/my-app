import { Input } from "@/components/ui/input";
import { DynamicFieldData } from "@/types/dynamic-control-types";
import { useFormContext } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const DynamicControl = ({
    inputType,
    fieldName,
    defaultValue,
    options = [],
    config = {},
}: DynamicFieldData) => {
    const { register } = useFormContext();

    switch (inputType) {
        case "text":
            return (
                <Input
                    type="text"
                    {...register(fieldName, config)}
                    defaultValue={defaultValue}
                />
            );
        case "select": {
            return (
                <Select
                    {...register(fieldName, config)}
                    defaultValue={defaultValue}
                    name={fieldName}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent id={fieldName}>
                        {options.map((o, index) => (
                            <SelectItem key={index} value={o.value}>
                                {o.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
        }
        case "number":
            return (
                <Input
                    type="number"
                    {...register(fieldName, config)}
                    defaultValue={defaultValue}
                />
            );
        default:
            return <Input type="text" />;
    }
};
