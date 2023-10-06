import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

export default function TextEditor({value,name,handler,index}) {
    const modules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        clipboard: {
          matchVisual: false,
        },
    }
    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
    ]

    const descriptionHandler = (text) => {
      handler(name,text,index)
    }
    
  return (
    <QuillNoSSRWrapper 
    modules={modules} 
    formats={formats} 
    theme="snow" 
    value={value} 
    onChange={descriptionHandler}/>
  )
}
