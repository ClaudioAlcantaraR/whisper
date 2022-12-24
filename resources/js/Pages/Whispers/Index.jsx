import React from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Whisper from '@/Components/Whisper';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';

export default function Index({ auth, whispers }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });
    
    const submit = (e) => {
        e.preventDefault();
        post(route('whispers.store'), {onSuccess: () => reset()})
    }

    return (
        <AuthenticatedLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Inicio</h2>}
        >
            <Head title="Whispers" />
 
            <div className="max-w-2xl mx-auto p-3">
                <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 mb-4 mt-4 shadow sm:rounded-lg">
                    <form onSubmit={submit}>
                        <textarea
                            value={data.message}
                            placeholder="¿En que estas pensando?"
                            className="block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 focus:ring-indigo-500 rounded-md shadow-sm"
                            onChange={e => setData('message', e.target.value)}
                        ></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <PrimaryButton className="mt-4" processing={processing}>Whisper</PrimaryButton>
                    </form>
                </div>
                <div>
                    {whispers.map(whisper =>
                        <Whisper key={whisper.id} whisper={whisper} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    )
}