"use client";
import girls from "@/app/ange/prof.json";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type ProfProps = {};

const Prof: FC<ProfProps> = (props) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [hideAfterDelay, setHideAfterDelay] = useState(false);
	const [showMatch, setShowMatch] = useState(false);
	const [afterOverlay, setAfterOverlay] = useState(false); // オーバーレイ完全不透明(0.5s後)の確定状態
	const hideTimerRef = React.useRef<number | null>(null);
	const colorTimerRef = React.useRef<number | null>(null);
	const matchTimerRef = React.useRef<number | null>(null);
	const afterOverlayTimerRef = React.useRef<number | null>(null);
	useEffect(() => {
		console.log("ページが読み込まれました。");
	}, []);
	useEffect(() => {
		// 背景色（html/body）と theme-color は以下のポリシーで更新:
		// - 通常時（hideAfterDelay=false）: 直ちに #f3f4f6 に戻す
		// - 4枚目到達1秒後にフェードを開始（hideAfterDelay=true）: 0.5秒後に #FF8888 を反映
		const base = "#f3f4f6";
		const delayed = "#FF8888";

		const applyColor = (color: string) => {
			document.documentElement.style.backgroundColor = color;
			document.body.style.backgroundColor = color;

			let themeMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
			if (!themeMeta) {
				themeMeta = document.createElement("meta");
				themeMeta.name = "theme-color";
				document.head.appendChild(themeMeta);
			}
			themeMeta.setAttribute("content", color);
		};

		try {
			// 前回のタイマーをクリア
			if (colorTimerRef.current) {
				window.clearTimeout(colorTimerRef.current);
				colorTimerRef.current = null;
			}

			if (hideAfterDelay) {
				// オーバーレイの0.5秒フェード（opacity 0→1）が完了したあとに
				// html/body の背景色も #FF8888 へ反映する
				colorTimerRef.current = window.setTimeout(() => {
					applyColor(delayed);
					colorTimerRef.current = null;
				}, 500);
			} else {
				// 4枚目以外では即座にベース色へ戻す
				applyColor(base);
			}
		} catch {
			// SSR ガード（クライアントでのみ実行）
		}

		return () => {
			if (colorTimerRef.current) {
				window.clearTimeout(colorTimerRef.current);
				colorTimerRef.current = null;
			}
		};
	}, [hideAfterDelay]);

	// 4枚目到達時に即座にフェード開始（他UIは0.5s後にhiddenへ）
	useEffect(() => {
		// 即時フェード開始: タイマー不要
		if (activeIndex === 3) {
			if (hideTimerRef.current) {
				window.clearTimeout(hideTimerRef.current);
				hideTimerRef.current = null;
			}
			setHideAfterDelay(true);
		} else {
			// 4枚目以外では即座に表示に戻す
			if (hideTimerRef.current) {
				window.clearTimeout(hideTimerRef.current);
				hideTimerRef.current = null;
			}
			setHideAfterDelay(false);
		}
		return () => {
			if (hideTimerRef.current) {
				window.clearTimeout(hideTimerRef.current);
				hideTimerRef.current = null;
			}
		};
	}, [activeIndex]);

	// オーバーレイのフェード(0.5s)が完了してから match を表示するため、さらに0.5s 遅らせる
	useEffect(() => {
		// まず既存のタイマーをクリア
		if (matchTimerRef.current) {
			window.clearTimeout(matchTimerRef.current);
			matchTimerRef.current = null;
		}

		if (hideAfterDelay) {
			// hideAfterDelay が true になった時点から 0.5s 後に match を表示
			matchTimerRef.current = window.setTimeout(() => {
				setShowMatch(true);
				matchTimerRef.current = null;
			}, 500);
		} else {
			// それ以外は即座に非表示
			setShowMatch(false);
		}

		return () => {
			if (matchTimerRef.current) {
				window.clearTimeout(matchTimerRef.current);
				matchTimerRef.current = null;
			}
		};
	}, [hideAfterDelay]);

	// オーバーレイが完全に不透明になったタイミング(0.5s後)でUI非表示・背景確定に切り替える
	useEffect(() => {
		// 既存タイマークリア
		if (afterOverlayTimerRef.current) {
			window.clearTimeout(afterOverlayTimerRef.current);
			afterOverlayTimerRef.current = null;
		}

		if (hideAfterDelay) {
			afterOverlayTimerRef.current = window.setTimeout(() => {
				setAfterOverlay(true); // ここで header/コンテンツを隠し、main 背景も赤に確定
				afterOverlayTimerRef.current = null;
			}, 500);
		} else {
			setAfterOverlay(false);
		}

		return () => {
			if (afterOverlayTimerRef.current) {
				window.clearTimeout(afterOverlayTimerRef.current);
				afterOverlayTimerRef.current = null;
			}
		};
	}, [hideAfterDelay]);

	return (
		<>
			<header className={`fixed left-0 right-0 top-0 z-50 w-full ${afterOverlay ? "hidden" : ""}`}>
				<Image
					className="image-fit"
					src={`/images/_header_prof.png?ab`}
					alt="メッセージヘッダー"
					fill
					priority
				/>
			</header>
			{/* 背景フェード用オーバーレイ（4枚目到達0.5秒後に0.5秒でフェードイン） */}
			<div
				className={`pointer-events-none fixed inset-0 z-[60] bg-[#FF8888] transition-opacity duration-500 ease-in-out will-change-[opacity] ${hideAfterDelay ? "opacity-100" : "opacity-0"}`}
			></div>
			<main
				className={`min-h-screen transition-colors duration-500 ease-in-out ${afterOverlay ? "bg-[#FF8888]" : "bg-gray-100"}`}
			>
				<div className={`girlScroll relative h-100vh w-100vw overflow-hidden ${afterOverlay ? "hidden" : ""}`}>
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
								<div className={`pb-5 pl-4 pr-4 pt-2 ${afterOverlay ? "hidden" : ""}`}>
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
						className={`absolute bottom-12 left-0 z-50 flex h-10 w-full items-center justify-between ${afterOverlay ? "hidden" : ""}`}
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

				{/* 4枚目到達後、オーバーレイの0.5sフェード完了後に match を表示 */}
				{showMatch && (
					<div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#FF8888]">
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
