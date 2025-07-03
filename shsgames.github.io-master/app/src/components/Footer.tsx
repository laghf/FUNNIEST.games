import { Col, Container, Footer, FooterCopyright, Row } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DiscordInvite from "./DiscordInvite";

export function MoTD(): JSX.Element | null {
	type State = { motd: string } | null;
	const [ state, setState ] = useState<State>(null);

	useEffect(function() {
		if (state === null) fetch("https://api.joshmerlino.me/v1/motd").then(resp => resp.json())
			.then(setState);
	});

	if (state === null) return null;
	return <p>{state!.motd}</p>;
}

export default function Component(): JSX.Element {
	return (
		<Footer className="theme--dark">
			<Container>
				<Row>
					<Col xl={4}>
						<Link to={`/${location.search}`}>
							<div className="title">
								<h3>FUNNI.games</h3>
							</div>
						</Link>
						<MoTD/>
						<br />
						<ul style={{ padding: "0 2rem", marginTop: 0, lineHeight: 1.5 }}>
							<li><a href="//github.com/laghf/FUNNI.games/issues" target="_blank">Issue Tracker</a></li>
							<li><a href="//github.com/laghf/FUNNI.games/blob/main/README.md" target="_blank">About</a></li>
							<li><a href="//github.com/laghf/FUNNI.games/blob/main/LICENSE.md" target="_blank">License</a></li>
							<li><a href="//github.com/laghf/FUNNI.games/blob/main/PRIVACY.md" target="_blank">Privacy Statement</a></li>
						</ul>
					</Col>
					<Col xl={4}>
						<a href="//github.com/laghf/FUNNI.games" style={{ marginTop: 16, display: "inline-block", maxWidth: "calc(100vw - 32px)", overflow: "hidden" }}>
							<img src={"https://github-readme-stats.vercel.app/api/pin/?username=laghf&repo=FUNNI.games&theme=radical&bg_color=22272e&border_color=373e47&title_color=58a6ff&icon_color=adbac7&text_color=adbac7"} alt="" className="raised-3"/>
						</a>
					</Col>
					<Col xl={4}>
						<div className="raised-3" style={{ display: "inline-block", margin: "16px 0", maxWidth: "calc(100vw - 32px)", overflow: "hidden" }}>
							<DiscordInvite guild="584437072618717209"/>
						</div>
					</Col>
				</Row>
			</Container>
			<FooterCopyright>
				<div style={{ paddingLeft: 8 }}>
					<div style={{ display: "inline-flex", alignItems: "start", flexDirection: "column" }}>
						<span>Copyright © 2019-{(new Date).getFullYear()} • All Rights Reserved</span>
						<div>
							<a href="https://github.com/laghf/FUNNI.games" className="link">FUNNI.games</a>
							• And our amazing <a href="https://github.com/laghf/FUNNI.games/graphs/contributors" target="_blank">Contributors</a>
						</div>
					</div>
					<div style={{ alignItems: "start", flexDirection: "column", marginLeft: "auto", display: "table", marginTop: "-26px", transform: "translateY(-4px)" }}>
						Version: <code>v1.0.0</code>
					</div>
				</div>
			</FooterCopyright>
		</Footer>
	);
}