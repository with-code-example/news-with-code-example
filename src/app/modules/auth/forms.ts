import { Validators } from '@angular/forms';

export const LOGIN_FORM_MODEL = [
    {
        key: 'email',
        type: 'input',
        props: {
            label: 'Email',
            required: true,
            placeholder: 'email',
        },
        validators: {
            validation: [Validators.required],
        },
    },
    {
        key: 'password',
        type: 'input',
        props: {
            label: 'Password',
            type: 'password',
            required: true,
            placeholder: 'Type your password',
        },
        validators: {
            validation: [Validators.required],
        },
    },
    // {
    //     key: 'rememberMe',
    //     type: 'checkbox',
    //     props: {
    //         label: 'Remember me for 30 days',
    //         // description: 'Remember me for 30 days',
    //         required: false,
    //     }
    // },

];

export const REGISTER_FORM_MODEL = [
    {
        key: 'name',
        type: 'input',
        props: {
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Enter your name'
        },
        validators: {
            validation: [Validators.required],
        },
    },
    {
        key: 'email',
        type: 'input',
        props: {
            label: 'Email',
            type: 'email',
            required: true,
            placeholder: 'Enter your email',
        },
        validators: {
            validation: [Validators.required],
        },
    },
    {
        key: 'password',
        type: 'input',
        props: {
            label: 'Password',
            type: 'password',
            required: true,
            placeholder: 'Type your password',
        },
        validators: {
            validation: [Validators.required],
        },
    },
    {
        key: 'c_password',
        type: 'input',
        props: {
            label: 'Confirm Password',
            type: 'password',
            required: true,
            placeholder: 'Type your password again',
        },
        validators: {
            validation: [Validators.required],
        },
    },
    // {
    //     key: 'rememberMe',
    //     type: 'checkbox',
    //     props: {
    //         label: 'Accept to T&C',
    //         // description: 'Accept Terms and Conditions',
    //         required: false,
    //     }
    // },

];