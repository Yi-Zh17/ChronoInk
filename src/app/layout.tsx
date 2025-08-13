import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/app/ui/global.css';
import NavLinks from "./ui/nav-links";
import SettingsLink from "./ui/settings-link";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Plan.Focus.Improve.",
	description: "Overcome your own mountain",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<div className="fixed flex min-h-screen max-h-screen w-screen h-screen">
					<div className="fixed bg-white h-full flex flex-col divide-y-2 divide-gray-300">
						<NavLinks />
						<SettingsLink />
					</div>
					<div className="flex flex-col pl-8 pr-8 ml-20 bg-gray-300 items-center h-full w-full">
						<div className="w-full h-full max-w-4xl px-12 py-8 bg-gray-200 border-x-6 border-gray-400">
						{children}
						</div>
					</div>
				</div>
			</body>
		</html>
	);
}
