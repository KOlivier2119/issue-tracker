'use client';

import { Button, Callout, TextField, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const router = useRouter();
    const { control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState<string>(''); // Explicitly type as string

    const onSubmit = async (data: IssueForm) => {
        try {
            console.log('Submitting data:', data); // Debug log
            const response = await axios.post('/api/issues', data);
            console.log('Success response:', response); // Debug log
            router.push('/issues');
        } catch (err) {
            console.log('Caught error:', err); // Debug log
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message ||
                    err.message ||
                    'Failed to create issue';
                setError(errorMessage);
                console.log('Set error to:', errorMessage); // Debug log
            } else {
                setError('An unexpected error occurred');
                console.log('Set unexpected error'); // Debug log
            }
        }
    };

    console.log('Current error state:', error); // Debug log to check state

    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color="red" className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField.Root
                            radius="large"
                            {...field}
                            placeholder="Title"
                        />
                    )}
                />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <SimpleMDE
                            placeholder="Description"
                            {...field}
                        />)}
                    
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button type="submit" className='cursor-pointer'>
                    Submit New Issue
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;