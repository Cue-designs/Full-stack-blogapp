import { useState,  } from "react"
const Form = ()=>  {
  const [newText , setNewText] = useState("")
  const [newLastName , setNewLastName] = useState("")
  const [newMessage , setNewMessage] = useState("")
  const[newEmail , setNewEmail] = useState("")
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!newText && !newEmail) return;
    setNewText("")
    setNewLastName("")
    setNewEmail("")
    setNewMessage("")

    setTimeout(() => {
      alert('Message Dropped! (demo)');
        }, 3000);

  }

  

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center lg:px-32">
      <div className="text-amber-100 text-center px-4">
          <h3 className="text-2xl font-bold py-4 lg:text-4xl py-8 xl:text-5xl">What's on your mind</h3>
          <p className="lg: text-2xl py-8 xl:text-3xl">Write down your thoughts Here</p>
        </div>
       <form action="" method="post" onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-4 lg:w-[70%] lg:justify-self-end px-8">
              <label htmlFor="firstname" className="text-yellow-50 font-bold mt-2">First Name</label>
              <input type="text"
              required
              id="firstname"
              value={newText}
              onChange={(e)=>setNewText(e.target.value)}
              className="w-full max-w-full px-3 py-3 border border-green-600 rounded text-yellow-50 bg-neutral-950 font-inherit box-border"
              />
              <label htmlFor="lastname" className="text-yellow-50 font-bold mt-2">Last Name</label>
              <input type="text"
              name=""
              id="lastname"
              value={newLastName}
              onChange={(e)=>setNewLastName(e.target.value)}
              className="w-full max-w-full px-3 py-3 border border-green-600 rounded text-yellow-50 bg-neutral-950 font-inherit box-border"
              />
              <label htmlFor="email" className="text-yellow-50 font-bold mt-2">Email</label>
              <input type="email"
               name="" id="email"
                value={newEmail}
                onChange={(e)=>setNewEmail(e.target.value)}
                required
                className="w-full max-w-full px-3 py-3 border border-green-600 rounded text-yellow-50 bg-neutral-950 font-inherit box-border"
                />
              <label htmlFor="message" className="text-yellow-50 font-bold mt-2">Write a message</label>
              <textarea name=""
               id="message"
                  value={newMessage}
                  onChange={(e)=>setNewMessage(e.target.value)}
                  className="w-full max-w-full px-3 py-3 border border-green-600 rounded text-yellow-50 bg-neutral-950 font-inherit box-border resize-vertical min-h-40"
               ></textarea>
               <hr className="border-0 border-t border-gray-700 my-4" />
              <button type="submit" className="px-6 py-3 bg-green-600 text-black border-0 rounded font-bold cursor-pointer w-fit hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out">Submit</button>
            </form>
    </div>
    </>
  )
}

export default Form
