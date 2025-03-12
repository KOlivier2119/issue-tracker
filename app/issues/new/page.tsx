'use client';

import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const { control, handleSubmit } = useForm<IssueForm>();

    return (
        <form className="max-w-xl space-y-3" onSubmit={handleSubmit((data) => console.log(data))}>
            {/* Use Controller for TextField */}
            <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField.Root radius="large" {...field} placeholder="Title" />
                )}
            />

            {/* Properly handle SimpleMDE */}
            <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
            />

            <Button type="submit">Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
