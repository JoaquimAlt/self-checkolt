import { db } from "@/lib/prisma";

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: {
        select: {
          slug: true,
          name: true,
          avatarImageUrl: true,
        },
      },
    },
  });

  return product;
};
