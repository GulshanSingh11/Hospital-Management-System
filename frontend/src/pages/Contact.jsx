import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

const Contact = () => {
  const [formData,setFormData]=useState({})
  const handleSubmit=async()=>{
    const res = await fetch(`${BASE_URL}/auth/contact`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if(res.status==200){
      toast.success("Message sent")
      setFormData({})
      setTimeout(()=>{
        window.location.reload()
      },1000)
    }
  }
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center ">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          
        </p>
        <div action="#" className="space-y-8">
        <div>
            <label htmlFor="Name" className="form__label ">
              Your Name
            </label>
            <input
              type="name"
              onChange={
                (e)=>setFormData({...formData,name:e.target.value})
              }
              value={formData?.name}
              id="name"
              className="form__input mt-1"
              placeholder="Enter Your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form__label ">
              Your email
            </label>
            <input
              type="email"
              onChange={
                (e)=>setFormData({...formData,email:e.target.value})
              }
              value={formData?.email}
              id="email"
              className="form__input mt-1"
              placeholder="example@gmail.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label ">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData?.subject}
              onChange={
                (e)=>setFormData({...formData,subject:e.target.value})
              }
              className="form__input  mt-1"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="form__label">
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              value={formData?.message}
              onChange={
                (e)=>setFormData({...formData,message:e.target.value})
              }
              className="form__input  mt-1"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn  rounded  sm:w-fit  ">
            Send message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
