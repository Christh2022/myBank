// src/pages/Register.jsx
import { useState } from 'react';
import { Form, useActionData,  } from 'react-router';
import { AuthInfo } from '../../Components/Authentification/AuthInfo';
import { StepperRegister } from '../../Components/Authentification/StepperRegister';

export function Register() {
    const error = useActionData();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    return (

        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row w-[100%] items-center justify-center overflow-hidden authentication">
                {/* Left Side - Auth Info */}
                <AuthInfo />

                <div className="flex flex-col items-center justify-center gap-2.5 w-[50%]">
                <div className="w-sm[90%] flex flex-col items-center justify-center w-[438px] pl-15">
                    {/* Form */}
                    <Form method="post" className="flex flex-col  gap-[35px] w-[430px]">
                    <StepperRegister {...{ form, setForm }} />
                    </Form>

                    {/* Error Message */}
                    {error && (
                    <p style={{ color: '#EC0B43' }} className="text-center mt-5">
                        {error.message}
                    </p>
                    )}
                </div>
                </div>
            </div>
        </div>
    );
}