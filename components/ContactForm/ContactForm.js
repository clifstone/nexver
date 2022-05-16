import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { motion } from "framer-motion"
import { InView  } from "react-intersection-observer"


  const togglethanks = () => {
    document.querySelector('.thankyou').classList.add('active');
    setTimeout(() => {
      document.querySelector('.thankyou').classList.remove('active');
    },2000);
  }


export default function ContactForm() {
    const validationSchema = Yup.object().shape({
        yourName: Yup.string()
          .required('First Name is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
        yourMessage: Yup.string()
          .required('You need to write a message')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (data) =>{
        //console.log(JSON.stringify(data, null, 4));
        fetch(
          '/api/contact', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data, null, 4)
        })
        reset();
        togglethanks();
        return false;
    }

    return (
        <section id="contactsection" className="contactsection">
          <div className="wrapper">
          <InView threshold={0}>
          {({ ref, inView }) => (
            <div className="sectionheading">
              <motion.h2
              ref={ref}
              initial={{ opacity:0, y: 50 }}
              animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
              transition={{ duration: 0.5, ease: 'backOut' }}>Contact Clif</motion.h2>
              <motion.p
              ref={ref}
              initial={{ opacity:0, y: 50 }}
              animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
              transition={{ duration: 1, delay: 0.15, ease: 'backOut' }}>Send me a message. Lets chat</motion.p>
            </div>
          )}
          </InView>
          <InView threshold={0}>
          {({ ref, inView }) => (
            <motion.div className="formwrapper"
            ref={ref}
              initial={{ opacity:0, y: 50 }}
              animate={ inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 } }
              transition={{ duration: 1, delay: 0.15, ease: 'backOut' }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="formrow">
                  <label>Your Name</label>
                  <input name="your name" type="text" {...register('yourName')} className={`form-control ${errors.yourName ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.yourName?.message}</div>
                </div>
                <div className="formrow">
                  <label>Your Email</label>
                  <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="formrow">
                  <label>Your Message</label>
                  <textarea name="your message" {...register('yourMessage')} className={`form-control ${errors.yourMessage ? 'is-invalid' : ''}`}></textarea>
                  <div className="invalid-feedback">{errors.yourMessage?.message}</div>
                </div>
                <div className="formrow">
                    <button type="submit" className="btn submitbtn">Submit</button>
                    <button type="button" onClick={() => reset()} className="btn resetbtn">Reset</button>
                </div>
              </form>
            </motion.div>
          )}
          </InView>
            
            <div className="thankyou">
              <div className="wrapper">
                <div className="headline"><span>Thank You</span></div>
                <div className="subheadline"><span>I&lsquo;ll get back to ya shortly</span></div>
              </div>
            </div>
          </div>
        </section>
    );
}