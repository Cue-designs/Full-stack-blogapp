import { Link } from "react-router-dom";
import student from '../assets/student.jpg'; 
import ray from '../assets/ray.png'; 
import Form from "../components/Form";
import techroom from "../assets/techroom.jpg"
import ScrollFadeIn from "../components/ScrollFadeIn";

const About = () => {
  return (
    <section className="font-roboto">
      <ScrollFadeIn>
        <div className="px-2 relative h-[60vh] w-full overflow-hidden"> 
        
          <img
          src={student}
          alt="Background description"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 text-white p-4 overflow-y-auto"> 
        
          <strong>
            
              <h2 className="ml-3 p-2 text-2xl text-center md:text-4xl lg:text-5xl">About CJ's Blog</h2>
            
          </strong>
         
          <p className="p-1 text-center text-sm md:text-xl lg: text-2xl">I aim to inspire others to pursue their coding dreams</p>
          <p className="p-1 text-center text-sm md:text-xl lg: text-2xl">
            Welcome to my personal blog where I share my experience learning to code and the exciting adventures of building a tech startup
          </p>
          <p className="p-2 text-center text-[.8rem] md:text-xl lg: text-2xl">
            Through my blog, the goal is to inspire people to chase their coding dreams. I believe that with determination anyone can break through.
          </p>
         
          <div className="flex justify-center w-full">
            <Link
              to="/signup"
              className="rounded-md px-4 py-2 border-[1px] ml-2 flex my-4 justify-center hover:text-purple-300 w-[18rem] transition 
               hover:shadow-[0_6px_15px_0_rgba(255,255,255,0.8)] hover:scale-105"
            >
              Join the journey
            </Link>
          </div>
        </div>
         
    </div>
     </ScrollFadeIn> 

     <ScrollFadeIn>
       <div className="px-4 py-8 max-w-4xl mx-auto text-center md:text-left px-8">
         <h3 className="text-2xl font-bold mb-4 md:text-3xl text-purple-600">Our Vision</h3>
         <p className="text-lg text-amber-100 mb-6 md:text-xl ">
           My vision for CJ's Blog is to create a vibrant community where aspiring coders and tech enthusiasts can find inspiration, resources, and support to turn their ideas into reality. I envision a world where coding is accessible to everyone, regardless of background, fostering innovation and creativity in the tech space.
         </p>

         <h3 className="text-2xl font-bold mb-4 md:text-3xl text-purple-600">Our Goals</h3>
         <ul className="text-lg mb-6 md:text-xl list-disc list-inside space-y-2">
           <li className="text-amber-100">Share practical coding tips and tutorials to help beginners level up their skills.</li>
           <li className="text-amber-100">Document real-world startup stories, including successes, failures, and lessons learned.</li>
           <li className="text-amber-100">Motivate readers to overcome challenges and persist in their tech journeys.</li>
           <li className="text-amber-100">Build a supportive community through comments, forums, and events.</li>
         </ul>

         <h3 className="text-2xl font-bold mb-4 md:text-3xl text-purple-600">Collaboration Opportunities</h3>
         <p className="text-lg text-amber-100 mb-6 md:text-xl">
           I'm excited to collaborate with fellow bloggers, developers, educators, and startups! Whether it's guest posting on coding topics, co-hosting live coding sessions or webinars, organizing joint coding challenges, or partnering on innovative tech projects, let's team up to amplify our impact. Reach out via the contact form below—I'd love to hear your ideas and explore how we can create something amazing together!
         </p>
       </div>
     </ScrollFadeIn>

      <ScrollFadeIn>
        <article className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-2 mb-8 md:grid-cols-3 px-9 lg:px-18"> 
          <picture className="hidden object-cover h-80 overflow-hidden rounded-md sm:block md:col-span-2 h-90">
            <img src={techroom} alt="Tech room illustration" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
          </picture>
          <div className="bg-purple-500 flex flex-col items-center justify-start rounded-lg p-4 shadow-lg ">
            <img
              src={ray}
              alt="Ray illustration"
              className="h-30 m-0 block md:h-25 lg:-mt-2 transition-transform duration-300 hover:rotate-24 h-50"
            />
            <p className="text-white px-4 md:text-center my-2 py-4 text-center sm:text-2xl md:text-xl font-semibold">
              Unleash your imagination in a world of endless possibilities, innovation, and creativity!
            </p>
          </div>
        </article>
      </ScrollFadeIn>

      <ScrollFadeIn>
        <div className="px-4 py-8 max-w-4xl mx-auto  text-center">
          <h3 className="text-2xl font-bold  md:text-3xl text-purple-600 lg:mb-16">Why Join Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-16 rounded-lg  shadow-md transition  hover:scale-110">
              <h4 className="text-xl font-semibold mb-2">Inspiring Stories</h4>
              <p>Real-life experiences from my coding journey to keep you motivated.</p>
            </div>
            <div className="bg-gray-100 p-16 rounded-lg shadow-md  transition hover:scale-110">
              <h4 className="text-xl font-semibold mb-2">Practical Tips</h4>
              <p>Actionable advice and code snippets to apply immediately.</p>
            </div>
            <div className="bg-gray-100 p-16 rounded-lg shadow-md  transition hover:scale-110">
              <h4 className="text-xl font-semibold mb-2">Community Support</h4>
              <p>Connect with like-minded individuals and grow together.</p>
            </div>
          </div>
        </div>
      </ScrollFadeIn>
      
      <Form />
    </section>
  );
};

export default About;