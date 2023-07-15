type AddServiceForm = {
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
    upload: File[];
}

type Option = {
    value: string
    label: string
}


const options: Option[] = [
    { value: 'foo', label: 'Foo' },
    { value: 'bar', label: 'Bar' },
]