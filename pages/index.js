import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import styles from '../styles/Home.module.css';

export default function Home() {

  const form = useRef();
  const emailDialog = useRef()
  const openEmailDialog = () => {
    emailDialog.current.open = true;
    setTimeout(addFadeOut, 2000)
    setTimeout(closeEmailDialog, 6000)

  }
  const addFadeOut = () => {
    emailDialog.current.classList.add(`${styles.fadeOut}`)
  }

  const closeEmailDialog = () => {
    emailDialog.current.open = false;
    emailDialog.current.classList.remove(`${styles.fadeOut}`)
  }

  const scroll2Element = (elemID) => {
    window.scrollTo({
      top: document.getElementById(elemID).offsetTop - 20,
      behavior: "smooth",
    });
  }

  const linkHandler = (e) => {
    e.preventDefault();
    const goto = e.target.getAttribute("goto");
    setTimeout(() => {
      scroll2Element(goto);

    }, 0);
  }


  const sendEmail = async (e) => {
    e.preventDefault();
    // const userName = form.current.user_name.value
    // const userEmail = form.current.user_email.value
    // const userMessage = form.current.user_message.value

    // if (userName.length !== 0 && userEmail.length !== 0) {
    await emailjs.sendForm('service_bilalk_gmail', 'template_6ub1rea', form.current, process.env.NEXT_PUBLIC_EMAILJS_KEY)
      .then((result) => {
        openEmailDialog();
        console.log(result.text);
      }), (error) => {
        console.log(error.text)
      }
    // }

  }


  useEffect(() => {


    const navbar = document.getElementById('navContainer');
    const sticky = navbar.offsetTop;
    const eyeExpandClasses = document.getElementsByClassName('eyeExpandOnHover');
    const eye = document.getElementById('eye')
    const eyeBackground = document.getElementById('eyeBack');


    for (let i = 0; i < eyeExpandClasses.length; i++) {

      eyeExpandClasses[i].addEventListener('mouseenter', () => {

        eyeBackground.classList.add(`${styles.scale}`)
        eye.classList.add(`${styles.scaleEye}`)
      })

      eyeExpandClasses[i].addEventListener('mouseleave', () => {

        eyeBackground.classList.remove(`${styles.scale}`)
        eye.classList.remove(`${styles.scaleEye}`)
      })

    }

    // });


    const navBarFix = () => {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add(`${styles.sticky}`);
        document.getElementById('navChild1').classList.add(`${styles.navChildSticky}`);
        document.getElementById('navChild2').classList.add(`${styles.navChildSticky}`);
        document.getElementById('navChild3').classList.add(`${styles.navChildSticky}`);

      }
      else {
        navbar.classList.remove(`${styles.sticky}`);
        document.getElementById('navChild1').classList.remove(`${styles.navChildSticky}`);
        document.getElementById('navChild2').classList.remove(`${styles.navChildSticky}`);
        document.getElementById('navChild3').classList.remove(`${styles.navChildSticky}`);
      }
    }
    // NAVBAR FIX
    window.onscroll = function () {
      navBarFix();
    }




    // EYE MOVE
    document.addEventListener('mousemove', (e) => {

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const anchor = document.getElementById('container');
      const rekt = anchor.getBoundingClientRect();

      const anchorX = rekt.left + rekt.width / 2;
      const anchorY = rekt.top + rekt.height / 2;

      const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

      const eyeHole = document.getElementById('eye');
      eyeHole.style.transform = `rotate(${90 + angleDeg}deg)`;

    })

  }, []);

  if (typeof window !== "undefined") {
    document.addEventListener('mouseleave', () => {
      const eye = document.getElementById('eye')
      eye.classList.add(`${styles.eyeHibernate}`);
    })

    document.addEventListener('mouseEnter', () => {
      const eye = document.getElementById('eye')
      eye.classList.remove(`${styles.eyeHibernate}`);
    })


  }

  function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;

    const rad = Math.atan2(dy, dx);
    const deg = rad * 180 / Math.PI;
    return deg;

  }

  return (

    <>

      <Head>
        <title>Bilal&apos;s Portofolio</title>
        <html lang='en' />
      </Head>

      <h1 className={`text-center mt-7 text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-semibold`}>Khawaja Muhammad Bilal</h1>
      <header className={``} id="navContainer">
        <nav className={` ${styles.navbar} container text-lg xl:text-xl m-0 xl:mx-auto rounded xl:w-1/3 lg:w-2/3 md:w-3/4 w-100 flex justify-center px-4 pt-4 text-center mx-auto`}>
          <p goto="about" prefetch="false" onClick={linkHandler} id='navChild1' className={` ${styles.navbarLink} cursor-pointer eyeExpandOnHover hover:bg-white transition-all hover:transition-all hover:text-[#363636] font-semibold font- border-y-2 w-1/2 border-l-2 rounded-l xl:p-2 p-2`}>About</p>
          <p goto="projects" prefetch="false" onClick={linkHandler} id='navChild2' className={`${styles.navbarLink} cursor-pointer eyeExpandOnHover hover:bg-white transition-all hover:transition-all hover:text-[#363636] font-semibold border-y-2 w-1/2  xl:p-2 p-2`}>Projects</p>
          <p goto="contact" prefetch="false" onClick={linkHandler} id='navChild3' className={`${styles.navbarLink} cursor-pointereyeExpandOnHover hover:bg-white transition-all hover:transition-all hover:text-[#363636] font-semibold border-y-2 w-1/2 border-r-2 rounded-r xl:p-2 p-2`}>Contact</p>
        </nav>
        <Image
          className={`mx-auto w-1/1 xl:w-1/4 lg:w-1/2 md:w-2/3 ${styles.eyeBackground}`}
          id="eyeBack"
          src='/eyeBackground.svg'
          alt='...'
          loading='eager'
          priority
          width={500}
          height={500}
        />
        <div className={`${styles.eyeTrackerContainer} `} id="container" >
          <div className={`${styles.eyeContainer} mx-auto`}>
            <Image src='/eyeHole.svg' width={80} loading='eager' height={80} alt="..." className={`${styles.eyeSVG}`} id="eye" />
          </div>
        </div>
      </header>

      <section className={``}>
        <div>
          <section className={`container xl:w-1/3 w-5/6  mt-5 text-xl flex flex-col justify-center items-center mx-auto`} id="about">
            <p className={`font-thin text-center ${styles.heroText}`}>Yo! My name&apos;s Bilal, and I&apos;m a full-stack developer, teacher, and blogger. </p>
            <div className={`flex text-center mt-8`}>
              <p className={`border-r pr-10 pt-2 pb-3 font- text-lg `}><span className={``}>I&apos;m experienced in:</span><span className={`text-md font-thin`}> <br /> Next.js <br />TailwindCSS <br />MongoDB <br /> and more...</span></p>
              <p className={`pl-10 pt-2 font-light text-lg`}><span className={`font-medium`}>My hobbies include:</span> <span className={`text-lg font-thin`}><br />Reading <br />Sketching<br />Blogging </span></p>
            </div>
            <p className={`font-thin mt-8 text-center`}>I&apos;m current freelancing and <span className={`font-semibold`}>open for work</span>.</p>
          </section>

          <p className={`mt-20 text-3xl text-center font-semibold ${styles.projectsHeading}`} id="projects">Projects</p>
          <section className={`mx-auto mt-10 container flex flex-col xl:flex-row gap-10 xl:w-3/4 w-4/5 `}>
            <div className={`mx-auto xl:w-1/2`}>
              <Image src='/outnetWebsite.jpg' width={700} height={500} alt="..." className={`mx-auto rounded eyeExpandOnHover`} id="projectImage" />
              <p className={`font-thin xl:text-lg mt-5 `}>A clone of the e-commerce website &apos;The Outnet&apos;, link to github repo is <Link href='https://github.com/beelal-k/the-outnet-clone' className={`underline font-medium eyeExpandOnHover`}>here</Link></p>
              <p className={`font-semibold mt-1`}>Built with: <span className={`font-thin`}>React.js, Bootstrap,  MongoDB, Express.js</span></p>
            </div>

            <div className={`mx-auto xl:w-1/2 `} >
              <Image src='/zchromeWebsite.jpg' width={700} height={500} alt="..." className={`mx-auto eyeExpandOnHover rounded`} />
              <p className={`font-thin xl:text-lg mt-5 `}>A surface pattern design market, currently a <span className={`font-semibold`}>work in progress</span>.</p>
              <p className={`font-semibold mt-1 `}>Built with: <span className={`font-thin`}>React.js, Bootstrap, Firebase</span></p>
            </div>

          </section>
        </div>

      </section>


      <section className={`mt-20`} id="contact">

        <p className={`mt-10 text-3xl text-center font-semibold input ${styles.projectsHeading}`} id="projects">Contact me</p>
        <form className={`mx-auto container flex flex-col xl:w-1/3 gap-5 mt-10 w-4/5 `} ref={form} onSubmit={sendEmail}>
          <input type='text' required placeholder='Name' name="user_name" id='user_name' className={`appearance-none outline-0 shadow bg-transparent border-2 rounded p-3 ${styles.contactInput}`} />
          <input type='email' required placeholder='Email' name="user_email" id='user_email' className={`appearance-none shadow outline-0 bg-transparent border-2 rounded p-3 ${styles.contactInput}`} />
          <textarea type='' required minLength={10} placeholder="What&apos;s up" name="user_message" id='user_message' rows={7} className={`resize-none appearance-none shadow outline-0 bg-transparent border-2 rounded p-3 ${styles.contactInput}`}></textarea>
          <input type='submit' className={`btn border-2 xl:w-1/3 w-1/2 hover:bg-[#b8b8b8] cursor-pointer hover:border-[#b8b8b8]  hover:transition-all transition-all rounded bg-[#f3f3f3] text-[#363636] font-semibold text-xl mx-auto p-2 mt-3 eyeExpandOnHover`} />
        </form>

      </section>

      <footer className={`mt-20 xl:justify-start justify-center items-center mx-auto xl:w-1/3 flex flex-col gap-5 pb-20`}>
        <Link href='https://github.com/beelal-k' prefetch={false} target="_blank" className={`flex items-center eyeExpandOnHover`}><Image src='/githubIcon.svg' width={30} height={40} alt="..." className={`inline mr-4 `} /><span className={`border-b`}>github.com/beelal-k</span></Link>
        <Link href='https://www.linkedin.com/in/bilalk902/' prefetch={false} target="_blank" className={`flex items-center eyeExpandOnHover `}><Image src='/linkedinIcon.svg' width={23} height={40} alt="..." className={`ml-1 inline mr-5`} /><span className={`border-b`}>linkedin.com/in/bilalk902/</span></Link>
        <Link href='https://medium.com/@bilal_k' prefetch={false} target="_blank" className={`flex items-center eyeExpandOnHover `}><Image src='/mediumIcon.svg' width={25} height={40} alt="..." className={`ml-1 inline mr-5`} /><span className={`border-b`}>medium.com/@bilal_k</span></Link>
      </footer>


      {/* EMAIL SENT POPUP */}

      {/* <div className={`container flex align-end justify-end border`}> */}
      <dialog className={`bg-transparent p-3 container ${styles.emailDialog}`} ref={emailDialog}>
        <div className={`border-2 border-[#1a1a1a] bg-[#f3f3f3] flex justify-between rounded p-4 xl:w-1/4 w-2/3 float-right`}>
          <p className={`text-[#363636] text-xl font-semibold `}>Email sent!</p>
          <Image src="/closeIcon.svg" width={20} height={20} alt="..." className={`cursor-pointer`} onClick={closeEmailDialog} />
        </div>
      </dialog>
      {/* </div> */}

    </>

  )
}
