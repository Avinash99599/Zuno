import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const restaurantsCount = await prisma.restaurants.count();
  const customersCount = await prisma.customers.count();
  const menuItemsCount = await prisma.menu_items.count();
  const ordersCount = await prisma.orders.count();

  console.log("DATABASE STATUS:");
  console.log(`Restaurants: ${restaurantsCount}`);
  console.log(`Customers: ${customersCount}`);
  console.log(`Menu Items: ${menuItemsCount}`);
  console.log(`Orders: ${ordersCount}`);
  
  if (customersCount > 0) {
    const custs = await prisma.customers.findMany({ take: 3 });
    console.log("Sample Customers:", JSON.stringify(custs, null, 2));
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
