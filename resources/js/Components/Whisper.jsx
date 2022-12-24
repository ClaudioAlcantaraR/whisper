import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/inertia-react';

dayjs.extend(relativeTime);

export default function Whisper({ whisper }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: whisper.message,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('whispers.update', whisper.id), {onSuccess: () => setEditing(false)});
    };

    return (
        <div className="border-b border-slate-400 dark:border-slate-600 px-4 py-6">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div className="mb-2">
                        <span className="text-md font-medium text-gray-900 dark:text-gray-100">{whisper.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600 dark:text-gray-400">{dayjs(whisper.created_at).fromNow()}</small>
                        { whisper.created_at !== whisper.updated_at && <small className="text-sm text-gray-600 dark:text-gray-400"> &middot; edited</small> }
                    </div>
                    {whisper.user.id === auth.user.id &&
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 p-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 dark:text-gray-400 " viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Editar
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route('whispers.destroy', whisper.id)}
                                    method="delete">
                                        Borrar
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    }
                </div>
                {editing 
                    ? <form onSubmit={submit}>
                        <textarea
                            value={data.message}
                            onChange={e => setData('message', e.target.value)}
                            className="mt-4 w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 rounded-md shadow-sm"></textarea>
                        <InputError 
                            message={errors.message}
                            class="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Modificar</PrimaryButton>
                            <button
                                className="text-red-600 dark:text-red-500"
                                onClick={() => { setEditing(false); reset(); clearErrors(); }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form> 
                 : (
                    <>
                        <span className="text-gray-800 dark:text-gray-200 text-md">{whisper.message}</span>    
                    </>
                    ) 
                }
                
            </div>
        </div>
    );
}