import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/inertia-react';

dayjs.extend(relativeTime);

export default function Whisper({ whisper }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const [confirmingWhisperDeletion, setConfirmingWhisperDeletion] = useState(false);
    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: whisper.message,
    });

    const confirmWhisperDeletion = () => {
        setConfirmingWhisperDeletion(true);
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('whispers.update', whisper.id), {onSuccess: () => setEditing(false)});
    };

    const closeModal = () => {
        setConfirmingWhisperDeletion(false);

        reset();
    };

    return (
        <div className="border-b border-slate-400 dark:border-slate-600 px-4 pt-6 pb-3">
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div className="mb-2">
                        <span className="text-md font-medium text-gray-900 dark:text-gray-100">{whisper.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600 dark:text-gray-400">{dayjs(whisper.created_at).fromNow()}</small>
                        { whisper.created_at !== whisper.updated_at && <small className="text-sm text-gray-600 dark:text-gray-400"> &middot; editado</small> }
                    </div>
                    <div className="flex items-center justify-end mt-2 gap-4">
            {/* TODO: Añadir tooltips a los iconos */}
            {whisper.user.id === auth.user.id &&
            <>
                <div>
                    <button onClick={() => setEditing(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400 hover:text-indigo-500" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                </div> 
                <div>
                    <button onClick={confirmWhisperDeletion}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-gray-400 hover:text-red-800" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                    <Modal show={confirmingWhisperDeletion} onClose={closeModal}>
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                                ¿Estas seguro que quieres eliminar tu susurro?
                            </h2>
                            <div className="flex items-center">
                                <Dropdown.CustomLink
                                    as="button"
                                    href={route('whispers.destroy', whisper.id)}
                                    method="delete"
                                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 undefined mr-3">
                                    Eliminar    
                                </Dropdown.CustomLink>
                            <SecondaryButton onClick={closeModal}>Cancelar</SecondaryButton>
                            </div>
                        </div>
                    </Modal>
                </div>  
            </>    
        }
            </div>
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
                            <SecondaryButton onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancelar</SecondaryButton>
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