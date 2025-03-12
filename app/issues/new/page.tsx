'use client';

import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { control, handleSubmit } = useForm<IssueForm>();

    return (
        <form className="max-w-xl space-y-3" onSubmit={handleSubmit(async (data) => {
            await axios.post('/api/issues', data);
            router.push('/issues')
        })}>
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
