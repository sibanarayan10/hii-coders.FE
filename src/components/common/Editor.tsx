import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import { useEffect, useRef } from "react";
import EditorJS from '@editorjs/editorjs';

export const Editor = ({ data, onChange, style }: { data: any, onChange: (blocks: any) => void, style?: React.CSSProperties }) => {

    const editorRef = useRef<any>(null);

    useEffect(() => {
        if (editorRef.current) {
            return;
        }

        const blocks = data;

        editorRef.current = new EditorJS({
            holder: 'editorjs-container',

            placeholder: 'Write your coding problem here...',

            tools: {
                header: {
                    class: Header as any,
                    inlineToolbar: true,
                },

                paragraph: {
                    class: Paragraph as any,
                    inlineToolbar: true,
                },

                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            async uploadByFile(file: any) {
                                return new Promise((resolve) => {
                                    const reader = new FileReader();

                                    reader.onload = () => {
                                        resolve({
                                            success: 1,
                                            file: {
                                                url: reader.result,
                                            },
                                        });
                                    };

                                    reader.readAsDataURL(file);
                                });
                            },
                        },
                    },
                },
                inlineCode: {
                    class: InlineCode as any,
                    shortcut: 'CMD+SHIFT+C',
                },
                quote: {
                    class: Quote as any,
                    inlineToolbar: true,
                },
            },

            data: {
                blocks: blocks,
            },

            async onChange(api) {
                const savedData = await api.saver.save();
                onChange(savedData.blocks);
            },
        });

        return () => {
            if (editorRef.current?.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    return <div
        id="editorjs-container"
        style={{
            minHeight: '500px',
            padding: '24px',
            ...(style && style)
        }}
    >
    </div >
}