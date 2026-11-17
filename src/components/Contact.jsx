
import { useRef, useState } from "react";

function Contact() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Replace these with your intended public contact details.
  const WHATSAPP_NUMBER = "2348148657874";
  const CONTACT_EMAIL = "songujang5@gmail.com";
  const GITHUB_URL = "https://github.com/REDSTAR268";

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function createMessage() {
    return `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;
  }

  function handleSendWhatsApp() {
    if (!formRef.current.reportValidity()) return;

    const message = encodeURIComponent(createMessage());

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    window.open(whatsappURL, "_blank");
  }

  function handleSendEmail() {
    if (!formRef.current.reportValidity()) return;

    const subject = encodeURIComponent("Contact Form Message");
    const body = encodeURIComponent(createMessage());

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="contact-section">

      <div className="section-heading">
        <p className="eyebrow">LET'S CONNECT</p>
        <h1>Get In Touch</h1>
        <p>
          Have a question or want to work together?
          Feel free to send me a message.
        </p>
      </div>

      <div className="contact-container">

        {/* LEFT SIDE - ABOUT ME */}

        <div className="contact-about">

          <p className="eyebrow">INTRODUCTION</p>

          <h2>About Me</h2>

          <p className="about-description">
            Hello! I'm the developer behind this project.
            I enjoy learning programming, building websites,
            and creating beautiful digital experiences.
          </p>

          <div className="about-divider"></div>

          <h3>Let's Connect</h3>

          <p>
            You can explore my projects and coding
            journey on GitHub.
          </p>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
          >
            <span>GitHub</span>
            <span>↗</span>
          </a>

        </div>

        {/* RIGHT SIDE - CONTACT FORM */}

        <form
          className="contact-form"
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
        >

          <p className="eyebrow">SEND A MESSAGE</p>

          <h2>Contact Me</h2>

          <div className="contact-input-group">

            <label htmlFor="contact-name">Your Name</label>

            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="contact-input-group">

            <label htmlFor="contact-email">Email Address</label>

            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="contact-input-group">

            <label htmlFor="contact-phone">Phone Number</label>

            <input
              id="contact-phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>

          <div className="contact-input-group">

            <label htmlFor="contact-message">Your Message</label>

            <textarea
              id="contact-message"
              name="message"
              placeholder="Write your message..."
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            />

          </div>

          <div className="contact-buttons">

            <button
              type="button"
              className="whatsapp-button"
              onClick={handleSendWhatsApp}
            >
              Send to WhatsApp ↗
            </button>

            <button
              type="button"
              className="email-button"
              onClick={handleSendEmail}
            >
              Send to Email ↗
            </button>

          </div>

        </form>

      </div>
    </section>
  );
}

export default Contact;
