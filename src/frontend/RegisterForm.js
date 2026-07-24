import { useState } from 'react';
import { motion } from "motion/react";
import {useNavigate} from 'react-router-dom';

const hobbyOptions = ['Reading', 'Music', 'Travel', 'Sports', 'Photography', 'Cooking'];

function RegisterForm() {
    let navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login');
    }
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        hobbies: [],
        mobile: '',
        terms: false,
    });
    const [submitted, setSubmitted] = useState(false);

    const updateField = (event) => {
        const { name, value, type, checked } = event.target;

        setSubmitted(false);
        setFormData((currentData) => ({
            ...currentData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const toggleHobby = (event) => {
        const { value, checked } = event.target;

        setSubmitted(false);
        setFormData((currentData) => ({
            ...currentData,
            hobbies: checked
                ? [...currentData.hobbies, value]
                : currentData.hobbies.filter((hobby) => hobby !== value),
        }));
    };

    const submitUser = (event) => {
        event.preventDefault();

        if (event.currentTarget.checkValidity()) {
            setSubmitted(true);
        }
    };

    return (
        <main className="register-page">
            <section className="register-intro" aria-label="Registration introduction">
                <button className="back-link" onClick={goToLogin}>&larr; Back to login</button>
                <motion.div initial={{
    opacity: 0,
    scale: 0.5,
    y: 50
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0
  }} transition={{
  type: "spring",
  stiffness: 100,
  damping: 10
}} className="brand-mark" aria-hidden="true">Motion</motion.div>
                <p className="eyebrow">Member registration</p>
                <h1>Make your mark.</h1>
                <p className="intro-copy">
                    Join a thoughtful community built around curiosity, creativity, and meaningful connections.
                </p>
                <div className="intro-detail">
                    <span className="detail-line" aria-hidden="true" />
                    <p>Your next chapter starts here.</p>
                </div>
            </section>

            <section className="form-panel">
                <div className="form-heading">
                    <p className="eyebrow">Create your account</p>
                    <h2>Welcome in</h2>
                    <p>Tell us a little about yourself to get started.</p>
                </div>

                {submitted && (
                    <div className="success-message" role="status">
                        Registration received. Welcome to the community, {formData.name}!
                    </div>
                )}

                <form onSubmit={submitUser}>
                    <div className="form-grid">
                        <label className="field field-wide">
                            <span>Full name</span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={updateField}
                                placeholder="e.g. Jordan Lee"
                                autoComplete="name"
                                required
                            />
                        </label>

                        <label className="field">
                            <span>Age</span>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={updateField}
                                placeholder="25"
                                min="13"
                                max="120"
                                required
                            />
                        </label>

                        <label className="field">
                            <span>Mobile number</span>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={updateField}
                                placeholder="+1 555 000 0000"
                                autoComplete="tel"
                                pattern="[0-9+() -]{7,}"
                                required
                            />
                        </label>
                    </div>

                    <fieldset>
                        <legend>Gender</legend>
                        <div className="choice-row">
                            {['Female', 'Male', 'Non-binary', 'Prefer not to say'].map((option) => (
                                <label className="choice" key={option}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={formData.gender === option}
                                        onChange={updateField}
                                        required
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>What are you into?</legend>
                        <div className="hobby-grid">
                            {hobbyOptions.map((hobby) => (
                                <label className="choice" key={hobby}>
                                    <input
                                        type="checkbox"
                                        name="hobbies"
                                        value={hobby}
                                        checked={formData.hobbies.includes(hobby)}
                                        onChange={toggleHobby}
                                    />
                                    <span>{hobby}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <label className="terms-choice">
                        <input
                            type="checkbox"
                            name="terms"
                            checked={formData.terms}
                            onChange={updateField}
                            required
                        />
                        <span>I agree to the <a href="/terms">terms and conditions</a>.</span>
                    </label>

                    <button type="submit">Complete registration <span aria-hidden="true">&#8594;</span></button>
                    <p className="form-note">By registering, you agree to receive occasional community updates.</p>
                </form>
            </section>
        </main>
    );
}

export default RegisterForm;