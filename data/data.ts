import { DynamicFieldData } from "@/types/dynamic-control-types";

export const fields: DynamicFieldData[] = [
    {
        fieldName: "name",
        inputType: "text",
        label: "Name",
        defaultValue: "",
        config: {
            required: "Enter a valid Name",
        },
    },
    {
        fieldName: "age",
        inputType: "number",
        label: "Age",
        defaultValue: 18,
        config: {
            required: "Required",
            validate: (value) => value >= 18 || "Still a minor",
        },
    },
    {
        fieldName: "language",
        inputType: "select",
        label: "Language",
        options: [
            { value: "english", label: "English" },
            { value: "french", label: "French" },
        ],
        defaultValue: "english",
    },
    {
        fieldName: "address",
        inputType: "text",
        label: "Address",
        defaultValue: "",
        config: {
            required: "Enter a valid address",
        },
    },
];
