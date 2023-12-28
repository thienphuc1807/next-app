"use client";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
    });
    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post("/api/issues", data);
            if (typeof navigator !== "undefined") {
                router.push("/issues");
            }
        } catch (error) {
            setSubmitting(false);
            setError("An Expected Error Occurred!");
        }
    });

    return (
        <div className="max-w-xl space-y-3">
            {error && (
                <Callout.Root color="red" role="alert">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input
                        placeholder="Title"
                        {...register("title")}
                    />
                </TextField.Root>

                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <SimpleMDE
                            className="max-w-xl mt-5"
                            placeholder="Description"
                            {...field}
                        />
                    )}
                />

                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting}>
                    Submit New Issues {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewIssuesPage;
