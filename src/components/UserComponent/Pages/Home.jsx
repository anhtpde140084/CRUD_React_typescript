import React, { Component } from "react";
import "../../../styles/UserStyle/homeStyle.css";
import { Layout, Menu, Breadcrumb } from "antd";
import Typical from "react-typical";
import { HeaderComponent } from "../Common/HeaderComponent";
import FooterComponent from "../Common/FooterComponent";
const { Header, Content, Footer } = Layout;

/**
 * Home
 *
 * Version 1.0
 *
 * Date: 06-07-2021
 *
 * Copyright
 *
 * Modification Logs:
 * DATE                 AUTHOR          DESCRIPTION
 * -----------------------------------------------------------------------
 * 06-07-2021          Anhtp8           Home main page
 */
class Home extends Component {
  componentDidMount() {
    document.title = "Home";
  }
  render() {
    return (
      <Layout className="layout">
        <HeaderComponent />
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <section
              id="hero"
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <div className="hero-container" data-aos="fade-in">
                <h1 className="text-center" style={{ fontFamily: "Garamond" }}>
                  Tran Phi Anh
                </h1>
                <p className="text-center" style={{ fontFamily: "Garamond" }}>
                  Hi, I am Anh. ✌️
                  <Typical
                    steps={[
                      "👉 I am currently working on FPT University.",
                      500,
                      "👉 Here is some of what I am able to do and the collection of my finished and ongoing works",
                      200,
                      "👉 Hello world!",
                      500,
                    ]}
                    loop={Infinity}
                    wrapper="p"
                  />
                </p>
              </div>
            </section>
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    );
  }
}

export default Home;
