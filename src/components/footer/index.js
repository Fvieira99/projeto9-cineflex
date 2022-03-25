import "./style.css";

function Footer(props) {
	const { title, url, weekday, time, style } = props;
	return (
		<div className="Footer">
			<footer>
				<div>
					<img src={url}></img>
				</div>
				<span>
					<p>{title}</p>
					<p className={style}>
						{weekday} - {time}
					</p>
				</span>
			</footer>
		</div>
	);
}

export default Footer;
