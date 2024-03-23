import { useEffect, useRef, useState } from "react";
import styles from "./RadioArticles.module.css";

export default function RadioArticles() {
	let [articles, setArticles] = useState(null);
	let articlesRef = useRef(null);

	useEffect(() => {
		const articles = [];
		fetch(
			"https://www.ertecho.gr/wp-json/wp/v2/article?radio=837&per_page=18"
		)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				for (const obj of res) {
					const article = {
						title: obj.title.rendered,
						author: obj.author,
						date: obj.date,
						id: obj.id,
					};
					console.log(obj);
					articles.push(article);
				}
			});
		setArticles(articles);
		console.log(articles);
	}, [articlesRef]);

	return (
		<div className={styles.carouselContainer}>
			<ul className={styles.articles} ref={articlesRef}>
				{articles == null
					? "No articles"
					: articles.map((article) => (
						<li
							className={styles.articleItem}
							title={article.title}
							key={article.id}
						>
							{/* <img
                                  src="https://via.placeholder.com/120"
                                  height="120px"
                              /> */}
							<h1>{article.title}</h1>
						</li>
					))}
			</ul>
		</div>
	);
}
