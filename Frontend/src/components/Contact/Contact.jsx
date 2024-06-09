import "./Contact.css";
import {Button} from "@mui/material"
import Metadata from "../Metadata"

const Contact = () => {
  return (
    <>
      <Metadata title="ECommerce Contact Us" />
      <div className="contactContainer">
        <a className="mailBtn" href="mailto:goyaldavid55@gmail.com">
          <Button>Contact: goyaldavid55@gmail.com</Button>
        </a>
      </div>
    </>
  );
};

export default Contact;