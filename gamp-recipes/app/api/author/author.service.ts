
import prisma from '@/prisma/client';


export async function getAuthor(request: number) {
	try {
		const author = await prisma.author_Recipe.findFirst({
			where: {
				author_id: request,
			},
			include: {
				author: true,

			},
		});

		return {
			TYPE: 200,
			message: author,
		};

	} catch (error) {
		return {
			TYPE: 404,
			message: error,
		};
	}
}