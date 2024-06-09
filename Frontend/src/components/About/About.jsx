import "./aboutSection.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedinIcon from "@mui/icons-material/Linkedin";
import GitHubIcon from "@mui/icons-material/GitHub";
import Metadata from "../Metadata";



const About = () => {

  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/david-goyal/";
  };

  return (
    <>
      <Metadata title="ECommerce About Us"/>
      <div className="aboutSection">
        <div></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
          <Typography component="h1">About Us</Typography>

          <div>
            <div>
              <Avatar
                style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
                src="https://res.cloudinary.com/dlu7jj0qk/image/upload/v1717840973/avatars/ushrp7rpxxxsddcfkrim.jpg"
                alt="Founder"
              />
              <Typography>David Goyal</Typography>
              <Button onClick={visitLinkedin} color="primary">
                Visit Linkedin
              </Button>
              <span>
                This is a website made by David Goyal.
              </span>
            </div>
            <div className="aboutSectionContainer2">
              <Typography component="h2">Our Brands</Typography>
              <a
                href="https://github.com/DavidGoyal"
                target="blank"
              >
                <GitHubIcon className="githubSvgIcon" />
              </a>

              <a href="https://www.linkedin.com/in/david-goyal/" target="blank">
                <LinkedinIcon className="linkedinSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;