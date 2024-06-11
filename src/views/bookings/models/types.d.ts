type Option = {
    value: string
    label: string
}

type FormModel = {
    input: string
    select: string
    multipleSelect: string[]
    date: Date | null
    time: Date | null
    singleCheckbox: boolean
    multipleCheckbox: Array<string | number>
    radio: string
    switcher: boolean
    segment: string[];
}


export type FieldProps<T> = {
    field: FieldInputProps<T>;
    form: FormikProps<T>;
};