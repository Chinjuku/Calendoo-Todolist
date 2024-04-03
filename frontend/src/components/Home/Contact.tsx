import Location from "/svg/location.svg";
import Email from "/svg/email.svg";
import Phone from "/svg/phone.svg";
import { ContactForm } from "./ContactForm";

const Contact = () => {
  return (
    <div className="h-screen w-full justify-center flex flex-col gap-5 items-center pt-[40px]">
      <h1 className="text-secondary text-[52px] font-bold">CONTACT US</h1>
      <div className="h-[69%] w-[80%] bg-primary rounded-[77px] grid grid-cols-2 gap-10 py-[50px] px-[70px]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <img src={Location} alt="" />
            <div>
              <p className="Second text-[24px]">Location :</p>
              <p className="text-secondary1 font-bold">
                Uplace, 520/77 Ladkrabang Bangkok, 10520
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img src={Email} alt="" />
            <div>
              <p className="Second text-[24px]">Email :</p>
              <p className="text-secondary1 font-bold">
                Uplace, 520/77 Ladkrabang Bangkok, 10520
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <img src={Phone} alt="" />
            <div>
              <p className="Second text-[24px]">Phone Call :</p>
              <p className="text-secondary1 font-bold">
                Uplace, 520/77 Ladkrabang Bangkok, 10520
              </p>
            </div>
          </div>
          <div>
            <iframe
              width="90%"
              height="250"
              src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=KMITL%20IT+(My%20Business%20Name)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/">gps vehicle tracker</a>
            </iframe>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
