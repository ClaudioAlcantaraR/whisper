import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 lg:font-extrabold lg:text-6xl lg:leading-none dark:text-white lg:text-center xl:px-36 lg:mb-7">
                        Conecta y comparte con tus conocidos o no tan conocidos usando <span className="italic dark:text-indigo-500 text-indigo-500">Whisper.</span>
                    </h1>
                    <p className="mb-10 text-lg font-normal text-gray-500 dark:text-gray-400 lg:text-center lg:text-xl xl:px-60">Unete a Whisper hoy mismo y comienza a susurrar tus pensamientos con todo la comunidad.</p>
                    <div className="flex flex-col mb-8 md:flex-row lg:justify-center">
                        {props.auth.user ? (
                            <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <PrimaryButton href={route('login')} className="mr-4">
                                    <Link href={route('login')}>
                                        Comenzar
                                    </Link>
                                </PrimaryButton>
                                <SecondaryButton>
                                    <Link href={route('register')}>
                                        Registrarme
                                    </Link>
                                </SecondaryButton>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
