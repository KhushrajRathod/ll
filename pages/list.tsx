import {
	Code,
	Row,
	Link,
	Page,
	Spacer,
	Table,
	Text,
	useMediaQuery,
	Tooltip,
	Image,
} from '@geist-ui/react'
import { QuestionCircle } from '@geist-ui/react-icons'
const fetch = require('node-fetch')

const HomeRoutes = ({ routes }) => {
	console.log(routes)

	const upMD = useMediaQuery('md', { match: 'up' })

	return (
		<>
			<Page size="small">
				{upMD && (
					<Image src="https://cloud-jr0g7md0j.vercel.app/0background3.jpg" />
				)}

				<Spacer />
				<Text h1>
					{' '}
					Public Links{' '}
					<Tooltip text={"What's this?"} placement="right">
						<Link href="https://github.com/rishiosaur/ll">
							<QuestionCircle />
						</Link>
					</Tooltip>
				</Text>

				<Text>
					Welcome to my link hub! Here's the full list of links I've shortened
					(URL parameter forwarding <i>is</i>{' '}
					available):
				</Text>
				<Table
					data={routes.map((route) => ({
						...route,
						url: (
							<Link color href={route.url}>
								{route.url}
							</Link>
						),
						name: (
							<Link color href={route.name}>
								{route.name}
							</Link>
						),
					}))}>
					<Table.Column prop="name" label="Route" />
					<Table.Column prop="title" label="Title" />
					{upMD && <Table.Column prop="description" label="Description" />}
					<Table.Column prop="url" label="url" />
				</Table>
				<Spacer />

				<Text small style={{ marginTop: '1rem' }}>
					Proudly runnning [
					<Link href="https://github.com/rishiosaur/ll">
						<Code>ll</Code>
					</Link>
					] by{' '}
					<Link href="https://rishi.cx" color>
						Rishi Kothari
					</Link>
				</Text>
			</Page>
		</>
	)
}

export default HomeRoutes

export const getStaticProps = async () => {
	const response = await fetch(process.env.apiURL).then((x) => x.json())

	return {
		props: {
			routes: response
				.map((d) => ({
					name: d.name,
					url: d.url,
					public: d.public,
					description: d.description || 'n/a',
					title: d.title || 'n/a',
				}))
				.filter((x) => x.public),
		},
	}
}
