import {BubbleMenu, EditorContent, EditorProvider, FloatingMenu, useCurrentEditor, useEditor} from "@tiptap/react";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import React, {useEffect} from 'react'

export default function MyTiptap({content="Placeholder Text", onInput}){


    const extensions = [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
            },
        }),
    ]
    const editorAttributes={
        attributes:{
            class:"min-h-[1.2lh] p-[.1lh] border border-black m-1"
        }
    }
    return(
        <EditorProvider extensions={extensions} content={content} slotBefore={<MenuBar/>} editorProps={editorAttributes}>
            <MyEditor handleUpdate={onInput}/>
            <EditorContent editor={useCurrentEditor().editor} />
        </EditorProvider>
    )
}
const MyEditor=({handleUpdate=((e)=>{console.log(e.getHTML())})})=>{
    const editor =useCurrentEditor().editor;

    useEffect(()=>{
        if(editor){
            editor.on('update',({editor})=>{
                handleUpdate(editor)
            })
        }
    },[editor])

    return(
        <EditorContent editor={editor}/>
    )
}

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className={'border-2 border-black'}>
            <div className={'border-2 border-black flex justify-center align-bottom'}>
                <div className={'flex align-bottom text-lg'}>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor.isActive('bold') ? 'bg-green-200 border border-gray-500 px-1' : 'border border-gray-500 px-1'}
                    >
                        <b>B</b>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleItalic()
                                .run()
                        }
                        className={editor.isActive('italic') ? 'bg-green-200 text-xl border border-gray-500 px-1' : ' text-xl border border-gray-500 px-1'}
                    >
                        <i className={'font-serif text-lg'}>I</i>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleStrike()
                                .run()
                        }
                        className={editor.isActive('strike') ? 'bg-green-200 border border-gray-500 px-1' : 'border border-gray-500 px-1'}
                    >
                        <s>S</s>
                    </button>
                </div>
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().toggleCode().run()}*/}
                {/*    disabled={*/}
                {/*        !editor.can()*/}
                {/*            .chain()*/}
                {/*            .focus()*/}
                {/*            .toggleCode()*/}
                {/*            .run()*/}
                {/*    }*/}
                {/*    className={editor.isActive('code') ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    Code*/}
                {/*</button>*/}
                {/*<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>*/}
                {/*    Clear marks*/}
                {/*</button>*/}
                {/*<button onClick={() => editor.chain().focus().clearNodes().run()}>*/}
                {/*    Clear nodes*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().setParagraph().run()}*/}
                {/*    className={editor.isActive('paragraph') ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    Paragraph*/}
                {/*</button>*/}
                <div className={'flex align-bottom text-lg'}>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'bg-green-200 border border-gray-500 px-1' : ' border border-gray-500 px-1'}
                    >
                        H1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'bg-green-200 border border-gray-500 px-1' : ' border border-gray-500 px-1'}
                    >
                        H2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'bg-green-200 border border-gray-500 px-1' : ' border border-gray-500 px-1'}
                    >
                        H3
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={editor.isActive('heading', { level: 4 }) ? 'bg-green-200 border border-gray-500 px-1' : ' border border-gray-500 px-1'}
                    >
                        H4
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={editor.isActive('heading', { level: 5 }) ? 'bg-green-200 border border-gray-500 px-1' : ' border border-gray-500 px-1'}
                    >
                        H5
                    </button>
                </div>
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}*/}
                {/*    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    H4*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}*/}
                {/*    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    H5*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}*/}
                {/*    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    H6*/}
                {/*</button>*/}
                <div className={'flex align-bottom text-lg'}>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active border border-gray-500 px-1' : ' border border-gray-500 px-1'}
                    >
                        Bullet list
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active border border-gray-500 px-1' : ' border border-gray-500 px-1'}
                    >
                        Ordered list
                    </button>
                </div>
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().toggleCodeBlock().run()}*/}
                {/*    className={editor.isActive('codeBlock') ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    Code block*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().toggleBlockquote().run()}*/}
                {/*    className={editor.isActive('blockquote') ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    Blockquote*/}
                {/*</button>*/}
                {/*<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>*/}
                {/*    Horizontal rule*/}
                {/*</button>*/}
                {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
                {/*    Hard break*/}
                {/*</button>*/}
                <div className={'flex align-bottom text-lg'}>
                    <button
                        onClick={() => editor.chain().focus().undo().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .undo()
                                .run()
                        }
                        className={!editor.can().chain().focus().undo().run()?'border border-gray-500 bg-gray-400 px-2':'border border-gray-500 px-2'}
                    >
                        Undo
                    </button>
                    <button
                        onClick={() => editor.chain().focus().redo().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .redo()
                                .run()
                        }
                        className={!editor.can().chain().focus().redo().run()?'border border-gray-500 bg-gray-400 px-2':'border border-gray-500 px-2'}
                    >
                        Redo
                    </button>
                </div>
                {/*<button*/}
                {/*    onClick={() => editor.chain().focus().setColor('#958DF1').run()}*/}
                {/*    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}*/}
                {/*>*/}
                {/*    Purple*/}
                {/*</button>*/}
            </div>
        </div>
    )
}