import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'

const opts = {
  height: "300",
  width: "600",
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>{chapter?.ChapterName}</h2>
      <p className='text-gray-500'>{chapter?.About}</p>

      {/* video */}

      <div className='flex justify-center my-6'>
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      {/* content */}
      <div>
        {content?.content?.sections.map((item, index) => (
          <div className='p-5 bg-blue-50 mb-3 rounded-lg'>
            <h2 className='font-medium text-lg'>{item.title}</h2>
            {/* <p className='whitespace-pre-wrap'>{item.explanation}</p> */}
            <ReactMarkdown>{item.explanation}</ReactMarkdown>
            {item.code && <div className='p-4 bg-black rounded-md mt-3 text-white'>
              <pre>
                <code>{item.code}</code>
              </pre>
            </div>}
          </div>
        ))}
      </div>


    </div>
  )
}

export default ChapterContent