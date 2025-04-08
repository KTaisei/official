import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Terminal,
  Code,
  User,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Header from "./components/Header";
import TerminalComponent from "./components/Terminal";
import ProjectCard from "./components/ProjectCard";
import ContactForm from "./components/ContactForm";
import { projects } from "./data";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("dark");
  const [typing, setTyping] = useState("");
  const [fullText] = useState("Hello World!");
  const [charIndex, setCharIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const navigate = useNavigate();

  // Typing effect
  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTyping((prev) => prev + fullText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Handle section change
  useEffect(() => {
    if (activeSection === "home") {
      navigate("/");
    } else if (activeSection === "blog") {
      navigate("/blog");
    } else {
      navigate(`/${activeSection}`);
    }
  }, [activeSection, navigate]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}
      data-oid="mlygp_v"
    >
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
        data-oid="nh0qajr"
      />

      <main className="container mx-auto px-4 py-8" data-oid="cuvhzr9">
        <Routes data-oid="cy9fwjv">
          <Route
            path="/"
            element={
              <section
                className="py-20 flex flex-col items-center justify-center"
                data-oid="wlb2ju7"
              >
                <div
                  className="max-w-4xl mx-auto text-center"
                  data-oid="yi7e1i1"
                >
                  <div className="mb-8 inline-block" data-oid="bbn.66c">
                    <Terminal
                      className="w-16 h-16 mx-auto mb-4"
                      data-oid="d2pq80:"
                    />
                  </div>
                  <h1
                    className="text-4xl md:text-6xl font-bold mb-6 font-mono"
                    data-oid="rg4eb-d"
                  >
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                      data-oid="61f04sx"
                    >
                      {typing}
                    </span>
                    <span
                      className={`inline-block w-3 h-8 ml-1 bg-blue-500 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                      data-oid="613.3.v"
                    ></span>
                  </h1>
                  <p
                    className="text-xl md:text-2xl mb-8 font-mono opacity-80"
                    data-oid="z_m4spm"
                  >
                    I'm a front end Engineer.
                  </p>
                  <div
                    className="flex flex-wrap justify-center gap-4"
                    data-oid="6r1hrfs"
                  >
                    <button
                      onClick={() => setActiveSection("about")}
                      className="px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors font-mono flex items-center"
                      data-oid="om8x:fs"
                    >
                      <User className="mr-2 h-5 w-5" data-oid="lhdvw6y" />
                      About Me
                    </button>
                    <button
                      onClick={() => setActiveSection("projects")}
                      className="px-6 py-3 rounded-md bg-purple-600 hover:bg-purple-700 transition-colors font-mono flex items-center"
                      data-oid=":xx6uit"
                    >
                      <Code className="mr-2 h-5 w-5" data-oid=".b3cles" />
                      View Projects
                    </button>
                  </div>
                </div>

                <div className="mt-16 w-full max-w-3xl" data-oid="e0xxsz_">
                  <TerminalComponent
                    setActiveSection={setActiveSection}
                    data-oid="71pzb0p"
                  />
                </div>
              </section>
            }
            data-oid="ccn4._t"
          />

          <Route
            path="/about"
            element={
              <section className="py-16" data-oid="238zsuw">
                <div className="max-w-4xl mx-auto" data-oid="faxl45u">
                  <div className="flex items-center mb-8" data-oid="2rxfc0q">
                    <User
                      className="mr-3 h-6 w-6 text-blue-500"
                      data-oid="ic8d:pm"
                    />

                    <h2
                      className="text-3xl font-bold font-mono"
                      data-oid="1.4q.g7"
                    >
                      About Me
                    </h2>
                  </div>

                  <div
                    className={`p-6 rounded-lg mb-8 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}
                    data-oid="4calnfz"
                  >
                    <div
                      className="flex flex-col md:flex-row gap-8"
                      data-oid="yw4linz"
                    >
                      <div className="md:w-1/3" data-oid="y721sgy">
                        <img
                          src="https://ktaisei.github.io/stophone_tsx/profile.JPG"
                          alt="Profile"
                          className="rounded-lg w-full h-auto object-cover shadow-md"
                          data-oid="5ugqbhu"
                        />

                        <div
                          className="mt-4 flex justify-center space-x-4"
                          data-oid="ajxxhcb"
                        >
                          <a
                            href="https://github.com/KTaisei"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                            data-oid="3vfdivd"
                          >
                            <Github className="h-6 w-6" data-oid="zz6b91." />
                          </a>
                          <a
                            href="https://x.com/Yasumasascience"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                            data-oid="-5txsb3"
                          >
                            <Twitter className="h-6 w-6" data-oid="sxf.j:h" />
                          </a>
                        </div>
                      </div>
                      <div className="md:w-2/3" data-oid="qf3mv8.">
                        <h3
                          className="text-2xl font-bold mb-4 font-mono"
                          data-oid="2895gi4"
                        >
                          Hello, I'm{" "}
                          <span className="text-blue-500" data-oid="3o0ilao">
                            Taisei Kawakami
                          </span>
                        </h3>
                        <p className="mb-4 font-mono" data-oid="xs:e1:u">
                          I'm a front end Engineer. I have a passion for web
                          development and love to create interactive and
                          engaging web applications.
                        </p>
                        <p className="mb-4 font-mono" data-oid="ym3n:sq">
                          I often create projects using React, TypeScript, and
                          Tailwind CSS. I'm also interested in deep learning and
                          data science.
                        </p>
                        <div className="mt-6" data-oid="40c.4qv">
                          <h4
                            className="text-xl font-bold mb-3 font-mono"
                            data-oid="blluyoq"
                          >
                            Technical Skills
                          </h4>
                          <div
                            className="flex flex-wrap gap-2"
                            data-oid="s:5:u4t"
                          >
                            {[
                              "JavaScript",
                              "React",
                              "Python",
                              "Flutter",
                              "Astro",
                            ].map((skill) => (
                              <span
                                key={skill}
                                className={`px-3 py-1 rounded-full text-sm font-mono ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
                                data-oid="yurkih0"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}
                    data-oid="x01w.qr"
                  >
                    <h3
                      className="text-2xl font-bold mb-4 font-mono"
                      data-oid="q1gwtt3"
                    >
                      Experience
                    </h3>
                    <div className="space-y-6" data-oid="u.j3rtw">
                      <div
                        className="border-l-4 border-blue-500 pl-4"
                        data-oid="pnl_f57"
                      >
                        <h4
                          className="text-xl font-bold font-mono"
                          data-oid="yt4mgqg"
                        >
                          Senior Software Engineer
                        </h4>
                        <p
                          className="text-blue-500 font-mono"
                          data-oid="50t:yje"
                        >
                          TechCorp Inc. • 2022 - Present
                        </p>
                        <p className="mt-2 font-mono" data-oid="zgqgz17">
                          Led the development of a cloud-based analytics
                          platform that processes over 1TB of data daily.
                        </p>
                      </div>
                      <div
                        className="border-l-4 border-purple-500 pl-4"
                        data-oid="iikoozm"
                      >
                        <h4
                          className="text-xl font-bold font-mono"
                          data-oid="-50-g_z"
                        >
                          Full Stack Developer
                        </h4>
                        <p
                          className="text-purple-500 font-mono"
                          data-oid="5ga.e6o"
                        >
                          InnovateSoft • 2019 - 2022
                        </p>
                        <p className="mt-2 font-mono" data-oid="nlmf-f7">
                          Developed and maintained multiple web applications for
                          clients in finance and healthcare sectors.
                        </p>
                      </div>
                      <div
                        className="border-l-4 border-green-500 pl-4"
                        data-oid="reyrmcj"
                      >
                        <h4
                          className="text-xl font-bold font-mono"
                          data-oid="sjdcm-4"
                        >
                          Dawn
                        </h4>
                        <p
                          className="text-green-500 font-mono"
                          data-oid="ynvms2t"
                        >
                          2007/07/03
                        </p>
                        <p className="mt-2 font-mono" data-oid="ix:lxnz">
                          My life is started.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            }
            data-oid="dkgiavk"
          />

          <Route
            path="/projects"
            element={
              <section className="py-16" data-oid=":bdmdgt">
                <div className="max-w-6xl mx-auto" data-oid="-fg.8xh">
                  <div className="flex items-center mb-8" data-oid="de61x:k">
                    <Briefcase
                      className="mr-3 h-6 w-6 text-purple-500"
                      data-oid="f1j2uvv"
                    />

                    <h2
                      className="text-3xl font-bold font-mono"
                      data-oid=".0b_y-q"
                    >
                      Projects
                    </h2>
                  </div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    data-oid="x06b7gx"
                  >
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        theme={theme}
                        data-oid="ia7:l1."
                      />
                    ))}
                  </div>
                </div>
              </section>
            }
            data-oid="mv-b4xs"
          />


          <Route
            path="/contact"
            element={
              <section className="py-16" data-oid="6lalvs-">
                <div className="max-w-4xl mx-auto" data-oid="kzhde.b">
                  <div className="flex items-center mb-8" data-oid="6e71n2g">
                    <Mail
                      className="mr-3 h-6 w-6 text-red-500"
                      data-oid="svkhnl."
                    />

                    <h2
                      className="text-3xl font-bold font-mono"
                      data-oid="gta:j2z"
                    >
                      Contact
                    </h2>
                  </div>

                  <div
                    className={`p-6 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow-lg`}
                    data-oid=".6t_zhm"
                  >
                    <div
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      data-oid="str9rxb"
                    >
                      <div data-oid="63atawn">
                        <h3
                          className="text-2xl font-bold mb-4 font-mono"
                          data-oid="w16510n"
                        >
                          Get In Touch
                        </h3>
                        <p className="mb-4 font-mono" data-oid="mfj31d1">
                          Have a project in mind or want to discuss a potential
                          collaboration? Feel free to reach out using the
                          contact form or through my social media profiles.
                        </p>
                        <div className="space-y-4 mt-6" data-oid=".u0dgf-">
                          <div className="flex items-center" data-oid="i0p-1ck">
                            <Mail
                              className="h-5 w-5 mr-3 text-blue-500"
                              data-oid="d31naam"
                            />

                            <span className="font-mono" data-oid="538brj2">
                              contact@example.com
                            </span>
                          </div>
                          <div className="flex items-center" data-oid="2zql6fj">
                            <Github
                              className="h-5 w-5 mr-3 text-blue-500"
                              data-oid="1w4hvoi"
                            />

                            <span className="font-mono" data-oid="4bqf82k">
                              github.com/username
                            </span>
                          </div>
                          <div className="flex items-center" data-oid="forjv2u">
                            <Linkedin
                              className="h-5 w-5 mr-3 text-blue-500"
                              data-oid="ax6ww9d"
                            />

                            <span className="font-mono" data-oid="0wxqpcp">
                              linkedin.com/in/username
                            </span>
                          </div>
                        </div>
                      </div>
                      <ContactForm theme={theme} data-oid="8mw58_1" />
                    </div>
                  </div>
                </div>
              </section>
            }
            data-oid="o0:.tv2"
          />
        </Routes>
      </main>

      <footer
        className={`py-8 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}
        data-oid="2sy-sq:"
      >
        <div className="container mx-auto px-4 text-center" data-oid="c_q.:16">
          <p className="font-mono" data-oid="3jy2.1g">
            &copy; {new Date().getFullYear()} Kawakami Taisei. All rights
            reserved.
          </p>
          <div
            className="flex justify-center space-x-4 mt-4"
            data-oid="w144fg0"
          >
            <a
              href="https://github.com/ktaisei"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              data-oid="5jkr6tg"
            >
              <Github className="h-5 w-5" data-oid="-m_c9fg" />
            </a>
            <a
              href="https://twitter.com/Yasumasascience"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
              data-oid="nc6-_r5"
            >
              <Twitter className="h-5 w-5" data-oid="s6m3xi8" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
