import { Validators } from '@angular/forms';

export const ADD_FEED_FORM_MODEL = [
    {
        key: 'url',
        type: 'input',
        props: {
            label: 'Feed Url',
            required: true,
            placeholder: 'https://example.com/feed.xml',
        },
        validators: {
            validation: [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')],
        },
    },
    {
        key: 'name',
        type: 'input',
        props: {
            label: 'Name',
            required: true,
            placeholder: 'Feed Name',
        },
    },
];

export const EDIT_FEED_FORM_MODEL = [
    {
        key: 'title',
        type: 'input',
        props: {
            label: 'Name',
            required: true,
            placeholder: 'Feed Name',
        },
    },
    {
        key: 'link',
        type: 'input',
        props: {
            label: 'Site Url',
            required: false,
            placeholder: 'https://example.com/feed.xml',
        }
    },
    {
        key: 'author',
        type: 'input',
        props: {
            label: 'Author Name',
            required: false,
        },
    },
    {
        key: 'description',
        type: 'input',
        props: {
            label: 'Description',
            required: false,
        },
    },
    {
        key: 'image',
        type: 'input',
        props: {
            label: 'Image',
            required: false,
        },
    },
    
];