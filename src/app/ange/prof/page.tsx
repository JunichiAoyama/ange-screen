"use client";
import girls from "@/app/ange/prof.json";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type ProfProps = {};

const Prof: FC<ProfProps> = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	useEffect(() => {
		console.log("ページが読み込まれました。");
	}, []);
	useEffect(() => {
		// iOS Safariのアドレス/メニューバー（ツールバー）色をスライドに合わせて同期
		// 4枚目: #FF8888 / それ以外: Tailwind bg-gray-100 相当 (#f3f4f6)
		const target = activeIndex === 3 ? "#FF8888" : "#f3f4f6";
		try {
			// ページ背景自体を変更（ブラウザUIの色に影響させるため html, body へ適用）
			document.documentElement.style.backgroundColor = target;
			document.body.style.backgroundColor = target;

			// iOS Safari 等のツールバー色を変更（theme-color メタタグ）
			let themeMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
			if (!themeMeta) {
				themeMeta = document.createElement("meta");
				themeMeta.name = "theme-color";
				document.head.appendChild(themeMeta);
			}
			themeMeta.setAttribute("content", target);
		} catch {
			// SSR ガード（クライアントでのみ実行）
		}
	}, [activeIndex]);
	return (
		<>
			<header className={`fixed left-0 right-0 top-0 z-50 w-full ${activeIndex === 3 ? "hidden" : ""}`}>
				<Image
					className="image-fit"
					src={`/images/_header_prof.png?ab`}
					alt="メッセージヘッダー"
					fill
					priority
				/>
			</header>
			<main className={`min-h-screen ${activeIndex === 3 ? "bg-[#FF8888]" : "bg-gray-100"}`}>
				<div
					className={`girlScroll relative h-100vh w-100vw overflow-hidden ${activeIndex === 3 ? "hidden" : ""}`}
				>
					<Swiper
						className="girlScroll"
						spaceBetween={0}
						slidesPerView={1}
						onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
					<div
						className={`absolute bottom-12 left-0 z-50 flex h-10 w-full items-center justify-between ${activeIndex === 3 ? "hidden" : ""}`}
					>
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

				{/* 4枚目のスワイプ完了時のみ match 画像を表示（他要素は非表示） */}
				{activeIndex === 3 && (
					<div className="fixed inset-0 z-[999] flex items-center justify-center">
						<div className="relative h-screen w-screen">
							<Image
								className="block object-contain"
								src={`/images/match.png`}
								alt="Match"
								fill
								sizes="100vw"
								priority
							/>
						</div>
					</div>
				)}
			</main>
		</>
	);
};

export default Prof;
