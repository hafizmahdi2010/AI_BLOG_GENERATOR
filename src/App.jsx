import React, { useState } from 'react'
import "./App.css"
import { IoMdArrowRoundBack } from 'react-icons/io';
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import Markdown from 'react-markdown'

const App = () => {
  const [screen, setScreen] = useState(1);
  const [text, setText] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" }); // 👈 replce "YOUR_API_KEY" with your api key

  async function genearteBlogContent() {
    setLoading(true);
    setScreen(2);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents:
        `
      You are an expert SEO blog writer and AI content strategist.
Write a complete blog post on the topic: ${text}.
Return the blog in Markdown format, using clear sections and headings.
Follow this structure exactly, using proper heading levels like #, ##, and ### for compatibility with Markdown-to-HTML converters.
Do not add extra markdown formatting (like italics/bold) unless necessary for clarity. Do not return JSON or HTML — only markdown.


⚙️ Requirements:
✅ Start with a catchy blog title.
✅ Include a meta description (max 160 characters).
✅ Provide 5 SEO-friendly tags/keywords.
✅ Generate a URL-friendly slug (lowercase, hyphens only).
✅ The blog post should include:
✅ A strong introduction (hook the reader)
✅ At least 3 subheadings (with relevant H2 tags)
✅ A conclusion with a CTA
✅ Use bullet points or numbered lists if needed
✅ Highlight code blocks (if topic is technical)

output:

Title:
[Catchy, SEO-optimized blog title]

Slug:
[URL-friendly version of title (lowercase, hyphenated)]

Meta Description:
[Short and SEO-friendly (under 160 characters)]

Keywords:
[Comma-separated list of 5 to 7 SEO keywords relevant to the blog]

Author:
[Author name or leave as "AI Assistant"]

Estimated Reading Time:
[X minutes]

Date:
[YYYY-MM-DD]

Introduction:
[A hook that introduces the topic and gives context]

Subheading 1:
[Explanation, examples, or list under this sub-topic]

Subheading 2:
[Another focused sub-topic, well explained]

Subheading 3:
[Optional — can include code blocks, steps, or comparisons]

Conclusion:
[Summarize the key points, add final thoughts or a call-to-action]

Hashtags:
[#tag1 #tag2 #tag3 #tag4 #tag5]

Tags:
[tag1, tag2, tag3, tag4, tag5]

Note: give title in h1 tag

      `,
    });
    console.log(response.text);
    setData(response.text);
    setLoading(false);
  }

  return (
    <>
      {
        screen === 1 ?
          <>
            <div className="container flex flex-col items-center justify-center h-screen ">
              <h1 className='text-[40px] font-[700]'>AI <span className='text-purple-500'>Blog</span> Content <span className='text-purple-500'>Generator</span></h1>
              <textarea onChange={(e) => { setText(e.target.value) }} value={text} className='w-[50vw] min-h-[30vh] mt-5 bg-transparent border-[1px] border-[#333333] focus:border-purple-500 outline-none p-[20px] rounded-xl' placeholder="Explain your blog topic."></textarea>
              <button onClick={genearteBlogContent} className="btnNormal py-[15px] transition-all duration-300 hover:bg-purple-600 px-[20px] bg-purple-500 text-white rounded-xl border-0 outline-0 mt-6 w-[40vw]">Generate</button>
            </div>
          </> : <>
            <div className="container py-[30px] px-[100px]">
              {loading ? 
              <div className='fixed top-0 left-0 flex items-center justify-center h-screen w-screen'>
              <ClipLoader
                color="#a855f7"
                size={150}
                aria-label="Loading Spinner"
              />
              </div>
               : <div>
                <p className='font-bold text-[20px] mb-7 flex items-center gap-[10px]'><i onClick={() => { setScreen(1) }} className='cursor-pointer flex flex-col items-center justify-center w-[40px] h-[40px] rounded-[50%] transition-all duration-300 hover:bg-zinc-800'><IoMdArrowRoundBack /></i> Output:</p>
                  <Markdown>{data}</Markdown>
              </div>}
            </div>
          </>
      }
    </>
  )
}

export default App