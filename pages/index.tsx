/* eslint-disable @next/next/no-img-element */
import { Paper, Group, Text, TextInput, Button } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const API_KEY = "a7d14561cfc9ee3023ce6f28abb24133";

const Home: NextPage = () => {
	const [cityInput, setCityInput] = useState("");
	const [weatherData, setWeatherData] = useState<any>({});

	const getWeatherData = async () => {
		try {
			const serverResponse = await fetch(
				"https://api.openweathermap.org/data/2.5/weather?" +
					"q=" +
					cityInput +
					"&appid=" +
					API_KEY +
					"&units=metric"
			);

			const data = await serverResponse.json();
			console.log(data);
			if (data.cod === "400") throw data;
			setWeatherData(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div
			style={{
				position: "static",
				height: "100vh",
				backgroundImage:
					"url('http://littlevisuals.co/images/atlantic_ridge.jpg')",
				backgroundSize: "cover",
			}}
		>
			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<Paper withBorder radius={20} p="lg" style={{ maxWidth: "500px" }}>
					<Group position="center" p="lg">
						<Text size="xl" weight={700}>
							Get the Weather!
						</Text>
					</Group>

					<Group position="apart" py="lg">
						<Text size="lg">Enter a city and get the weather below!</Text>
					</Group>

					<Group position="apart" mb="md">
						<TextInput
							placeholder="City Name"
							onChange={(e) => setCityInput(e.target.value)}
						/>
					</Group>

					<Group position="center" p="xl">
						<Button
							variant="gradient"
							gradient={{ from: "teal", to: "lime", deg: 105 }}
							size="md"
							radius="lg"
							onClick={() => getWeatherData()}
						>
							Get Weather
						</Button>
					</Group>

					{Object.keys(weatherData).length !== 0 ? (
						<>
							<Group position="left">
								<Text weight={600} py="lg" size="xl">
									{weatherData.name}
								</Text>
							</Group>
							<div
								style={{
									backgroundColor: "hsla(0, 0%, 80%, .700)",
									borderRadius: "20px",
                  padding: "10px"
								}}
							>
								<Group position="center">
									<img
										src={
											"http://openweathermap.org/img/wn/" +
											weatherData.weather[0].icon +
											"@4x.png"
										}
										alt="Weather Icon"
										width="100px"
										height="100px"
									/>
									<Text size="xl" weight={600}>{weatherData.main.temp} &deg;C</Text>
								</Group>
								
							</div>
						</>
					) : null}
				</Paper>
			</div>
		</div>
	);
};

export default Home;
