import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Game } from "./Game";
import { Home } from "./Home";
import { Admin } from "./Admin";
import { Profile } from "./Profile";

export default function App() {
  return (
    <div className="page-top" id="page-top">
      <header className="header">
        <a className="logo" href="#page-top">
          ABC Team
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <a href="#one" className="link link-theme link-arrow">
              Home
            </a>
          </li>
          <li>
            <a href="#two" className="link link-theme link-arrow">
              GAME
            </a>
          </li>
          <li>
            <a href="#three" className="link link-theme link-arrow">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#four" className="link link-theme link-arrow">
              ADMIN
            </a>
          </li>
        </ul>
      </header>

      <div id="main" className="main">
        <section className="intro">
          {/* <article className="container">
            <h1>
              Front-end <strong>Development</strong>
            </h1>

            <h2>
              Wanna craft the beautiful, responsive digital experiences you
              dream of ? We are here for you.
            </h2>

            <p>
              <a
                href=".footer"
                className="link link-theme link-arrow"
                title="Let’s Build Something Great"
              >
                LET’S BUILD SOMETHING GREAT
              </a>
            </p>
          </article> */}
        </section>

        <section className="work">
          <article className="container" id="one">
            {/* <Home /> */}
            <h2>video</h2>
            <iframe
              width="100%"
              height="680"
              src="https://www.youtube.com/embed/evS1TMx08Pc"
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2>docs</h2>
            <iframe
              src="https://onedrive.live.com/embed?cid=02AD7DCD1AD7F02C&amp;resid=2AD7DCD1AD7F02C%2134868&amp;authkey=AM2m9fgztPo8TfE&amp;em=2&amp;wdAr=1.7777777777777777"
              width="100%"
              height="691px"
              frameBorder={0}
            >
              This is an embedded{" "}
              <a target="_blank" href="https://office.com">
                Microsoft Office
              </a>{" "}
              presentation, powered by{" "}
              <a target="_blank" href="https://office.com/webapps">
                Office
              </a>
              .
            </iframe>
          </article>

          <article className="container" id="two">
            <Game />
          </article>

          <article className="container" id="three">
            <Profile
              name="Võ Văn Lên"
              job="STUDENT"
              like="The cake is a lie."
              url="https://lh3.googleusercontent.com/wahCfPBwOdy9-kfEat0XBxVgWRPmQY4ucdRyFL8f6IzPiBf-CfhIixi0cG1-L0gZwcIQMIfwOZBTLimQyCEKl2QvQm3aocuiUKgGnTqjUP0gC_zv_AoycKhgu4xHLCtjg0DeOV4k_2zu8mBRRtu2EpoYnC0eW_RaflZgNUU0YuqOJIlGKQNmGc5rDanuArh9RsPb9I95iDlfXUKq2YZ6KDEbAuSST-Ed39mR7HOy8DkB7mMn13BGBWqmbqX1Xc-4rWK0ZrvUMZgJJT2uiL2BdJJJ46Lpz7QPU552vBrs51u3w3sHflYIDMlLv4B90ZkGwa9nHn8yQ632X7ADLsrqKV3Qf4bXInFeCeahdCmFc-bXeFWfbHbDunveOeIeAio1ZKNcAYvSzWlCi6j_yr8mvlnDJRtR5PZOGG9FmJcL1uTQDSGdRB_uQwC3V0rITZXYt1SynLsSDadQ-1BzKoJID47VOF1igkEMRH8dhSIc6Gmb5yyrPBfDdNjbq9FYy-DxaWlxoBm3Pk331Xylg40imyvwdyHstg1IlAnrXfPqiGxOGgiPT_mYrLcKHVb_RkzJgN-7QPQ_7Uz_zHcOLeiizwMKk0GsMAsn4g4fh6ZrQVt3ge2wtCc4PlyBVKCmBfDBWqRbfxGHnpQi-R1M5J5j6L84qG_yQ6Dj3ML56Wf5CpR1jxDMTCEJFLE9ne4kx0DWksSPXbFgfwe7H2ey-HGg9aQ=s400-no?authuser=4"
            />

            <Profile
              name="Hồ Thế Mạnh"
              job="STUDENT"
              like="The cake is a lie."
              url="https://scontent.fsgn5-1.fna.fbcdn.net/v/t1.0-1/p160x160/158791339_1946145008874873_6979627271396901213_o.jpg?_nc_cat=101&ccb=1-3&_nc_sid=7206a8&_nc_ohc=uyNjJ1zkGioAX8HGNqr&_nc_ht=scontent.fsgn5-1.fna&tp=6&oh=ad2fa47fc6f953936c87cb3c15471553&oe=607C2956"
            />

            <Profile
              name="Đặng Thị Phương Thuý"
              job="STUDENT"
              like="The cake is a lie."
              url="https://lh3.googleusercontent.com/7A28gMK31RnOIzIVX3WBGlmgSWrMASB2dL7N-hjnXGXr4oRgaJWG4aYrwvBRgWTbq2EucKnURJw8Uy7nIi9qAlP7F8q-3Mq9EXiqZDLwR0XzWXeZs3ROGi-UPYl9YenzU39zMg7Rq7OceZUBKa5uZPJX1YF40def3KYgb6Vzlvy-42tspF37__JnQKDQGOB8j4bilP8d2b4t0QtCsDY92xHESu893w_AdWsGCPMzf5y2NQfN15Uk2-ZUpExoaSgNweL56oImnFCrqcyIxhgHbgXvXUq0_d8k0NiKkbj7tIrqhxssXfsf9ARc791NgtA2gHcTQLu_bc2-kaCphPFh_eI-zGmp5FwxqPUIjQUE6jqbSXJooYcSFEpMyWbPodKAXb9-1Uujt--HWWfs3zcE28dClmAaxHtfGbrfl1y4URBsvQ6gxUCBJtums0QWWmC1c8bRfntlNQ7nqUbJt1QeTXXgI7m4RVln7RMP9xjhHLTkU17fPCwS8M6j7di21oFCMEcLHWrHHdNBtRHIEYYlrZp0bs3sZnBJzSVcSbQPUkRWUD2prksK1ZUW930ixxAPA4Q9v_XeIKi1YwlRYKTXULcBDD_8RBvzDWM0z46Ji4UzLAYR1YoszFD4zZkfiM8WC8TM4B6YMT_oGg27yYMxTA3LOiVVEUDVQVUEtz6daKCUHMGWhIgou1a0wu8931jhMQYfmdUBKPHF68jQRS7tYgU=w519-h922-no?authuser=4"
            />

            <Profile
              name="Nguyễn Thị Thu Hiền"
              job="STUDENT"
              like="The cake is a lie."
              url="https://lh3.googleusercontent.com/MtxMoGTn-J8OggPeeB4YRpRpalYTuPxxsVwUOJULUr5R1FSUpxQu2Tp-Nr2w2jjnTKM6fUUYJ10dEKj5S2fsaezsDh_dd3HlJBtW9ndQWFJvnNH1mRr6hwTu-Rxrsh91EccYJ0mSgHKSkXyb2X1zquVCcEC0vwNhEma377uIktxN7ZnkIVivROorzM-8di6VufARHRSGkK8G5rTSjjyw1H-b9e3QH7qQwhcBFwej4H32tczPURUrJI5ar4sEDK4v4EeF40h6JrPZHevVXmZJW7FTXom0F07JgDvHi-x1JSoFs18X_uhywQvwfQEeVYprZLwPNyU-u-UHeUh3lXBYAMtrcqk1rKjrTkiZgmlCh1lRKuJN9et-pF5CglgHC0DcgVmBwLTUkE84T7O1S_mZthDbFYsM4rbHyWLgFbmrJLepp0CvLhZmiPT_kRYfudax9yfsLiNxV_hG8OcasmgDYD8oKGsOE43xYYf56pzEmb85XUr5v6wBPeRbTeXtFk-Ut7IV4eCX56feL-tKoKkPryhs7OK9OUV7XqNLN5Jv5D7KUQaG3V2OUJ1J8gV9qzMMXNp322pM6IeKh7uZxw6mTTBMrDyRzEIdH1VrjDWpyzLFWl7B_XKiNljMYzhCPUYyGv8pL8If_xEZKScwS-RpMiI32SY4fEwp-u5Y8RmLoB2o0f-VLMnicgV0HdGo6K5ybRNJp0qQGEWtIHezxDqkDX4=w692-h922-no?authuser=4"
            />

            <Profile
              name="Bùi Thị  Huyền Anh"
              job="STUDENT"
              like="The cake is a lie."
              url="https://lh3.googleusercontent.com/3uM-7i8s1qxGz_7wbrFtwJc4qV9NIn9hamILCOxp0BHWUSpvt5QJkLwvH1SILji0oDbBsAJmrw5-nlek6QoxyM_Y1ONuFFGqnJhGCXyK6RzgJH-yCOqpPS3xDwr-5n_H9PbjTw51s65FTrcZ7rm-R3PldN8pt7BT4NIABt8Ym4a2LI8B3slxIYeFc35gIFGZ1T3r3j_Derk-rkWADwu5DWvMR5hX9vEs3wOm1kYaQmUvdUQrVftj2ffBixw9G3jmYwj20RWnFqoU6ZebQrd1L42uR85I0Ce3kuIE--M_zcTVE1J_qbHdQImqd2WhJRivbP2T_PJEJ3meT3VJjfRq7OEhzedJF2Pvu9nTp8_l5malUtw05H1yOYYKYk1JQpcnvpMdmKxglvbZAnxvNIMrgu-uT6fNCA6MxoqpI-04JpZoBU0z9xxNX9mPCxTpKOKdrzkU7TPTyp0BhbsUFWvnEYwOsOJzYgTvyA1iTbVXvObcZsj5RSTKngXELMqe06HpHwSQvbltjJRgawAZ_rWyW6bV9lSarkORK4yqVlEHBcOCMRYot8WszCD71qJjyy4oBBt-C8y_epsZR_KwcTZGR47TDlZatR9fcNIHFOjaiReCsEd6xvlpIew-NDeaHgKrNrERocha2v76vqS8EdOlqD6Vlj_yQYpcjT2mIxbdCCZDVhQnPBMRi7ZTjHOKG8zrbLrBZO2zf5T5bKGAcbBj46Q=w692-h922-no?authuser=4"
            />

            <Profile
              name="Nguyễn Thái Sơn"
              job="STUDENT"
              like="The cake is a lie."
              url="https://scontent.fsgn5-7.fna.fbcdn.net/v/t1.0-1/p160x160/152931330_1024571437948471_1796326915189137607_o.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_ohc=OTKDe5k5aaIAX-Yphw6&_nc_ht=scontent.fsgn5-7.fna&tp=6&oh=b7a8826149dd322b00e817402fa73508&oe=6079752C"
            />
          </article>

          <article className="container" id="four">
            <h2>The Gregor Samsa story part four</h2>

            <p>
              “Something’s fallen down in there”, said the chief clerk in the
              room on the left.
            </p>
            <Admin />
          </article>
        </section>

        <footer className="footer">
          <div className="container">
            <hr />
            <article className="foot-content-left">
              <ul>&copy;2016 by Pixel Strecher</ul>
            </article>

            <article className="foot-content">
              <ul>
                <li>
                  <a href="pixelstrecher@gmail.com">pixelstrecher@gmail.com</a>
                </li>
                <li className="social">
                  <a href="https://www.facebook.com/">Facebook</a>
                </li>
                <li className="social">
                  <a href="https://twitter.com/">Twitter</a>
                </li>
                <li className="social">
                  <a href="https://www.linkedin.com/company/">LinkedIn</a>
                </li>
              </ul>
            </article>
          </div>
        </footer>
      </div>
    </div>
  );
}
