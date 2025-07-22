import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css"
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
				<div className="flex">
					<div className="flex flex-col">
						<NavLinks />
						<SettingsLink />
					</div>
					{children}
				</div>
			</body>
		</html>
	);
}
