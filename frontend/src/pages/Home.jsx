import { Link } from "react-router-dom"
import iFatoss from "../assets/iFatoss.jpg"
import src from "../assets/src.jpg"
import techhub from "../assets/techhub.jpg"
import ScrollFadeIn from "../components/ScrollFadeIn"
import RightAnimationForward from "../components/RightAnimationForward"
const Home = ()=>  {
  
  return (
   <main className="mt-10  bg-black md:mx-3 sm:mx-2">
     
      <section className=" lg:ml-16 xl:ml-20 mx-8">
       <RightAnimationForward> <h2 className="text-3xl mb-16 sm:text-xl ml-2  md:text-2xl ml-4 lg:text-3xl  w-full leading-tight tracking-wider text-yellow-50  ">Start your coding jornery: Exploring the Programming</h2>
       </RightAnimationForward>
        <ScrollFadeIn>
        <figure className="grid h-70 grid-cols-1 sm:grid-cols-3 grid-rows-1 lg:grid-cols-4 grid-rows-2  gap-6 mt-6 " >
          <picture  className=" hidden rounded-md sm:block col-span-2 row-span-2 lg:col-span-2 ">
            <img src="src\assets\laptop.png" alt="" className="w-full h-full object-cover block" />
          </picture>
          <picture className="hidden rounded-md lg:block row-span-2 ">
            <img src="src\assets\motherboard.jpg" alt="" className="w-full h-full object-cover block" />
          </picture>
          <div className="bg-green-600 row-span-2 flex flex-col items-center justify-start rounded-lg  ">
            <img src="src\assets\ray.png " alt="" className=" h-30 m-0 cols-span-1 block md:h-25 lg:-mt-2" /> 
            <p className="text-white px-4 md:text-center -mt-4 ">Join me to see how i tackled most programming problems  and joined the Tech space</p>
            <Link to={'/login'} className="text-black bg-white px-4 py-2 flex rounded-md mt-4">Explore more</Link>
          </div>
        </figure> 
         </ScrollFadeIn>
      </section>
     
   
  
       <section className=" lg:pt-48 ">
         <ScrollFadeIn>
          <div className="mx-8 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 items-center">
            <div className="mb-8 lg:mb-12 xl:mb-12 p-6 lg:p-10 xl:p-12">
             <h2 className="text-2xl lg:text-4xl xl:text-6xl mb-6 text-yellow-50">Get in touch</h2>
            
             <p className="text-md lg:text-xl xl:text-xl leading-relaxed max-w-full lg:max-w-4xl text-yellow-50">Whether you're a beginner or an experienced developer, and ready to collaborate with others in the tech community, this is the place to start your journey. Feel free to reach out</p> 
           </div>
                   
                     <div className="">
            
                           <picture className="w-full h-full overflow-hidden  min-h-80 hidden md:block p-10">
                            <source srcSet="/src/assets/coding.png" type="image/png" />
                           <img src="/src/assets/coding.png" alt="" className="w-full h-full object-cover block rounded-lg transition shadow-[0_3px_8px_0_rgba(255,255,255,0.6)] lg:hover:scale-115 " />
                            </picture>
                     </div>
          </div>
          </ScrollFadeIn>
        
         <article className=" text-white px-2 mt-8 grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 items-center lg:py-48">
            <RightAnimationForward> <h3 className="mb-8 text-2xl font-bold italic text-center md:text-4xl xl:text-5xl">Explore, Learn, Grow</h3> </    RightAnimationForward>

             <ScrollFadeIn>
             <div className="mx-8 lg:text-xl">
               <p>Embark on a captivating journey through the wolrd of coding, Tech stack and enterprenu. Join me as i share insights, memorires and personal reflections on the challeges and triumphs of building something from scratch</p>
                <p className="mt-16">Experience the energy and excitement of the tech world as we explore the depths of coding and    start  up development for this final Year project </p>
               
                <Link to="/login"className="rounded-md text-black bg-white px-6 py-2 block my-4 text-center">Join Now</Link>
             </div>
              </ScrollFadeIn>
          </article>

         <article className="bg-white text-black-400 py-24">
           <ScrollFadeIn> <div className=" grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 ">
              <RightAnimationForward> <h4 className="font-bold text-center text-3xl py-4 ml-4 lg:text-5xl items-center">Mission</h4>
              </RightAnimationForward>
              <span className="block px-4 ">
                <p className="font-bold italic text-center text-xl  lg:text-2xl pb-4">Empowering innovators</p>
                <p className="lg:pb-8">This blog is dedicated to empowering aspiring coders and tech enthusiasts by sharing knowledge, experiences, and resources to help them succeed in their coding journey and entrepreneurial endeavors.</p>
              </span>
              <p className="my-4 px-4 lg:translate-y-6 ">Through content, I thrive to offer a unique blend of insights, guidance and motivation to fuel the entrepreneurial sprirt within each reader. Join us on this jorney of growth, learning, and sucess in the tech industry </p>
             </div>
           </ScrollFadeIn>
        </article>
     
      </section>

      <ScrollFadeIn>
        <section className="py-12 px-4 lg:px-10">
          <RightAnimationForward>
            <h2 className="text-3xl lg:text-4xl mb-8 text-center font-bold text-yellow-50 tracking-wide">Our Partnerships</h2>
          </RightAnimationForward>
          <p className="text-center text-lg lg:text-xl mb-12 max-w-3xl mx-auto text-yellow-50 leading-relaxed">
            We're proud to collaborate with leading institutions and organizations in the tech and education space. These partnerships help us bring valuable resources, events, and opportunities to our community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img 
                src={iFatoss} 
                alt="Ifatoss University Logo" 
                className="w-32 h-32 object-contain mb-4 rounded-full border-2 border-yellow-50 bg-white p-2"
              />
              <h3 className="text-xl font-semibold text-yellow-50 mb-2">Ifatoss University</h3>
              <p className="text-center text-sm lg:text-base text-gray-300">
                Partnering to provide educational resources and coding workshops for students.
              </p>
            </div>
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img 
                src={src}
                alt="Ifatoss SRC Logo" 
                className="w-32 h-32 object-contain mb-4 rounded-full border-2 border-yellow-50 bg-white p-2"
              />
              <h3 className="text-xl font-semibold text-yellow-50 mb-2">Ifatoss SRC</h3>
              <p className="text-center text-sm lg:text-base text-gray-300">
                Collaborating on student-led tech initiatives and community events.
              </p>
            </div>
            <div className="flex flex-col items-center bg-gray-800 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <img 
                src={techhub} 
                alt="I Tech Hub Logo" 
                className="w-32 h-32 object-contain mb-4 rounded-full border-2 border-yellow-50 bg-white p-2"
              />
              <h3 className="text-xl font-semibold text-yellow-50 mb-2">I Tech Hub</h3>
              <p className="text-center text-sm lg:text-base text-gray-300">
                Working together to foster innovation through mentorship and startup support.
              </p>
            </div>
          </div>
        </section>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <section className="py-12 px-4 lg:px-10">
          <RightAnimationForward>
            <h2 className=" mx-8 text-3xl lg:text-4xl mb-8 text-center font-bold text-yellow-50 tracking-wide">Meet Our Tech-Related Students</h2>
          </RightAnimationForward>
          <p className="text-center text-lg lg:text-xl mb-12 max-w-3xl mx-auto text-yellow-50 leading-relaxed">
            Discover some of our talented tech enthusiasts who are passionate about coding, innovation, and building the future. These level 300 students are actively contributing to the tech community through projects, collaborations, and continuous learning.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="flex flex-col items-center bg-purple-600 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-yellow-50 mb-2">Samuel</h3>
              <p className="text-center text-sm lg:text-base text-gray-300 mb-2"> 300 Level</p>
              <p className="text-center text-sm lg:text-base text-gray-300">
                Samuel is an aspiring full-stack developer with a keen interest in web technologies and AI integration.
              </p>
            </div>
            <div className="flex flex-col items-center bg-purple-600 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-yellow-50 mb-2">Edward</h3>
              <p className="text-center text-sm lg:text-base text-gray-300 mb-2"> 300 Level</p>
              <p className="text-center text-sm lg:text-base text-gray-300">
                Edward focuses on web app development and graphic design, always exploring new ways to secure digital experiences.
              </p>
            </div>
            <div className="flex flex-col items-center bg-purple-600 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-yellow-50 mb-2">Favour</h3>
              <p className="text-center text-sm lg:text-base text-gray-300 mb-2">300 Level</p>
              <p className="text-center text-sm lg:text-base text-gray-300">
                Favour is passionate about video editing, Graphic design and cyber security helping to solve real-world problems.
              </p>
            </div>
            <div className="flex flex-col items-center bg-purple-600 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-semibold text-yellow-50 mb-2">David</h3>
              <p className="text-center text-sm lg:text-base text-gray-300 mb-2"> 300 Level</p>
              <p className="text-center text-sm lg:text-base text-gray-300">
                David excels in computer Science and AI computing, building scalable applications for the modern web.
              </p>
            </div>
          </div>
        </section>
      </ScrollFadeIn>
    

   </main>
  )
}

export default Home