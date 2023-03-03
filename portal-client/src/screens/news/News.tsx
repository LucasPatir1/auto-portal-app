import { FC } from "react"
import { Box, Container, Typography } from "@mui/material"

import News from "@/entities/news/ui/News"
import BreadCrumbs from "@/shared/ui/breadcrumbs/Breadcrumbs"
import { IArticleContent, IPromotionContent } from "@/shared/api/types/strapi/news.types"

interface INewsScreen {
	articles: IArticleContent[]
	promotions: IPromotionContent[]
}

const NewsScreen: FC<INewsScreen> = ({articles, promotions}) => {
	return (
		<Container maxWidth="xl">
			<BreadCrumbs
				navElements={[{ title: "Главная" }, { title: "Корзина", url: "/cart" }]}
			/>
			<Typography variant="h4" style={{ padding: "1rem 0" }}>
				Новости и акции
			</Typography>
			<News articles={articles} promotions={promotions} />
		</Container>
	)
}

export default NewsScreen