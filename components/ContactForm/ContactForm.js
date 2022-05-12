import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default Home;

function Home() {

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

    function onSubmit(data) {
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
        reset()
        return false;
    }

    return (
        <div className="card m-3 contactform">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Your Name</label>
                            <input name="your name" type="text" {...register('yourName')} className={`form-control ${errors.yourName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Your Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Your Message</label>
                            <textarea name="your message" {...register('yourMessage')} className={`form-control ${errors.yourMessage ? 'is-invalid' : ''}`}></textarea>
                            <div className="invalid-feedback">{errors.yourMessage?.message}</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary mr-1">Submit</button>
                        <button type="button" onClick={() => reset()} className="btn btn-secondary">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
}