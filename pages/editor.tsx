import React, { useRef } from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

export default () => {
    // This function deals with the image uploading.
    const onImageUploadBefore = (files, info, uploadHandler) => {               
        // Upload image to Server. You can replace UploadToServer function with your own uploading method.
        /* const src = UploadToServer(files[0]); */

        // From the result of the uploading, you should get the url of the uploaded image.
        // And using that url(src), you should define a response object and input it as a parameter of uploadHandler function.

        /* const response = {
            "result": [
                {
                    "url": src,
                    "name": files[0].name,
                    "size": files[0].size
                },
        ]} */
        
        // Finally you should call uploadHandler function.
        /* uploadHandler(response); */
        
    }

    return (
        <SunEditor
            setDefaultStyle=""
            placeholder="Word your thoughts here..."
            setOptions={{
                minHeight: '500px',
                height: 'auto',
                buttonList: [
                    ['formatBlock', 'fontSize', 'font', 'bold', 'italic', 'underline', 'list'],
                    ['link', 'image'],
                    ['align'],
                    ['undo', 'redo'],
                ],
                imageAccept: '.jpg, .jpeg, .png, .gif',
                imageUrlInput: false,
                showPathLabel: false,
                mediaAutoSelect: false,
                formats: [
                    {
                        tag: 'p',
                        name: 'Normal',
                        command: 'replace',
                        class: '',
                    },
                    {
                        tag: 'h2',
                        name: 'Heading',
                        command: 'replace',
                        class: '',
                    },
                    {
                        tag: 'h3',
                        name: 'Subheading',
                        command: 'replace',
                        class: '',
                    },
                    'blockquote',
                    'pre',
                ],
                linkRel: ['nofollow'],
                attributesWhitelist: {
                    img: 'alt',
                    p: 'text-align',
                    h2: 'id',
                    h3: 'id',
                },
                pasteTagsBlacklist: 'span',
            }}
            onChange={() => {}}
            disable={false}
            onImageUploadBefore={onImageUploadBefore}
            onKeyDown={(event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
                    event.preventDefault();
                    const linkButton = document.querySelector(
                        'button[data-command=link]',
                    ) as HTMLElement | null;
                    if (linkButton) {
                        linkButton.click();
                    }
                }
            }}
        />
    )
}