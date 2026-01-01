import { zodResolver } from '@hookform/resolvers/zod'
import { UseMutateFunction } from '@tanstack/react-query'
import { useForm } from "react-hook-form"
import { z, ZodType } from "zod"

const useZodForm = (
    schema: ZodType<any, any, any>,
    mutation: UseMutateFunction,
    defaultValues?: any
) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        reset
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            ...defaultValues
        }
    })

    const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }))

    return {
        register,
        errors,
        onFormSubmit,
        watch,
        reset
    }
}

export default useZodForm