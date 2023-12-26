"use client";

import React, { useState } from "react";
import { Alert, Button, ConfigProvider, Flex, Input } from "antd";
import axios from "axios";

import theme from "../theme/themeConfig.js";
import Title from "antd/es/typography/Title.js";

const HomePage = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { text };

    try {
      const response = await axios.post("https://sentiment-analysis-example-zvv4kgaupa-et.a.run.app/", data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"

          // Accept: "application/json", // Use "Accept: application/json"
        },
      });

      if (response.status === 200) {
        const result = response.data;
        setSentiment(result.prediction);
        console.log(sentiment);
      } else {
        // Handle error responses (e.g., display an error message)
        console.error("Error fetching sentiment:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error:", error);
    }
  };
  return (
    <ConfigProvider theme={theme}>
      <div className="App" style={{ width: "100%" }}>
        <Flex
          justify="center"
          align="center"
          style={{ height: "80vh" }}
          vertical={true}
        >
          <Title level={2}>Hasil Analisis Sentimen Anda = {sentiment}</Title>
          <Flex
            vertical={false}
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="masukkan kalimat anda"
            />
            <Button
              style={{ marginLeft: "20px" }}
              type="primary"
              onClick={onSubmit}
            >
              Cek
            </Button>
          </Flex>
          <Alert
            message="Perhatian"
            description="Bijaklah dalam berbahasa"
            type="info"
            showIcon
          />
        </Flex>
      </div>
    </ConfigProvider>
  );
};

export default HomePage;
