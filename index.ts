import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sedan_plates = [
  'S 11111',
  'S 11112',
  'S 11113',
  'S 11114',
  'S 11115',
  'S 11116',
  'S 11117',
  'S 11118',
  'S 11119',
  'S 11120',
]

const suv_plates = [
  'J 22221',
  'J 22222',
  'J 22223',
  'J 22224',
  'J 22225',
  'J 22226',
  'J 22227',
  'J 22228',
  'J 22229',
  'J 22230',
]

const data: Prisma.VehicleCreateManyInput[] = [
  ...sedan_plates.map<Prisma.VehicleCreateManyInput>(plate => ({
    plateNo: plate,
    type: 'Sedan',
  })),
  ...suv_plates.map<Prisma.VehicleCreateManyInput>(plate => ({
    plateNo: plate,
    type: 'SUV',
  })),
]

async function createEntries() {
  await prisma.vehicle.createMany({ data })
}

async function findEntries() {
  const allvehicles = await prisma.vehicle.findMany({
    include: { schedules: true },
  })
  console.dir(allvehicles, { depth: null })
}

async function deleteEntries() {
  const { count } = await prisma.vehicle.deleteMany()
  console.log(`Deleted ${count} entries`)
}

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.vehicle.create({ data: {} })
  await deleteEntries()
  await createEntries()
  await findEntries()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
