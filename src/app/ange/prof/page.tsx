"use client";
import girls from "@/app/ange/prof.json";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type ProfProps = {};

const Prof: FC<ProfProps> = (props) => {
	useEffect(() => {
		console.log("ページが読み込まれました。");
	}, []);
	return (
		<>
			<header className="fixed left-0 right-0 top-0 z-50 w-full">
				<Image
					className="image-fit"
					src={`/images/_header_prof.png?ab`}
					alt="メッセージヘッダー"
					fill
					priority
				/>
			</header>
			<main className="min-h-screen bg-gray-100">
				<div className="girlScroll relative h-100vh w-100vw overflow-hidden">
					<Swiper
						className="girlScroll"
						spaceBetween={0}
						slidesPerView={1}
						onSlideChange={() => console.log("slide change")}
						onSwiper={(swiper) => console.log(swiper)}
					>
						{girls.map((item, index) => (
							<SwiperSlide key={item.id}>
								{/* <li key={item.id} className="h-100vh w-100vw overflow-hidden"> */}
								<div className="relative w-full">
									<Image
										className="image-fit"
										src={`/images/_header_prof.png?abc`}
										alt="メッセージヘッダー"
										fill
										priority
									/>
								</div>
								<div className="pb-5 pl-4 pr-4 pt-2">
									<div className="h-[calc(100vh_-_75px)] overflow-hidden rounded-xl bg-white shadow-md">
										<div className="relative h-[calc(100vw_-_2rem)] w-full">
											<Image
												className="block"
												src={`/images/prof/prof_${item.id}.jpg?abv`}
												alt="Next.js"
												priority
												fill
											/>
										</div>
										<div className="relative mx-4 my-4 flex">
											{typeof item.snap === "number" &&
												item.snap > 0 &&
												Array.from({ length: item.snap }, (_, index) => index + 1).map(
													(index) => (
														<React.Fragment key={`${item.id}-${index}`}>
															{index > 1}
															<span className="relative mr-3 block h-15vw w-16vw">
																<Image
																	className="block rounded-full"
																	src={`/images/prof/prof_${item.id}-${index}.jpg?abv`}
																	alt="Next.js"
																	sizes="200"
																	fill
																	priority
																/>
															</span>
														</React.Fragment>
													),
												)}
										</div>

										<div className="relative mx-6 my-3 flex items-center justify-start ">
											<span className=" rounded bg-red-700 px-2 py-1 text-3vw font-normal text-white">
												NEW
											</span>
											<span className="pl-2 text-5vw font-bold">{item.name}</span>
											<span className="pl-2 text-4.5vw font-bold">{item.age}歳</span>
											<span className="pl-2 text-4.5vw font-bold">{item.area}</span>
										</div>
										<div className="relative mx-6 my-3 flex items-center justify-between text-gray-500">
											<span className="prof-online inline-flex items-center justify-center">
												オンライン
											</span>
											<span className="prof-iine flex items-center justify-center">
												いいね！数 :？
											</span>
										</div>

										<div className="mx-1 mt-6 border-t border-gray-300 px-5 pb-2 pt-4">
											<Image
												className="block rounded-lg"
												src={`/images/_okonomi.png`}
												alt="Next.js"
												height="40"
												width="160"
											/>
										</div>
										<div className="mx-1 mb-2 border-b border-gray-300 px-5 pb-2 pt-4 text-gray-500">
											{item.name}さんの好きなタイプ・価値観が
											<br />
											あなたとマッチしました！
											<div className="relative w-full">
												<Image
													className="block"
													src={`/images/_hitogara.png`}
													alt="Next.js"
													height="40"
													width="500"
												/>
											</div>
										</div>
										<div className="mx-4 my-5 block text-4vw text-gray-500">
											{item.message.split("¥n").map((line, index) => (
												<React.Fragment key={`${item.id}-${index}`}>
													{index > 0 && <br />}
													{line}
												</React.Fragment>
											))}
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<div className="absolute bottom-12 left-0 z-50 flex h-10 w-full items-center justify-between">
						<div className="btn-left flex items-center justify-center"></div>
						<div className="btn-center flex items-center justify-center">
							<Image
								className="block rounded-lg"
								src={`/images/_prof_btn.png`}
								alt="Next.js"
								height="18"
								width="100"
							/>
						</div>
						<div className="btn-right flex items-center justify-center"></div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Prof;
